'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Input, InputNumber, InputNumberProps  } from 'antd';
import { question } from "@prisma/client";
import FeedbackModal from './FeedbackModal';

const { TextArea } = Input


type QuestionProps = {
  question: question,
  optionType: string,
  showFeedback: string,
  setShowFeedback: Dispatch<SetStateAction<string>>,
  optionId: number,
  handleSave: (optionId : number, value : any) => void,
  handleNavigationRule: (optionId: number | null, value: string | null) => Promise<void>
}

export default  function QuestionInput({ question, optionType, showFeedback, setShowFeedback, optionId, handleSave, handleNavigationRule } : QuestionProps){
  // const [showFeedback, setShowFeedback] = useState("")
  const [inputValue, setInputValue] = useState<string>('')

  
  const { text } = question

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  }

  const handleInputNumberChange: InputNumberProps['onChange'] = (value) => {
    setInputValue(typeof value === 'number' ? value.toString() : "");

  };



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
          onClick={() => handleSave(optionId, inputValue)}
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