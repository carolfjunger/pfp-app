import { aggregator_type_options, data_variable_type, ordered_data_variable_option, variables_type_options } from "@prisma/client"


/**
 * Function that gets string type and translate to variables_type_options
 *
 * @export
 * @param {string} type
 * @returns {(variables_type_options | null)}
 */
export function getVariableType(type : string) : variables_type_options | null{
  if(type === 'Nominal') return 'nominal'
  if(type === 'Ordinal') return 'ordinal'
  if(type === 'Informativo') return 'informative'
  if(type === 'Genérico') return 'generic'
  return null
}

/**
 * Function that gets string genre and translate to data_variable_type
 *
 * @param {string} genre
 * @returns {(data_variable_type | null)}
 */
export function getDataType (genre : string) : data_variable_type | null {
  if(genre === 'Categórica') return 'categoric'
  if(genre === 'Numérico') return 'numeric'
  if(genre === 'Temporal') return 'timeseries'
  return null
}

/**
 * Function that gets string ordered and translate to ordered_data_variable_option
 *
 * @param {string} ordered
 * @returns {(ordered_data_variable_option | null)}
 */
export function getOrdered(ordered : string) : ordered_data_variable_option | null {
  if(ordered === 'Crescente') return 'ascending'
  if(ordered === 'Decrescente') return 'descending'
  if(ordered === 'Não') return 'notOrdered'
  return null
}

/**
 * Function that gets string aggregator and translate to aggregator_type_options
 *
 *
 * @param {string} aggregator
 * @returns {(aggregator_type_options | null)}
 */
export function getAggregator(aggregator : string) : aggregator_type_options | null {
  if(aggregator === "Contador") return 'count'
  if(aggregator === "Proporção") return 'percentage'
  if(aggregator === "Frequência") return 'frequency'
  return null
  
}