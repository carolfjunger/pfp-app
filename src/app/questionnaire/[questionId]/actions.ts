'use server'

import prisma from "@/lib/prisma";

export async function getQuestionToStartTitleQuestionnaire(questionId : number){
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
            feedback: true
          }
        }
      }
    })
  }catch(e){
    console.log({ e })
  }
}

