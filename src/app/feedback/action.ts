'use server'

import prisma from "@/lib/prisma"

export async function getVisualization(visualizationId : number) {
  const visualization =  await prisma.visualization.findUnique({
    where: {
      id: visualizationId
    },
    include: {
      mapping: {
        include: {
          data_variable: true
        }
      }
    }
  })
  const variables : any[] = visualization?.mapping ? visualization?.mapping.map((mappedValue) => ({
    name: mappedValue?.data_variable?.name, 
    dataType:  mappedValue?.data_variable?.data_type, 
    ordered: mappedValue.ordered,
    variableType: mappedValue.variables_type,
    aggregator: mappedValue.aggregator,
    key: mappedValue.id
  })) : []
  return {
    ...visualization,
    variables,
  }
}

export async function getGraphVariables(visualizationId : number){
  const mappings = await prisma.mapping.findMany({
    where: {
      visualization_id: visualizationId
    },
    include: {
      data_variable: true
    }
  })
  return mappings.map((mapping) => ({
    name: mapping?.data_variable?.name, 
    dataType:  mapping?.data_variable?.data_type, 
    ordered: mapping.ordered,
    variableType: mapping.variables_type,
    aggregator: mapping.aggregator
  }))
}