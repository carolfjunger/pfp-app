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
