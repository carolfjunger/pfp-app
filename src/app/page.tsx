'use client'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Home(props : any) {

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    values.username ? await saveNewUser(values.username) : null
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}


import prisma from '../lib/prisma'
import { saveNewUser } from './actions';
import { redirect } from 'next/dist/server/api-utils';

