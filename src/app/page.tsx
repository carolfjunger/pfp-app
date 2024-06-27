'use client'
import { saveNewUser } from '@/requests/create';
import { Button, Input } from 'antd';
import { useState } from 'react';


/**
 * Page that renders the Home page
 *
 * @export
 * @returns {*}
 */
export default function Home() {
  const [value, setValue] = useState("")

  const handleSave = async () => {
    const user = value ? await saveNewUser(value) : null
    if(user){
      window.localStorage.setItem('userId', user.id.toString())
      window.location.replace('/upload');
    }
  };
  
  const handleChangeValue = (e: any) => {
    setValue(e.target.value);
  }

  return (
    <div className='max-w-96'>
      <div>Digite seu nome de usuário:</div>
      <Input 
        value={value}
        onChange={handleChangeValue}
      />
      <div>
        <Button 
          className='mt-4' 
          type="primary" 
          onClick={handleSave}
          disabled={!value}
        >Continuar</Button>
      </div>
    </div>
  );
}




