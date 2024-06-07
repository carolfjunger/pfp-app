'use server'
import prisma from "@/lib/prisma"
import { aggregator_type_options, data_variable, data_variable_type, variables_type_options } from "@prisma/client"

export default async function callAction(name : string, params : Array<any>){
  const values = params.map(str => `\`${str}\``).join(',')
  console.log({ values })
  console.log(`${name}(${values})`)
  eval(`${name}(${values})`)
}


async function createDataVariable(name : string, genre : string) : Promise<data_variable> {
  try{
    return await prisma.data_variable.create({
      data: {
        name,
        data_type: getDataType(genre),
      },
      
    })
  }catch(e){ 
    throw e
  }
}

function getVariableType(type : string) : variables_type_options | null{
  if(type === 'Nominal') return 'nominal'
  if(type === 'Ordinal') return 'ordinal'
  return null
}

function getAggregator(aggregator : string) : aggregator_type_options | null {
  if(aggregator === "Contador") return 'count'
  if(aggregator === "Proporção") return 'percentage'
  if(aggregator === "Frequência") return 'frequency'
  return null
  
}

async function mappingVariable(dataVariableId :  number, ordered : string, visualizationId : number, type : string, aggregator : string) {
  try{
    const mapping = await prisma.mapping.create({
      data: {
        data_variable_id: dataVariableId,
        ordered: getOrdered(ordered), 
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
  }
}

function getDataType (genre : string) : data_variable_type | null {
  if(genre === 'Categórica') return 'categorio'
  if(genre === 'Numérico') return 'numerico'
  if(genre === 'Temporal') return 'temporal'
  return null
}

function getOrdered(ordered : string) {
  if(ordered === 'Crescente') return 'ascending'
  if(ordered === 'Decrescente') return 'descending'
  if(ordered === 'Não') return 'not ordered'
  return null
}

async function saveGraphData(value : string, visualizationId : number) {
  const variables = value.split('\n')
  variables.forEach(async variable => {
    const dataValues = variable.split(',')
    const genre = dataValues[0].trim()
    const name = dataValues[1].trim()
    const ordered = dataValues[2].trim()
    const type = dataValues[3].trim()
    const aggregator = dataValues[4].trim()
    const dataVariable = await createDataVariable(name, genre)
    const mapVariable = await mappingVariable(dataVariable.id, ordered, Number(visualizationId), type, aggregator)
  });
}