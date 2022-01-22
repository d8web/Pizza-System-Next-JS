import { useState } from 'react'
import styles from '../styles/OrderDetailModal.module.css'

function OrderDetailModal({ total, createOrder }) {

    const [ customer, setCustomer ] = useState("")
    const [ address, setAddress ] = useState("")

    const handleClick = () => {
        createOrder({ customer, address, total, method: 0 })
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Sua compra foi de R$ 66, o entregador foi avisado que receberá o pagamento no local.</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Nome</label>
                    <input type="text" placeholder="Jon joe" className={styles.input} onChange={(e) => setCustomer(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Telefone</label>
                    <input type="text" placeholder="35 99999-9999" className={styles.input} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Endereço</label>
                    <textarea placeholder="Elton St. N 500" type="text" rows={5} className={styles.textarea} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button className={styles.button} onClick={handleClick}>
                    Enviar
                </button>
            </div>
        </div>
    )
}

export default OrderDetailModal