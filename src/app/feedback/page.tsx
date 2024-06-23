'use client'

import { useEffect, useState } from "react"
import { List, Table } from 'antd';
import type { TableProps } from 'antd';
import { translateAggregator, translateDataType, translateOrdered, translateVariableType } from "./utils";
import Image from "next/image";
import { references } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { getManyUsersFeedbacks, getVisualization } from "@/requests/find";

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
  const [feedbacks, setFeedbacks] = useState<any[]>([])
  const searchParams = useSearchParams()
  const visualizationId = searchParams.get('visualizationId')


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
      const userId = localStorage.getItem("userId")
      const visualization = await getVisualization(Number(visualizationId))
      setVisualization(visualization)
      const feedbacks = await getManyUsersFeedbacks(Number(userId))
      setFeedbacks(feedbacks)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const mapReferences = (references : references[]) => {
    return references.map((reference : references) => reference.citation).join(',')
  }

  if(isLoading){
    return <div>Carregando...</div>
  }

  const { variables, file } = visualization

  return <div className="max-w-5xl p-4">
    <h1>Feedback</h1>
    <Image 
      className="mt-3"
      alt="viz"
      src={file}
      width={300}
      height={300}
    />
    <div className="mt-3">{`Sua visualização tem ${variables.length} ${variables.length > 1 ? "variáveis" : "variável"} mapeada${variables.length > 1 ? "s" : ""}`}</div>
    <div className="mt-3">
      <Table columns={columns} dataSource={variables} />
    </div>
    <h3 className="mt-3">De acordo com as suas respostas foram mapeados os seguintes feedbacks:</h3>
    <List
      className="mt-3"
      bordered
      dataSource={feedbacks}
      renderItem={(item) => (
        <List.Item>
          <div>{`${item[0]?.text} ${mapReferences(item[0]?.references)}`}</div>
        </List.Item>
      )}
    />
  </div>
}