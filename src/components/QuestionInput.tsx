'use client'
import { useState } from 'react';
import { Button, Input } from 'antd';
import { question, references } from "@prisma/client";
import callAction from '@/nagevationsRules/actions';
import { getnavigationRule, saveUserAnswer } from './actions';
import { NextRouter } from 'next/router';
import handleNext from '@/nagevationsRules/handleNext';
import FeedbackModal from './FeedbackModal';
import { reduce } from 'lodash';

const { TextArea } = Input

type FieldType = {
  question?: string;
};

type FeedbackWithReferences = {
  id: number,
  text: string,
  option_id: number | null,
  question_id: number | null,
  after_question: boolean | null,
  references: references[]
}

type QuestionProps = {
  isLoadingQuestion: boolean,
  question: question,
  optionType: string,
  visualizationId?: number | null,
  optionId: number,
  questionFeedback: FeedbackWithReferences[]
}

export default  function QuestionInput({ isLoadingQuestion, question, optionType, visualizationId, optionId, questionFeedback } : QuestionProps){
  const [showFeedback, setShowFeedback] = useState("")
  const [inputValue, setInputValue] = useState<string>('')

  if(isLoadingQuestion){
    return <div>Carregando...</div>
  }

  if(!question) {
    return <div>Error: Não existe esse id não existe!</div>
  }

  
  
  const { text } = question

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  }

  const formatFeedback = () => {
    return reduce(questionFeedback, (result : string, value : FeedbackWithReferences) => {
      const feedbackText = value.text
      const references = value?.references.map((reference : references) => reference?.citation).join("")
      result += feedbackText + " " + references
      return result
    }, "")
  }

  const handleSave = async () => {
    try{
      const userId = localStorage.getItem('userId')
      const userAnswer = inputValue ? await saveUserAnswer(question.id, optionId, Number(userId), inputValue) :  null
      if(userAnswer){
        if(questionFeedback.length) {
          const textFeedBack = formatFeedback()
          setShowFeedback(textFeedBack)
        } else {
        
          handleNavigationRule()
        }
      } else {
        console.log("Error")
      }
      console.log('Success:', inputValue);
    }catch(e){
      console.log("Error on onFinish", e)
    }
  };
  


  const handleNavigationRule = async () => {
    console.log('entrou')
    const navigationRule = optionId ? await getnavigationRule(question.id, optionId) : null
    const rule = JSON.parse(navigationRule?.rule || '')
    console.log(rule)
    if(rule?.action){
      callAction(rule?.action, [inputValue, visualizationId])
    } if (rule?.handleNext) {
      handleNext(rule?.handleNext, visualizationId)
    }
  }

  const handleCancel = () => {
    setShowFeedback("")
  }

  const handleOk = () => {
    handleNavigationRule()
    setShowFeedback("")
  }

  return (
    <div className='max-w-2xl'>
      <div>{text}</div>
      {
        optionType === 'bigText' ? 
          <TextArea
            value={inputValue}
            onChange={handleInputChange}
            style={{ marginTop: 4 }} 
            rows={5} 
          /> : 
          <Input 
            value={inputValue}
            onChange={handleInputChange}
            style={{ marginTop: 4 }} 
          />
      }
      
      <div>
        <Button className='mt-4' type="primary" onClick={handleSave}>Salvar</Button>
      </div>
      <FeedbackModal 
        text={showFeedback}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  )
}