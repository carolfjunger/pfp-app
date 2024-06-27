'use server'
import prisma from "@/lib/prisma";
import { aggregator_type_options, data_variable, data_variable_type, ordered_data_variable_option, variables_type_options, visual_variable_type } from "@prisma/client"
import { redirect } from "next/navigation";
import { getAggregator, getDataType, getOrdered, getVariableType } from "./utils";


/**
 * Function that saves a new user
 *
 * @async
 * @param {string} userName
 * @returns {user} Created User
 */
export const saveNewUser = async (userName : string) => {
  try{
    return  await prisma.users.create({
      data: {
        name: userName
      }
    })
  }catch(e){
      throw e
  }

}

/**
 * Function that creates a new visualization
 *
 * @export
 * @async
 * @param {string} name Visualization name
 * @param {string} file Visualization file in base64
 * @param {(number | null)} userId User id
 * @returns {*}
 */
export async function createVisualization(name: string, file : string, userId : number | null) {
  try{
    const visualization = await prisma.visualization.create({
      data: {
        name,
        file,
        userId,
      }
    })
    if(visualization){
      redirect(`questionnaire/2?visualizationId=${visualization.id}`)
    }
  }catch(e){
    throw e
  }
}

/**
 * Function that creates the user anwser 
 *
 * @export
 * @async
 * @param {number} questionId
 * @param {number} optionId
 * @param {number} userId
 * @param {string} value
 * @returns {unknown}
 */
export async function saveUserAnswer(questionId : number, optionId : number, userId: number, value : string ){
  try {
    return await prisma.user_answer.create({
      data: {
        question_id: questionId,
        option_id: optionId,
        user_id: userId,
        value: typeof value === 'string' ? value : ''
      }
    })
  } catch(e){
    console.log({ e })
    throw e
  }
}


/**
 *  Function that creates data variable
 *
 * @export
 * @async
 * @param {string} name
 * @param {string} genre
 * @param {string} ordered
 * @returns {Promise<data_variable>}
 */
export async function createDataVariable(name : string, genre : string, ordered : string) : Promise<data_variable> {
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

/**
 * Functions that creates mapping and link with visualization 
 *
 * @export
 * @async
 * @param {number} dataVariableId
 * @param {number} visualizationId
 * @param {string} type
 * @param {string} aggregator
 * @returns {unknown}
 */
export async function mappingVariable(dataVariableId :  number, visualizationId : number, type : string, aggregator : string) {
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

/**
 * Function that creates a visual variable and mapping
 *
 * @export
 * @async
 * @param {string} name
 * @param {visual_variable_type} type
 * @param {number} visualization_id
 * @returns {unknown}
 */
export async function createVisualVaribale(name : string, type : visual_variable_type, visualization_id : number) {

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
