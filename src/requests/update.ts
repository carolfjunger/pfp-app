import prisma from "@/lib/prisma";
import { getVariableType } from "./utils";


/**
 * Update the mapping variable type
 *
 * @export
 * @async
 * @param {number} mappingId
 * @param {string} variableType
 * @returns {unknown}
 */
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
