import { variables_type_options } from "@prisma/client"


export function getVariableType(type : string) : variables_type_options | null{
  if(type === 'Nominal') return 'nominal'
  if(type === 'Ordinal') return 'ordinal'
  if(type === 'Informativo') return 'informative'
  if(type === 'Genérico') return 'generic'
  return null
}