'use server'
import prisma from '@/lib/prisma'
import { find } from 'lodash'
import { redirect } from 'next/navigation'



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
    console.log({ questionGroup })
    if(questionGroup) {
      const startQuestion = find(questionGroup.question, (question) => question.is_first_question)
      redirect(`${startQuestion?.id}?visualizationId=${visualizationId}`)
    }
  } else {
    redirect(`/feedback?visualizationId=${visualizationId}`)
  }
}