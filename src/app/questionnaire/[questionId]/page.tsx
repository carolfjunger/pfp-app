'use client'
import { useEffect, useState } from "react";
import {  useSearchParams } from "next/navigation";
import QuestionInput from "@/components/QuestionInput";
import { getQuestionById } from "./actions";
import QuestionSelect from "@/components/QuestionSelect";
import { getUserAnswer } from "@/requests/get";
import { Button } from "antd";
import { user_answer } from "@prisma/client";
import { getnavigationRule } from "@/components/actions";
import handleNext from "@/nagevationsRules/handleNext";
import { useRouter } from "next/navigation";
import callAction from "@/nagevationsRules/actions";


export default function TitlePage({ params }: { params: { questionId: string } }){
  const [question, setQuestion] = useState<any>(null)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)
  const [userAnswer, setUserAnswer] = useState<user_answer | null>(null)
  const [hasError, setHasError] = useState(false)

  const searchParams = useSearchParams()
  const visualizationId = searchParams.get('visualizationId')
  const route = useRouter()

  useEffect(() => {
    async function fetchQuestion() {
      const firstQuestion  =  await getQuestionById(Number(params?.questionId))
      setQuestion(firstQuestion)
      setIsLoadingQuestion(false)
    }
    async function fetchUserAnswer() {
      const userId = localStorage.getItem("userId")
      const userAnswer = await getUserAnswer(Number(userId), Number(params?.questionId) )
      if(userAnswer){
        setUserAnswer(userAnswer)
      }
    }
    fetchUserAnswer()
    fetchQuestion()
  }, [params?.questionId])


  const handleNextQuestion = async () => {
    const navegationRule = userAnswer?.question_id ? 
      await getnavigationRule(userAnswer.question_id, userAnswer?.option_id) 
      : null
    if(navegationRule?.rule){
      const rule = JSON.parse(navegationRule.rule)
      if(rule?.handleNext) {
        handleNext(rule?.handleNext, Number(visualizationId))
        return
      }
    }
    route.replace(`/feedback?visualizationId=${visualizationId}`)
  }

  const handleNavigationRule = async (optionId: number | null, value: string | null) => {
    const navigationRule = optionId ? await getnavigationRule(question.id, optionId) : null
    if(!navigationRule) {
      route.replace(`/feedback?visualizationId=${visualizationId}`)
      return
    } 
    const rule = JSON.parse(navigationRule?.rule || '')
    if(rule?.action){
      await callAction(rule?.action, [value, visualizationId])
    } 
    handleNext(rule?.handleNext, Number(visualizationId))
  }

  const restart = () => {
    route.replace('/')
  }

  const option = question?.option
  const optionType = question?.option[0]?.type

  if(isLoadingQuestion){
    return <div>Carregando...</div>
  }

  if(!question) {
    return <div>Error: Não existe esse id não existe!</div>
  }

  if(!!userAnswer){
    return <div>
      <div className="mb-2">
        Voce ja respondeu essa pergunta
      </div>
      <Button
        type="primary"
        onClick={handleNextQuestion}
      >Seguir para a próxima</Button>
      <Button
        className="ml-4"
        onClick={restart}
      >
        Recomeçar questionário
      </Button>
    </div>
  }

  
  if(hasError){
    return <div>
      <div>Ocorreu um erro inesperado</div>
      <Button onClick={restart}>Recomeçar</Button>
    </div>
  }

  if(optionType?.toLowerCase().includes('select')) {
    return (
      <QuestionSelect
        question={question}
        visualizationId={Number(visualizationId)}
        options={option}
        handleNavigationRule={handleNavigationRule}
      />
    )
  }
  
  return (
    <QuestionInput
      optionType={optionType}
      question={question}
      visualizationId={Number(visualizationId)}
      optionId={option?.length ? option[0].id : -1}
      questionFeedback={question?.feedback}
      setHasError={setHasError}
      handleNavigationRule={handleNavigationRule}
    />
  )
}