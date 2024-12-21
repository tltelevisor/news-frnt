import ShowNews from './ShowNews'
import { useEffect, useState, useCallback } from 'react'
import Button from './Button/Button'
import Modal from './Modal/Modal'
import RenewButton from './RenewButton'

const baseUrl = `${window.location.protocol}//${window.location.host}`;
// const baseUrl = `http://127.0.0.1:5000`
// const apiUrl = `${baseUrl}/data`;
const apiUrl = `${baseUrl}/data/news_prod.json`;
const renewUrl = `${baseUrl}/renew`;
const isapiUrl = `${baseUrl}/data/isapi.json`;
const renewKey = `${baseUrl}/rekey`;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function NewsSection() {

    const [isapi, setIsapi] = useState(null);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState("Проанализировать в ChatGPT"); // Статус загрузки
    const [loading, setLoading] = useState(false);
    const [newss, setNewss] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetch(isapiUrl) //
            .then(response => response.json())
            .then(data => setIsapi(data))
            .catch(error => console.error('Ошибка загрузки isapi.json:', error));
    }, []);

    const fetchNewss = useCallback(async () => {
        setLoading(true)
        const response = await fetch(apiUrl)
        const newss = await response.json()
        setNewss(newss)
        setLoading(false)

    }, [])

    useEffect(() => {
        fetchNewss()
    }, [fetchNewss])

    async function fetchGPT() {
        setStatus("...Анализ (около 2 минут на 10 новостей)")
        try {
            const response = await fetch(renewUrl)
            if (response.ok) {
                const data = await response.json();
                console.log("Ответ сервера:", data);
                setStatus("загружено");
            } else {
                setStatus("Ошибка");
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
            setStatus("Ошибка");
        }
        fetchNewss()
        setStatus("Проанализировать в ChatGPT")
    }

    async function fetchGPTKEY() {
        setModal(false)
        setStatus("...Анализ (около 2 минут на 10 новостей)")
        try {
            const response = await fetch(renewKey, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
              });
          console.log({ text })
          console.log(text)
          console.log(JSON.stringify({ text }))
            if (response.ok) {
                const data = await response.json();
                console.log("Ответ сервера:", data);
                setStatus("загружено");
            } else {
                setStatus("Ошибка");
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
            setStatus("Ошибка");
        }
        fetchNewss()
        setStatus("Проанализировать в ChatGPT")
    }

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    if (!isapi) {
        return <div>Загрузка...</div>; // Рендер пока конфигурация не загрузится
    }
    else {
        if (isapi.isapikey) {

            return (
                <section>
                    <div style={{ marginBottom: '1rem', textAlign: "center" }} >
                        <Button onClick={fetchGPT}>{status}</Button>
                        {/* <RenewButton>"hhhhhhh"</RenewButton> */}
                    </div>
                    {loading && <p>Loading...</p>}
                    {!loading && (
                        <>
                            <ul>
                                {newss.map((new1) => (
                                    <ShowNews key={new1.id} {...new1}>
                                    </ShowNews>
                                ))}
                            </ul>
                        </>
                    )}
                </section>
            )
        }

        else {
            return (
                <section>
                    <div style={{ marginBottom: '1rem', textAlign: "center" }} >
                        <Button onClick={() => setModal(true)}>
                            Ввести Open AI API key и обработать новости
                        </Button>
                    </div>
                    <Modal open={modal}>
                        <p>Введите Open AI API key</p>
                        <a href="https://platform.openai.com/settings/organization/api-keys">Здесь выдают Open AI API key</a>
                        {/*                 <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                        <div style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <input
                                type="text"
                                value={text}
                                onChange={handleInputChange}
                                placeholder="Enter some text"
                                style={{ padding: '5px' }}
                            />
                            {/*       <button onClick={handleSubmit} style={{ padding: '5px 10px' }}> */}
                            {/*         Send to Server */}
                            {/*       </button> */}
                        </div>
                        {/* <Button onClick={() => setModal(false)}> Ввести</Button> */}
                        <Button onClick={fetchGPTKEY}>Ввести</Button>
                        {/* <Button onClick={fetchGPT}>{status}</Button> */}
                    </Modal>

                    {loading && <p>Loading...</p>}
                    {!loading && (
                        <>
                            <ul>
                                {newss.map((new1) => (
                                    <ShowNews key={new1.id} {...new1}>
                                    </ShowNews>
                                ))}
                            </ul>
                        </>
                    )}


                </section>
            )
        }
    }
}