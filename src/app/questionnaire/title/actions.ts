'use server'

import prisma from "@/lib/prisma";

export async function getQuestionToStartTitleQuestionnaire(){
  try{
    const title = await prisma.question_group.findFirst({
      where: {
        topic: 'title'
      },
      include: {
        question: {
          where: {
            is_first_question: true
          },
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

