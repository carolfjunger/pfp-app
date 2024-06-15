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

export async function getnavigationRule(questionId : number, optionId : number) {
  const navigationRule = await prisma.navigation_rule.findFirst({
    where: {
      question_id: questionId,
      option_id: optionId
    }
  })
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
