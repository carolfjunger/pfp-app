'use client'
import { Button, Radio, RadioChangeEvent, Space } from 'antd';
import { feedback, question } from "@prisma/client";
import { sortBy } from 'lodash'
import { Dispatch, SetStateAction, useState } from 'react';
import FeedbackModal from './FeedbackModal';


/**
 * Option type with feedback
 *
 * @typedef {option}
 */
type option = { 
  id: number, 
  text: string, 
  type: string, 
  question_id: number | null,
  feedback: feedback[]
}


/**
 *  type with props of QuestionSelect Component
 *
 * @typedef {QuestionProps}
 */
type QuestionProps = {
  question: question,
  options: option[],
  visualizationId?: number | null,
  handleNavigationRule: (optionId: number | null, value: string | null) => Promise<void>
  handleSave: (optionId : number | null, value : any) => void,
  showFeedback: string,
  setShowFeedback: Dispatch<SetStateAction<string>>,
}

/**
 * Component that renders QuestionSelect
 *
 * @export
 * @param {QuestionProps} param0
 * @param {question} param0.question Question
 * @param {{}} param0.options  Lis of options
 * @param {(optionId: number, value: string) => Promise<void>} param0.handleNavigationRule Function that handle navegation rules
 * @param {(optionId: number, value: any) => void} param0.handleSave Function that save user anwser
 * @param {string} param0.showFeedback Text with feedback message
 * @param {Dispatch<SetStateAction<string>>} param0.setShowFeedback Set state of showFeedback
 * @returns {*\}
 */
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