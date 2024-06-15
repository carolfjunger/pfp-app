'use server'

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createVisualization(name: string, file : string, userId : number | null) {
  try{
    const visualization = await prisma.visualization.create({
      data: {
        name,
        file,
        userId,
      }
    })
    if(visualization){
      redirect(`questionnaire/2?visualizationId=${visualization.id}`)
    }
  }catch(e){
    throw e
  }
}

