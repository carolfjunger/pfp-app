/**
 *  Function that receives a data type and translates it into user-friendly writing
 *
 * @export
 * @param {string} dataType
 * @returns {("N/A" | "Categórico" | "Numérico" | "Temporal")}
 */
export function translateDataType(dataType : string){
  if(dataType === "categoric") return "Categórico"
  if(dataType === "numeric") return "Numérico"
  if(dataType === "timeseries") return "Temporal"
  return "N/A"
}

/**
 * Function that receives a type and translates it into user-friendly writing
 * @export
 * @param {string} type
 * @returns {("N/A" | "Nominal" | "Nordinal")}
 */
export function translateVariableType(type : string) {
  if(type === 'nominal') return 'Nominal'
  if(type === 'ordinal') return 'Nordinal'
  return "N/A"
}


/**
 * Function that receives an aggregator and translates it into user-friendly writing
 *
 * @export
 * @param {string} aggregator
 * @returns {("N/A" | "Contador" | "Proporção" | "Frequência")}
 */
export function translateAggregator(aggregator : string) {
  if(aggregator === "count") return 'Contador'
  if(aggregator === "percentage") return 'Proporção'
  if(aggregator === "frequency") return 'Frequência'
  return "N/A"
  
}

/**
 * Function that receives an ordered and translates it into user-friendly writing
 *
 * @export
 * @param {string} ordered
 * @returns {("Crescente" | "Decrescente" | "Não" | "N/A")}
 */
export function translateOrdered(ordered : string) {
  if(ordered === 'ascending') return 'Crescente'
  if(ordered === 'descending') return 'Decrescente'
  if(ordered === 'not ordered') return 'Não'
  return "N/A"
}
