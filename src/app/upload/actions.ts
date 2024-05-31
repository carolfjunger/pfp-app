'use server'

import prisma from "@/lib/prisma";

export default async function createVisualization(name: string, file : string, userId : number | null) {
  try{
    return await prisma.visualization.create({
      data: {
        name,
        file,
        userId,
      }
    })
  }catch(e){
    throw e
  }
}