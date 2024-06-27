'use client'
import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import Image from 'next/image';



/**
 * Props from upload component
 *
 * @type {UploadProps}
 */
const props: UploadProps = {
  name: 'file',
  multiple: false,
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

/**
 * Component that renders Uploader
 *
 * @export
 * @param {*} param0
 * @param {*} param0.file File
 * @param {*} param0.handleFile function that handle the manipulation of file
 * @returns {*}
 */
export default function Uploader({ file, handleFile } : any)  {

  const handleChangeFile = (info : any) => {
    handleFile(info.file)
  }

  const uploadButton = (
    <Button style={{ border: 0, background: 'none' }}>
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
        : uploadButton}
    </Upload>
  </>
}