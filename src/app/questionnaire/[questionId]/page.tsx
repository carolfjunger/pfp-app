'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QuestionInput from "@/components/QuestionInput";
import { getQuestionToStartTitleQuestionnaire } from "./actions";
import QuestionSelect from "@/components/QuestionSelect";


export default function TitlePage({ params }: { params: { questionId: string } }){
  const [question, setQuestion] = useState<any>(null)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)
  const searchParams = useSearchParams()
  const visualizationId = searchParams.get('visualizationId')

  useEffect(() => {
    async function fetchQuestion() {
      const firstQuestion  =  await getQuestionToStartTitleQuestionnaire(Number(params?.questionId))
      setQuestion(firstQuestion)
      setIsLoadingQuestion(false)
      console.log({ firstQuestion })
    } 
    fetchQuestion()
  }, [params?.questionId])

  console.log({ question })
  const text = question?.text
  const option = question?.option
  const optionType = question?.option[0]?.type

  if(optionType?.toLowerCase().includes('select')) {
    return (
      <QuestionSelect
        isLoadingQuestion={isLoadingQuestion}
        question={question}
        visualizationId={Number(visualizationId)}
        options={option}
      />
    )
  }
  
  return (
    <QuestionInput
      isLoadingQuestion={isLoadingQuestion}
      optionType={optionType}
      question={question}
      visualizationId={Number(visualizationId)}
      optionId={option?.length ? option[0].id : -1}
      questionFeedback={question?.feedback}
    />
  )
}