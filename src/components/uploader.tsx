'use client'
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import Image from 'next/image';
import { useState } from 'react';


const { Dragger } = Upload;



const props: UploadProps = {
  name: 'file',
  multiple: false,
//   action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function Uploader({ file, handleFile } : any)  {

  const handleChangeFile = (info : any) => {
    handleFile(info.file)
  }

  const uploadButton = (
    <Button style={{ border: 0, background: 'none' }}>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      
      <div style={{ marginTop: 8 }}>Upload</div>
    </Button>
  );

  return <>
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChangeFile}
    >
      {file ? 
        <Image 
          alt='graph'
          src={file}
          width={100}
          height={100}
        />
        // <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> 
        : uploadButton}
    </Upload>
    {/* <Dragger 
      name='file'
      multiple={false}
      onChange={handleChangeFile}
    >
      <p className="ant-upload-drag-icon">
      <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
      </p>
    </Dragger> */}
  </>
}