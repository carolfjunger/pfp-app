'use client'
import { useEffect, useState } from "react";
import { getQuestionToStarGraphBasicInfosQuestionnaire, saveUserAnswer } from "./actions";
import { Button, Form, FormProps, Input, Radio } from 'antd';

const { TextArea } = Input

type FieldType = {
  question?: string;
};

export default function GraphBasicInfosPage(){
  const [question, setQuestion] = useState<any>(null)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)

  useEffect(() => {
    async function fetchQuestion() {
      const firstQuestion  = await getQuestionToStarGraphBasicInfosQuestionnaire()
      setQuestion(firstQuestion)
      setIsLoadingQuestion(false)
    } 
    fetchQuestion()
  }, [])


  if(isLoadingQuestion){
    return <div>Carregando...</div>
  }

  if(!question) {
    return <div>Error: Não existe esse id não existe!</div>
  }

  const { text, option } = question
  const { type: optionType } = option[0]

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const userId = localStorage.getItem('userId')
    values.question ? await saveUserAnswer(question.id, option[0].id, Number(userId), values.question) :  null
    console.log('Success:', values);
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