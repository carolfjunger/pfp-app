'use client'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { saveNewUser } from './actions';


type FieldType = {
  username?: string;
};

export default function Home(props : any) {

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const user = values.username ? await saveNewUser(values.username) : null
    if(user){
      window.localStorage.setItem('userId', user.id.toString())
      window.location.replace('/upload');
    }
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




