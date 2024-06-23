'use client'
import { useEffect, useState } from "react";
import {  useSearchParams } from "next/navigation";
import QuestionInput from "@/components/QuestionInput";
import { getQuestionById } from "./actions";
import QuestionSelect from "@/components/QuestionSelect";
import { getUserAnswer } from "@/requests/get";
import { Button } from "antd";
import { references, user_answer } from "@prisma/client";
import { getnavigationRule, saveUserAnswer } from "@/components/actions";
import handleNext from "@/nagevationsRules/handleNext";
import { useRouter } from "next/navigation";
import callAction from "@/nagevationsRules/actions";
import { find, reduce } from "lodash";

type FeedbackWithReferences = {
  id: number,
  text: string,
  option_id: number | null,
  question_id: number | null,
  after_question: boolean | null,
  references: references[]
}


export default function TitlePage({ params }: { params: { questionId: string } }){
  const [question, setQuestion] = useState<any>(null)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)
  const [userAnswer, setUserAnswer] = useState<user_answer | null>(null)
  const [hasError, setHasError] = useState(false)
  const [showFeedback, setShowFeedback] = useState("")

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

  
  const formatFeedback = (feedback : any) => {
    return reduce(feedback, (result : string, value : FeedbackWithReferences) => {
      console.log({ value })
      const feedbackText = value.text
      const references = value?.references.map((reference : references) => reference?.citation).join("")
      result += feedbackText + " " + references
      return result
    }, "")
  }

  const getFeedback = (optionId : number | null) => {
    const options = question?.option
    const selectedOption = find(options, (option) => option.id === optionId )
    const feedback = selectedOption?.feedback
    if(feedback) return feedback
    const questionFeedback = question?.feedback
    return questionFeedback
  }

  const handleSave = async (optionId : number | null, value : any) => {
    try{
      const feedback = getFeedback(optionId)
      const userId = localStorage.getItem('userId')
      const userAnswer = optionId ? await saveUserAnswer(question.id, optionId, Number(userId), value) :  null
      if(userAnswer){
        if(feedback.length) {
          const textFeedBack = formatFeedback(feedback)
          setShowFeedback(textFeedBack)
        } else {
          await handleNavigationRule(optionId, value)
        }
      } else {
        console.log("Error", userAnswer)
      }
      console.log('Success:', value);
    }catch(e){
      setHasError(true)
      console.log("Error on onFinish", e)
    }
  };

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
        handleSave={handleSave}
        showFeedback={showFeedback}
        setShowFeedback={setShowFeedback}
      />
    )
  }
  
  return (
    <QuestionInput
      optionType={optionType}
      question={question}
      handleSave={handleSave}
      optionId={option?.length ? option[0].id : -1}
      handleNavigationRule={handleNavigationRule}
      showFeedback={showFeedback}
      setShowFeedback={setShowFeedback}
    />
  )
}