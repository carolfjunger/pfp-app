'use client'
import { Button, Form, FormProps, Input, Radio } from 'antd';
import { question } from "@prisma/client";

const { TextArea } = Input

type FieldType = {
  question?: string;
};

type QuestionProps = {
  isLoadingQuestion: boolean,
  question: question,
  optionType: string,
  onFinish: FormProps<FieldType>['onFinish'], 
  onFinishFailed: FormProps<FieldType>['onFinishFailed']
}

export default function Question({ isLoadingQuestion, question, optionType,  onFinish, onFinishFailed } : QuestionProps){
  if(isLoadingQuestion){
    return <div>Carregando...</div>
  }

  if(!question) {
    return <div>Error: Não existe esse id não existe!</div>
  }

  const { text } = question


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