import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { useEffect, useState } from 'react'

const baseUrl = `${window.location.protocol}//${window.location.host}`;
const configUrl = `${baseUrl}/data/config.json`;

const AppWrapper = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {

    fetch(configUrl) //
      .then(response => response.json())
      .then(data => setConfig(data))
      .catch(error => console.error('Ошибка загрузки конфигурации:', error));
  }, []);

  if (!config) {
    return <div>Загрузка...</div>; // Рендер пока конфигурация не загрузится
  }

  return <App config={config} />;
};

{/* ReactDOM.render(<AppWrapper />, document.getElementById('root')); */}




const root = document.getElementById('root')
{/* ReactDOM.createRoot(root).render(<App />) */}
ReactDOM.createRoot(root).render(<AppWrapper />)
