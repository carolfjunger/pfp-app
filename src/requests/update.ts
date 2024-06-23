import prisma from "@/lib/prisma";
import { getVariableType } from "./utils";


export async function updateMappingVariableType(mappingId :number, variableType : string) {
  return await prisma.mapping.update({
    where: {
      id: mappingId
    },
    data: {
      variables_type: getVariableType(variableType)
    }
  })  
}
