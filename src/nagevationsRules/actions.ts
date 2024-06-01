export default async function callAction(name : string, params : Array<any>){
  const values = params.map(str => `"${str}"`).join(',')
  eval(`${name}(${values})`)
}

async function saveGraphData(value : string) {
  console.log("O Valor é esse", value)
}