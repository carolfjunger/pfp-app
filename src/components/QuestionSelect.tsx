'use client'
import { Button, Form, FormProps, Input, Radio, RadioChangeEvent, Space } from 'antd';
import { feedback, navigation_rule, question } from "@prisma/client";
import callAction from '@/nagevationsRules/actions';
import { getQuestionNavigationRule, getnavigationRule, saveUserAnswer } from './actions';
import { find, sortBy } from 'lodash'
import handleNext from '@/nagevationsRules/handleNext';
import { useEffect, useState } from 'react';
import FeedbackModal from './FeedbackModal';
import { useRouter } from 'next/navigation';


type option = { 
  id: number, 
  text: string, 
  type: string, 
  question_id: number | null,
  feedback: feedback[]
}


type QuestionProps = {
  question: question,
  options: option[],
  visualizationId?: number | null,
}

export default  function QuestionSelect({ question, options, visualizationId } : QuestionProps){
  const [showFeedback, setShowFeedback] = useState("")
  const [value, setValue] = useState(null)
  const router = useRouter()

  
  const { text } = question

  const handleSave = async () => {
    try{
      console.log({ value })
      const userId = localStorage.getItem('userId')
      const optionId = value
      const userAnswer = optionId ? await saveUserAnswer(question.id, optionId, Number(userId), "") :  null
      if(userAnswer){
        const selectedOption = find(options, (option) => option.id === optionId )
        const feedback = selectedOption?.feedback
        if(feedback?.length && feedback[0]?.after_question){
          setShowFeedback(feedback[0].text)
        } else {
          handlenavigationRule()
        }
      }
      console.log('Success:', optionId);
    }catch(e){
      console.log("Error on onFinish", e)
    }
  };
  

  const handleCancel = () => {
    setShowFeedback("")
  }

  const handleOk = () => {
    handlenavigationRule()
    setShowFeedback("")
  }

  const handlenavigationRule = async () => {
    const optionId = value
    const navigationRule = optionId ? await getnavigationRule(question.id, optionId) : null
    if(!navigationRule) {
      router.push('/feedback')
      return
    } 
    const rule = JSON.parse(navigationRule?.rule || '')
    if(rule?.action){
      callAction(rule?.action, [optionId, visualizationId])
    } 
    handleNext(rule?.handleNext, visualizationId)
  }

  const orderedOptions = sortBy(options, (item) => {
    if (item.text === "N/A") {
      return 'zzzz';
    } if (item.text === "Sim"){
      return 'a'
    }
    return item.text.toLowerCase(); 
  })

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  }
  
  return (
    <div>
      <div>{text}</div>
      <Radio.Group className='mt-4' onChange={onChange} value={value}>
        <Space direction="vertical">
          {
            orderedOptions.map((option) => (
              <Radio key={option.id} value={option.id}>{option.text}</Radio>
            ))
          }
        </Space>
      </Radio.Group>
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