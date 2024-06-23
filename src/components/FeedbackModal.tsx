import { Modal } from 'antd';

type FeedbackModalProps = {
  text: string,
  handleOk: () => void,
  handleCancel: () => void,
  
}

export default function FeedbackModal ({ text, handleOk, handleCancel } : FeedbackModalProps){


  return (
    <Modal 
      title="Atenção" 
      open={!!text} 
      onOk={handleOk} 
      onCancel={handleCancel}
      okText="Avançar"
      cancelText="Voltar"
    >
      {text}
    </Modal>
  );
};
