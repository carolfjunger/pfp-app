'use client'
import React, { useState } from 'react';
import {
  Button,
  Input,
} from 'antd';
import Uploader from '@/components/uploader';
import type { GetProp, UploadProps } from 'antd';
import { createVisualization } from '@/requests/create';



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
  const [value, setValue] = useState("")
  const [file, setFile] = useState<string>('')
  
  const handleSave = async () => {
    const userId = localStorage.getItem('userId')
    if(userId){
      await createVisualization(value, file, Number(userId) )
    }
  };

  const handleFile = async (file: FileType) => {
    const fileBase64 = await getBase64(file)
    setFile(fileBase64)
  }

  const handleChangeValue = (e: any) => {
    setValue(e.target.value);
  }

  return (
    <div className='max-w-96 ml-2'>
      <div>Nome da visualização: </div>
      <Input 
        value={value}
        onChange={handleChangeValue}
      />
      <div className='mt-4 mb-2'>Arquivo: </div>
      <Uploader handleFile={handleFile} file={file} />
      <div>
        <Button 
          className='mt-4' 
          type="primary" 
          onClick={handleSave}
          disabled={!value || !file}
        >Continuar</Button>
      </div>
    </ div>
  );
};
