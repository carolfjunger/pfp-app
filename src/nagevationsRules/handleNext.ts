'use server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { NextRouter } from 'next/router'



export default async function handleNext(nextRoute : any, router : NextRouter | undefined){
  const question_id = nextRoute?.question_id
  const question_group_id = nextRoute?.question_group_id
  if(question_id && router){
    router.push(`question_id`)
  } if (question_group_id) {
    const questionGroup = await prisma.question_group.findUnique({
      where: {
        id: question_group_id
      }
    })
    if(questionGroup) redirect(questionGroup.topic)
    
  }
}