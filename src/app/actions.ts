'use server'
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const getUsers = async () => {
    const users = await prisma.users.findMany()
    console.log({users})
  
    return { props: { users } }
};


export const saveNewUser = async (userName : string) => {
  try{
    const user =  await prisma.users.create({
      data: {
        name: userName
      }
    })
    if(user) {
      redirect(`upload?userId=${user.id.toString()}`)
    }
  }catch(e){
      throw e
  }

}