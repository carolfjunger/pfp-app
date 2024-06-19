'use server'

import prisma from "@/lib/prisma"

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