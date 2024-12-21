import { useEffect, useState } from 'react'
import Button from './Button/Button'
import Modal from './Modal/Modal'


const baseUrl = `${window.location.protocol}//${window.location.host}`;
const isapiUrl = `${baseUrl}/data/isapi.json`;

export default function RenewButton() {
  const [text, setText] = useState('');
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const [modal, setModal] = useState(false)
  const [isapi, setIsapi] = useState(null);

  useEffect(() => {

    fetch(isapiUrl) //
      .then(response => response.json())
      .then(data => setIsapi(data))
      .catch(error => console.error('Ошибка загрузки isapi.json:', error));
  }, []);

  if (!isapi) {
    return <div>Загрузка...</div>; // Рендер пока конфигурация не загрузится
  }

 
  if (!isapi.isapikey) {
    return <Button>{fetchGPT}>{status}</Button>;
  }
  else {
    return (
      <section>
        <Button
          onClick={() => setModal(true)}
        >
          Ввести Open AI API key и обработать новости
  
        </Button>
  
        <Modal open={modal}>
          <p>Введите Open AI API key</p>
          <a href="https://platform.openai.com/settings/organization/api-keys">Здесь выдают Open AI API key</a>
          {/*                 <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
          <div style={{ padding: '20px' }}>
            <input
              type="text"
              value={text}
              onChange={handleInputChange}
              placeholder="Enter some text"
              style={{padding: '5px' }}
            />
            {/*       <button onClick={handleSubmit} style={{ padding: '5px 10px' }}> */}
            {/*         Send to Server */}
            {/*       </button> */}
          </div>
  
  
          <Button onClick={() => setModal(false)}>
          Ввести</Button>
  
  
        </Modal>
      </section>
    )
  }





};
