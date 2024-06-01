'use client'
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  FormProps,
  Input,
} from 'antd';
import Uploader from '@/components/uploader';
import type { GetProp, UploadProps } from 'antd';
import { createVisualization } from './actions';



type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: any): Promise<string> =>{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file.originFileObj);
  });
}
    


const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function UploadPage(){

  const [file, setFile] = useState<string>('')
  
  const onFinish: FormProps<any>['onFinish'] = async (values) => {
    const userId = localStorage.getItem('userId')
    console.log({ file })
    if(userId){
      const result = await createVisualization(values.name, file, Number(userId) )
      console.log({ result })
      console.log('Success:', values);
    }
    
  };

  const handleFile = async (file: FileType) => {
    const fileBase64 = await getBase64(file)
    setFile(fileBase64)
  }


  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item label="Nome" name='name'>
          <Input />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Uploader handleFile={handleFile} file={file} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};
