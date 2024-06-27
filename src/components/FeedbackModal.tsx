import { Modal } from 'antd';

/**
 * type with props of FeedbackModal Component
 *
 * @typedef {FeedbackModalProps}
 */
type FeedbackModalProps = {
  text: string,
  handleOk: () => void,
  handleCancel: () => void,
  
}

/**
 * Component that renders Feedback Modal
 *
 * @export
 * @param {FeedbackModalProps} param0
 * @param {string} param0.text
 * @param {() => void} param0.handleOk
 * @param {() => void} param0.handleCancel
 * @returns {Component} Modal
 */
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
