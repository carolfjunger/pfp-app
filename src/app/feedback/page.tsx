'use client'

import { useEffect, useState } from "react"
import { getVisualization } from "./action"
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { translateAggregator, translateDataType, translateOrdered, translateVariableType } from "./utils";
import Image from "next/image";

interface  VariablesType {
  name: string,
  dataType: string,
  variableType: string,
  aggregator: string,
  ordered?: string
}


export default function FeedbackPage(){
  const [isLoading, setIsLoading] = useState(true)
  const [visualization, setVisualization] = useState<any>(null)


  const columns: TableProps<VariablesType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tipo do Dado',
      dataIndex: 'dataType',
      key: 'dataType',
      render: dataType => translateDataType(dataType)
    },
    {
      title: 'Tipo da Variável',
      dataIndex: 'variableType',
      key: 'variableType',
      render: variableType => translateVariableType(variableType)
    },
    {
      title: 'Agregador',
      dataIndex: 'aggregator',
      key: 'aggregator',
      render: aggregator => translateAggregator(aggregator)
    },
    {
      title: 'O dado é ordenado?',
      dataIndex: 'ordered',
      key: 'ordered',
      render: ordered => translateOrdered(ordered)
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const visualization = await getVisualization(7)
      setVisualization(visualization)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if(isLoading){
    return <div>Carregando...</div>
  }

  const { variables, file } = visualization

  return <div>
    <h1>Feedback</h1>
    <Image 
      alt="viz"
      src={file}
      width={200}
      height={200}
    />
    <div>{`Sua visualização tem ${variables.length} ${variables.length > 1 ? "variáveis" : "variável"} mapeada${variables.length > 1 ? "s" : ""}`}</div>
    <div>
      <Table columns={columns} dataSource={variables} />
    </div>
  </div>
}