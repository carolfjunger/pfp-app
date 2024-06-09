'use client'
import { Button, Form, FormProps, Input, Radio, Space } from 'antd';
import { feedback, question } from "@prisma/client";
import callAction from '@/nagevationsRules/actions';
import { getNavegationRule, saveUserAnswer } from './actions';
import { find } from 'lodash'
import handleNext from '@/nagevationsRules/handleNext';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import { useRouter } from 'next/navigation';

const { TextArea } = Input

type FieldType = {
  optionId?: number;
};

type option = { 
  id: number, 
  text: string, 
  type: string, 
  question_id: number | null,
  feedback: feedback[]
}


type QuestionProps = {
  isLoadingQuestion: boolean,
  question: question,
  options: option[],
  visualizationId?: number | null,
}

export default  function QuestionSelect({ isLoadingQuestion, question, options, visualizationId } : QuestionProps){
  const [showFeedback, setShowFeedback] = useState("")
  const router = useRouter()
  
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
      const { optionId } = values
      const userAnswer = optionId ? await saveUserAnswer(question.id, optionId, Number(userId), "") :  null
      
      if(userAnswer){
        const selectedOption = find(options, (option) => option.id === optionId )
        const feedback = selectedOption?.feedback
        if(feedback?.length && feedback[0]?.after_question){
          setShowFeedback(feedback[0].text)
        } else {
          handleNavegationRule()
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

  const handleCancel = () => {
    setShowFeedback("")
  }

  const handleOk = () => {
    handleNavegationRule()
    setShowFeedback("")
  }

  const handleNavegationRule = async () => {
    const navegationRule = await getNavegationRule(question.id, -1)
    console.log({ navegationRule })
    if(!navegationRule) {
      router.replace('feedback')
    }
    const rule = JSON.parse(navegationRule?.rule || '')
    if(rule?.action){
      console.log('action', rule?.action)
      // callAction(rule?.action, [values.question, visualizationId])
    } if (rule?.handleNext) {
      console.log('handleNext', rule?.handleNext)

      // handleNext(rule?.handleNext, visualizationId)
    }
  }


  return (
    <>
      <Form
        layout='vertical'
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label={text} name="optionId">
          <Radio.Group>
            <Space direction="vertical">
              {
                options.map((option) => (
                  <Radio key={option.id} value={option.id}>{option.text}</Radio>
                ))
              }
            </Space>
          </Radio.Group>
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