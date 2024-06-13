'use server'
import prisma from '@/lib/prisma'
import { find } from 'lodash'
import { redirect } from 'next/navigation'
import { NextRouter } from 'next/router'



export default async function handleNext(nextRoute : any,  visualizationId : number | null | undefined){
  const question_id = nextRoute?.question_id
  const question_group_id = nextRoute?.question_group_id
  if(question_id){
    redirect(`${question_id}?visualizationId=${visualizationId}`)
  } if (question_group_id) {
    const questionGroup = await prisma.question_group.findUnique({
      where: {
        id: question_group_id
      },
      include: {
        question: true
      }
    })
    if(questionGroup) {
      const startQuestion = find(questionGroup.question, (question) => question.is_first_question)
      redirect(`${questionGroup.topic}/${startQuestion?.id}?visualizationId=${visualizationId}`)
    }
  } else {
    redirect('/feedback')
  }
}