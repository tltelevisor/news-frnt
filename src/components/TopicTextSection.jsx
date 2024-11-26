import { useEffect, useState, useCallback } from 'react'
import Button from './Button/Button'
import Modal from './Modal/Modal'

export default function TopicTextSection(children) {
    const [modal, setModal] = useState(false)

    return (
        <section>
            <Button
                {...children}
                onClick={() => setModal(true)}
            >
                {children.topic}

            </Button>

            <Modal open={modal}>
                <p>{children.long_text}</p>
                <Button
                    onClick={() => setModal(false)}
                >
                    Закрыть
                </Button>
            </Modal>
        </section>
    )
}