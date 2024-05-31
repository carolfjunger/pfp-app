'use client'
import { useEffect, useState } from "react";
import { getQuestionToStarGraphBasicInfosQuestionnaire } from "./actions";
import { Button, Form, Input, Radio } from 'antd';

const { TextArea } = Input

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

    return (
    <Form
        layout='vertical'
        style={{ maxWidth: 600 }}
    >
        <Form.Item label={text} name='question'>
            {
                optionType === 'bigText' ? 
                    <TextArea rows={5} /> : 
                    <Input />
            }
        </Form.Item>
        <Form.Item>
            <Button type="primary">Salvar</Button>
        </Form.Item>
    </Form>
    )
}