'use server'
import prisma from "@/lib/prisma"
import { getGraphTypeByName, getOptionById } from "@/requests/get"
import { aggregator_type_options, data_variable, data_variable_type, ordered_data_variable_option, variables_type_options, visual_variable_type } from "@prisma/client"

export default async function callAction(name : string, params : Array<any>){
  const values = params.map(str => `\`${str}\``).join(',')
  return await eval(`${name}(${values})`)
}


async function createDataVariable(name : string, genre : string, ordered : string) : Promise<data_variable> {
  try{
    return await prisma.data_variable.create({
      data: {
        name,
        data_type: getDataType(genre),
        ordered: getOrdered(ordered)
      },
      
    })
  }catch(e){ 
    throw e
  }
}

function getVariableType(type : string) : variables_type_options | null{
  if(type === 'Nominal') return 'nominal'
  if(type === 'Ordinal') return 'ordinal'
  if(type === 'Informativo') return 'informative'
  if(type === 'Genérico') return 'generic'
  return null
}

function getAggregator(aggregator : string) : aggregator_type_options | null {
  if(aggregator === "Contador") return 'count'
  if(aggregator === "Proporção") return 'percentage'
  if(aggregator === "Frequência") return 'frequency'
  return null
  
}

async function mappingVariable(dataVariableId :  number, visualizationId : number, type : string, aggregator : string) {
  try{
    const mapping = await prisma.mapping.create({
      data: {
        data_variable_id: dataVariableId,
        visualization_id: visualizationId,
        variables_type: getVariableType(type),
        aggregator: getAggregator(aggregator)
      }
    })

    await prisma.data_variable.update({
      where: {
        id: dataVariableId
      },
      data: { mapping_id: mapping.id }
    })
    return mapping
  }catch(e){
    console.log("Error on mappingVariable", e)
    throw e
  }
}

function getDataType (genre : string) : data_variable_type | null {
  if(genre === 'Categórica') return 'categoric'
  if(genre === 'Numérico') return 'numeric'
  if(genre === 'Temporal') return 'timeseries'
  return null
}

function getOrdered(ordered : string) : ordered_data_variable_option | null {
  if(ordered === 'Crescente') return 'ascending'
  if(ordered === 'Decrescente') return 'descending'
  if(ordered === 'Não') return 'notOrdered'
  return null
}

async function createVisualVaribale(name : string, type : visual_variable_type, visualization_id : number) {

  const visualVariable = await prisma.visual_variable.create({
    data: {
      name,
      type,
    }
  })

  const mapping = await prisma.mapping.create({
    data: {
      visualization_id,
      visual_variable_id: visualVariable.id
    }
  })


  return await prisma.visual_variable.update({
    where: {
      id: visualVariable.id
    },
    data: {
      mapping_id: mapping.id
    }
  })
}


async function getTextByOptionId(optionId : number) {
  const option = await prisma.option.findUnique({
    where: {
      id: optionId
    },
    select: {
      id: true,
      text: true
    }
  })
  return option?.text
  
}

async function getMappingTitleByVisualizationId(visualizationId : number) {
  return await prisma.mapping.findFirst({
    where: {
      visualization_id: Number(visualizationId),
      visual_variable: {
        type: 'title'
      }
    },
    include: {
      visual_variable: true
    }
  })
  
}


async function updateMappingVariableType(mappingId :number, variableType : string) {
  return await prisma.mapping.update({
    where: {
      id: mappingId
    },
    data: {
      variables_type: getVariableType(variableType)
    }
  })  
}



async function saveGraphData(value : string, visualizationId : number) {
  try{
    const variables = value.split('\n')
    await Promise.all(variables.map(async variable => {
      try {
        const dataValues = variable.split(',')
        const genre = dataValues[0].trim()
        const name = dataValues[1].trim()
        const ordered = dataValues[2].trim()
        const type = dataValues[3].trim()
        const aggregator = dataValues[4].trim()
        const dataVariable = await createDataVariable(name, genre, ordered)
        const mapVariable = await mappingVariable(dataVariable.id, Number(visualizationId), type, aggregator)
      } catch(e){
        throw e
      }
    }))
  }catch(e){
    console.log({ e })
    throw e
  }
}

async function saveTitle(title : string, visualizationId : number) {
  const trimedTitle = title.trim()
  await createVisualVaribale(trimedTitle, 'title', Number(visualizationId))
}

async function saveTitleVariableType(optionId : string, visualizationId : string) {
  const mapping = await getMappingTitleByVisualizationId(Number(visualizationId))
  const variableType = await getTextByOptionId(Number(optionId))
  if(mapping?.id && variableType){
    await updateMappingVariableType(mapping?.id, variableType)
  }
}

async function handleSaveGraphType(optionId : string, visualizationId : string) {
  const option = await getOptionById(Number(optionId))
  if(option){
    const graphType = await getGraphTypeByName(option?.text)
    await prisma.visualization.update({
      where: {
        id: Number(visualizationId)
      },
      data: {
        graph_types_id: graphType?.id
      }
    })
  }
}