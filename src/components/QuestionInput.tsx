'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Input, InputNumber, InputNumberProps  } from 'antd';
import { question } from "@prisma/client";
import FeedbackModal from './FeedbackModal';

const { TextArea } = Input


/**
 * type with props of QuestionInput Component
 *
 * @typedef {QuestionProps}
 */
type QuestionProps = {
  question: question,
  optionType: string,
  showFeedback: string,
  setShowFeedback: Dispatch<SetStateAction<string>>,
  optionId: number,
  handleSave: (optionId : number, value : any) => void,
  handleNavigationRule: (optionId: number | null, value: string | null) => Promise<void>
}

/**
 * Component that renders QuestionInput
 *
 * @export
 * @param {QuestionProps} param0
 * @param {question} param0.question Question
 * @param {string} param0.optionType Type of the option
 * @param {string} param0.showFeedback Text with feedback message
 * @param {Dispatch<SetStateAction<string>>} param0.setShowFeedback Set state of showFeedback
 * @param {number} param0.optionId Id of the option
 * @param {(optionId: number, value: any) => void} param0.handleSave Function that save user anwser
 * @param {(optionId: number, value: string) => Promise<void>} param0.handleNavigationRule Function that handle navegation rules
 * @returns {*}
 */
export default  function QuestionInput({ question, optionType, showFeedback, setShowFeedback, optionId, handleSave, handleNavigationRule } : QuestionProps){
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