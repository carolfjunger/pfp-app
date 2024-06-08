'use client'
import { Button, Form, FormProps, Input, Radio } from 'antd';
import { question } from "@prisma/client";
import callAction from '@/nagevationsRules/actions';
import { getNavegationRule, saveUserAnswer } from './actions';
import { NextRouter } from 'next/router';
import handleNext from '@/nagevationsRules/handleNext';
import { useRouter } from 'next/navigation';

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
  router?: NextRouter,
}

export default  function QuestionInput({ isLoadingQuestion, question, optionType, visualizationId, optionId } : QuestionProps){
  
  const router = useRouter()
  console.log({ router })

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
      const userAnswer = values.question ? await saveUserAnswer(question.id, optionId, Number(userId), values.question) :  null
      if(userAnswer){
        const navegationRule = await getNavegationRule(question.id, optionId)
        console.log(navegationRule?.rule)
        const rule = JSON.parse(navegationRule?.rule || '')
        if(rule?.action){
          callAction(rule?.action, [values.question, visualizationId])
        } if (rule?.handleNext) {
          handleNext(rule?.handleNext, undefined)
        }
      }
      console.log('Success:', values);
    }catch(e){
      console.log({ e })
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
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
            <Input />
        }
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Salvar</Button>
      </Form.Item>
    </Form>
  )
}