export function translateDataType(dataType : string){
  if(dataType === "categorio") return "Categórico"
  if(dataType === "numerico") return "Numérico"
  if(dataType === "temporal") return "Temporal"
  return "N/A"
}

export function translateVariableType(type : string) {
  if(type === 'nominal') return 'Nominal'
  if(type === 'ordinal') return 'Nordinal'
  return "N/A"
}


export function translateAggregator(aggregator : string) {
  if(aggregator === "count") return 'Contador'
  if(aggregator === "percentage") return 'Proporção'
  if(aggregator === "frequency") return 'Frequência'
  return "N/A"
  
}

export function translateOrdered(ordered : string) {
  if(ordered === 'ascending') return 'Crescente'
  if(ordered === 'descending') return 'Decrescente'
  if(ordered === 'not ordered') return 'Não'
  return "N/A"
}
