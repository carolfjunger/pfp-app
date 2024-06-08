'use client'
import { useEffect, useState } from "react";
import { getQuestionToStarGraphBasicInfosQuestionnaire } from "./actions";
import { useSearchParams } from "next/navigation";
import QuestionInput from "@/components/QuestionInput";
import { useRouter } from "next/router";


export default function GraphBasicInfosPage(){
  const [question, setQuestion] = useState<any>(null)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)

  const searchParams = useSearchParams()
  const visualizationId = searchParams.get('visualizationId')

  // const router = useRouter()
  // console.log({ router })
  
  useEffect(() => {
    async function fetchQuestion() {
      const firstQuestion  = await getQuestionToStarGraphBasicInfosQuestionnaire()
      setQuestion(firstQuestion)
      setIsLoadingQuestion(false)
    } 
    fetchQuestion()
  }, [])


  const text = question?.text
  const option = question?.option
  const optionType = question?.option[0]?.type

  return (
    <QuestionInput
      isLoadingQuestion={isLoadingQuestion}
      optionType={optionType}
      question={question}
      visualizationId={Number(visualizationId)}
      optionId={option?.length ? option[0].id : -1}
    />
  )
}