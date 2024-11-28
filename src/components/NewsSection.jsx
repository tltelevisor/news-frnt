import ShowNews from './ShowNews'
import { useEffect, useState, useCallback } from 'react'
import Button from './Button/Button'

const baseUrl = `${window.location.protocol}//${window.location.host}`;
// const baseUrl = `http://127.0.0.1:5000`
const apiUrl = `${baseUrl}/data`;
const renewUrl = `${baseUrl}/renew`;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function NewsSection() {

    const [status, setStatus] = useState("Проанализировать в ChatGPT"); // Статус загрузки

    const [loading, setLoading] = useState(false)
    const [newss, setNewss] = useState([])

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

    return (
        <section>
            <div style={{ marginBottom: '1rem', textAlign: "center" }} >
                <Button onClick={fetchGPT}>{status}</Button>
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
