'use server'
import prisma from "@/lib/prisma"
import { createDataVariable, createVisualVaribale, mappingVariable } from "@/requests/create"
import { getGraphTypeByName, getMappingTitleByVisualizationId, getOptionById, getTextByOptionId } from "@/requests/find"
import { updateMappingVariableType } from "@/requests/update"

/**
 * Function that calls actions from this file
 *
 * @export
 * @async
 * @param {string} name Function name to call
 * @param {Array<any>} params Functions Params
 * @returns {unknown} Function called return
 */
export default async function callAction(name : string, params : Array<any>){
  const values = params.map(str => `\`${str}\``).join(',')
  return await eval(`${name}(${values})`)
}


/**
 * Action that saves graph variables by user anwnser 
 *
 * @async
 * @param {string} value User answered string with variables
 * @param {number} visualizationId
 * @returns {*}
 */
async function saveGraphData(value : string, visualizationId : number) {
  try{
    const variables = value.split('\n')
    await Promise.all(variables.map(async variable => {
      try {
        const dataValues = variable.split(',')
        if(variable.length < 4) return
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

/**
 * Action that saves title
 *
 * @async
 * @param {string} title
 * @param {number} visualizationId
 * @returns {*}
 */
async function saveTitle(title : string, visualizationId : number) {
  const trimedTitle = title.trim()
  await createVisualVaribale(trimedTitle, 'title', Number(visualizationId))
}

/**
 * Action that saves title type 
 *
 * @async
 * @param {string} optionId
 * @param {string} visualizationId
 * @returns {*}
 */
async function saveTitleVariableType(optionId : string, visualizationId : string) {
  const mapping = await getMappingTitleByVisualizationId(Number(visualizationId))
  const variableType = await getTextByOptionId(Number(optionId))
  if(mapping?.id && variableType){
    await updateMappingVariableType(mapping?.id, variableType)
  }
}

/**
 * Action that saves graph type
 * 
 * @async
 * @param {string} optionId
 * @param {string} visualizationId
 * @returns {*}
 */
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