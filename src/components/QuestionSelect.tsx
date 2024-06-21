'use client'
import { Button, Form, FormProps, Input, Radio, RadioChangeEvent, Space } from 'antd';
import { feedback, navigation_rule, question } from "@prisma/client";
import callAction from '@/nagevationsRules/actions';
import { getQuestionNavigationRule, getnavigationRule, saveUserAnswer } from './actions';
import { find, sortBy } from 'lodash'
import handleNext from '@/nagevationsRules/handleNext';
import { Dispatch, SetStateAction, useState } from 'react';
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
  handleNavigationRule: (optionId: number | null, value: string | null) => Promise<void>
  handleSave: (optionId : number | null, value : any) => void,
  showFeedback: string,
  setShowFeedback: Dispatch<SetStateAction<string>>,
}

export default  function QuestionSelect({ question, options, handleNavigationRule, handleSave, showFeedback, setShowFeedback } : QuestionProps){
  // const [showFeedback, setShowFeedback] = useState("")
  const [value, setValue] = useState(null)
  // const router = useRouter()

  
  const { text } = question

  

  const handleCancel = () => {
    setShowFeedback("")
  }

  const handleOk = () => {
    handleNavigationRule(value, value)
    setShowFeedback("")
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
        <Button 
          className='mt-4' 
          type="primary" 
          onClick={() => handleSave(value, value)}
          disabled={!value}
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