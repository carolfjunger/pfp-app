'use client'
import { Button, Form, FormProps, Input, Radio } from 'antd';
import { feedback, question } from "@prisma/client";
import callAction from '@/nagevationsRules/actions';
import { getnavigationRule, saveUserAnswer } from './actions';
import { NextRouter } from 'next/router';
import handleNext from '@/nagevationsRules/handleNext';
import FeedbackModal from './FeedbackModal';
import { useState } from 'react';

const { TextArea } = Input

type FieldType = {
  question?: string;
};

type QuestionProps = {
  isLoadingQuestion: boolean,
  question: question,
  optionType: string,
  visualizationId?: number | null,
  optionId: number,
  questionFeedback: feedback[]
}

export default  function QuestionInput({ isLoadingQuestion, question, optionType, visualizationId, optionId, questionFeedback } : QuestionProps){
  const [showFeedback, setShowFeedback] = useState("")
  if(isLoadingQuestion){
    return <div>Carregando...</div>
  }

  if(!question) {
    return <div>Error: Não existe esse id não existe!</div>
  }

  
  
  const { text } = question

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try{
      const userId = localStorage.getItem('userId')
      console.log({ values})
      const userAnswer = values.question ? await saveUserAnswer(question.id, optionId, Number(userId), values.question) :  null
      if(userAnswer){
        if(questionFeedback) {
          const textFeedBack = questionFeedback.map((feedback) => feedback?.text).join("")
          setShowFeedback(textFeedBack)
        } else {
          handleNavigationRule(optionId, values?.question)
        }
        
      }
      console.log('Success:', values);
    }catch(e){
      console.log("Error on onFinish", e)
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleNavigationRule = async (optionId : number | undefined, value : string | undefined) => {
    const navigationRule = optionId ? await getnavigationRule(question.id, optionId) : null
    const rule = JSON.parse(navigationRule?.rule || '')
    if(rule?.action){
      callAction(rule?.action, [value, visualizationId])
    } if (rule?.handleNext) {
      handleNext(rule?.handleNext, visualizationId)
    }
  }

  const handleCancel = () => {
    setShowFeedback("")
  }

  const handleOk = () => {
    handleNavigationRule(undefined, "")
    setShowFeedback("")
  }

  return (
    <>
      <Form
        layout='vertical'
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label={text} name='question'>
          {
            optionType === 'bigText' ? 
              <TextArea rows={5} /> : 
              <Input  />
          }
          
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Salvar</Button>
        </Form.Item>
      </Form>
      <FeedbackModal 
        text={showFeedback}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  )
}