'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Input, InputNumber, InputNumberProps  } from 'antd';
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
  question: question,
  optionType: string,
  visualizationId?: number | null,
  optionId: number,
  questionFeedback: FeedbackWithReferences[],
  setHasError: Dispatch<SetStateAction<boolean>>,
  handleNavigationRule: (optionId: number | null, value: string | null) => Promise<void>
}

export default  function QuestionInput({ question, optionType, visualizationId, optionId, questionFeedback, setHasError, handleNavigationRule } : QuestionProps){
  const [showFeedback, setShowFeedback] = useState("")
  const [inputValue, setInputValue] = useState<string>('')

  
  const { text } = question

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  }

  const handleInputNumberChange: InputNumberProps['onChange'] = (value) => {
    setInputValue(typeof value === 'number' ? value.toString() : "");

  };


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
      console.log({ inputValue })
      const userAnswer = inputValue ? await saveUserAnswer(question.id, optionId, Number(userId), inputValue) :  null
      if(userAnswer){
        if(questionFeedback.length) {
          const textFeedBack = formatFeedback()
          setShowFeedback(textFeedBack)
        } else {
          await handleNavigationRule(optionId, inputValue)
        }
      } else {
        console.log("Error", userAnswer)
      }
      console.log('Success:', inputValue);
    }catch(e){
      setHasError(true)
      console.log("Error on onFinish", e)
    }
  };
  


  // const handleNavigationRule = async () => {
  //   const navigationRule = optionId ? await getnavigationRule(question.id, optionId) : null
  //   const rule = JSON.parse(navigationRule?.rule || '')
  //   console.log(rule)
  //   if(rule?.action){
  //     await callAction(rule?.action, [inputValue, visualizationId])
  //   } if (rule?.handleNext) {
  //     handleNext(rule?.handleNext, visualizationId)
  //   }
  // }

  const handleCancel = () => {
    setShowFeedback("")
  }

  const handleOk = () => {
    handleNavigationRule(optionId, inputValue)
    setShowFeedback("")
  }

  const inputProps = {
    value: inputValue,
    onChange: handleInputChange,
    style: { marginTop: 4 }
  }


  return (
    <div className='max-w-2xl'>
      <div>{text}</div>
      {
        optionType === 'bigText' ? 
          <TextArea
            {...inputProps} 
            rows={5} 
          /> : null
      }
      {
         optionType === 'text' ? <Input {...inputProps} /> : null
      }
      {
         optionType === 'number' ? <InputNumber {...inputProps} onChange={handleInputNumberChange} /> : null
      }
      <div>
        <Button 
          className='mt-4' 
          type="primary" 
          onClick={handleSave}
          disabled={!inputValue}
        >Salvar</Button>
      </div>
      <FeedbackModal 
        text={showFeedback}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  )
}