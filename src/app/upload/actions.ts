'use server'

import prisma from "@/lib/prisma";

export default async function createVisualization(name: string, file : string) {
  try{
    return await prisma.visualization.create({
      data: {
        name,
        file,
      }
    })
  }catch(e){
    throw e
  }
}