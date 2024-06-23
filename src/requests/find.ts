'use server'

import prisma from "@/lib/prisma"
import { navigation_rule } from "@prisma/client";
import { every, filter, find } from "lodash";

export async function getOptionById(id: number) {
  return await prisma.option.findUnique({
    where: {
      id,
    }
  })
  
}

export async function getGraphTypeByName(name :string) {
  return await prisma.graph_types.findFirst({
    where: {
      name: {
        equals: name
      }
    }
  })

}


export async function getUserAnswer(userId : number, questionId : number) {
  return await prisma.user_answer.findFirst({
    where: {
      user_id: userId,
      question_id: questionId,
    }
  })
}

export async function getManyUserAnswer(userId : number) {
  return await prisma.user_answer.findMany({
    where: {
      user_id: userId
    },
    include: {
      option: {
        include: {
          feedback: {
            include: {
              references: true
            }
          }
        }
      }
    }
  })
  
}

export async function getManyUsersFeedbacks(userId : number)  {
  const userAnswers = await getManyUserAnswer(userId)
  const feedbackByOption = userAnswers.map((userAnswer) => userAnswer.option.feedback)
  return feedbackByOption.filter(array => array.length > 0);
  
}

export async function getQuestionById(questionId : number){
  try{
    return await prisma.question.findUnique({
      where: {
        id: questionId
      },
      include: {
        feedback: {
          include: {
            references: true
          }
        },
        option: {
          include: {
            feedback: {
              include: {
                references: true
              }
            }
          }
        }
      }
    })
  }catch(e){
    console.log({ e })
  }
}

export async function getnavigationRule(questionId : number, optionId : number | null | undefined) {
  const navigationRules = await prisma.navigation_rule.findMany({
    where: {
      question_id: questionId,
      // option_id: optionId
    }
  })
  if(!navigationRules.length){
    return null
  }
  const isForAllOptions = every(navigationRules, (value : navigation_rule) => !value.option_id)
  if(isForAllOptions){
    return navigationRules[0]
  }
  const navigationRule = find(navigationRules, (value : navigation_rule) => value.option_id === optionId)
  return navigationRule
}

export async function getQuestionNavigationRule(questionId : number) {
  return await prisma.navigation_rule.findFirst({
    where: {
      question_id: questionId,
      option_id: null
    }
  })
}

export async function getVisualization(visualizationId : number) {
  const visualization =  await prisma.visualization.findUnique({
    where: {
      id: visualizationId
    },
    include: {
      mapping: {
        include: {
          data_variable: true
        }
      }
    }
  })
  const mappingDataVariable : any[] = visualization?.mapping ? 
    filter(visualization?.mapping, (mappedValue) => mappedValue?.data_variable_id ) : []
  const variables : any[] = mappingDataVariable ? mappingDataVariable.map((mappedValue) => ({
    name: mappedValue?.data_variable?.name, 
    dataType:  mappedValue?.data_variable?.data_type, 
    variableType: mappedValue.variables_type,
    aggregator: mappedValue.aggregator,
    key: mappedValue.id
  })) : []
  return {
    ...visualization,
    variables,
  }
}



export async function getGraphVariables(visualizationId : number){
  const mappings = await prisma.mapping.findMany({
    where: {
      visualization_id: visualizationId
    },
    include: {
      data_variable: true
    }
  })
  return mappings.map((mapping) => ({
    name: mapping?.data_variable?.name, 
    dataType:  mapping?.data_variable?.data_type, 
    variableType: mapping.variables_type,
    aggregator: mapping.aggregator
  }))
}

export async function getMappingTitleByVisualizationId(visualizationId : number) {
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



export async function getTextByOptionId(optionId : number) {
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