'use server'

import prisma from "@/lib/prisma";

export async function getQuestionToStarGraphBasicInfosQuestionnaire(){
  try{
    const graphBasicInfoQuestionGroup = await prisma.question_group.findFirst({
      where: {
        topic: 'graph_basic_infos'
      },
      include: {
        question: {
          where: {
            is_first_question: true
          },
          include: {
            option: true
          }
        }
      }
    })
    const firstQuestion =  graphBasicInfoQuestionGroup?.question
    return firstQuestion ? firstQuestion[0] : null
  }catch(e){
    console.log({ e })
  }
}

export async function saveUserAnswer(questionId : number, optionId : number, userId: number, value : string){
  return await prisma.user_answer.create({
    data: {
      question_id: questionId,
      option_id: optionId,
      user_id: userId,
      value
    }
  })
}

export async function getNavegationRule(questionId : number, optionId : number) {
  const navegationRule = await prisma.navegation_rule.findFirst({
    where: {
      question_id: questionId,
      option_id: optionId
    }
  })
  return navegationRule
}