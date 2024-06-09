'use server'

import prisma from "@/lib/prisma";

export async function getQuestionToStartTitleQuestionnaire(questionId : number){
  try{
    const where = questionId ? {
      id: {
        equals: questionId
      }
    } : {
      is_first_question: {
        equals: true
      }
    }
    const title = await prisma.question_group.findFirst({
      where: {
        topic: 'title'
      },
      include: {
        question: {
          where,
          include: {
            option: {
              include: {
                feedback: true
              }
            }
          }
        }
      }
    })
    const firstQuestion =  title?.question
    return firstQuestion ? firstQuestion[0] : null
  }catch(e){
    console.log({ e })
  }
}

