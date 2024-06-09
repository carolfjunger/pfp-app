'use server'

import prisma from "@/lib/prisma";

export async function saveUserAnswer(questionId : number, optionId : number, userId: number, value : string ){
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
