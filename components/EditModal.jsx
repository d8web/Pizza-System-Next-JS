import { useState } from "react"
import styles from "../styles/Add.module.css"
import axios from "axios"
import { FaTimes } from 'react-icons/fa'

const Add = ({ setCloseModal, pizzaObject }) => {

    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(pizzaObject.title)
    const [desc, setDesc] = useState(pizzaObject.desc)
    const [prices, setPrices] = useState(pizzaObject.prices)
    const [extraOption, setExtraOption] = useState(pizzaObject.extraOption)
    const [extra, setExtra] = useState(null)
    const [loading, setLoading] = useState(false)

    const changePrice = (e, index) => {
        const currentPrices = prices
        currentPrices[index] = e.target.value
        setPrices(currentPrices)
    }

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value })
    }

    const handleExtra = (e) => {
        setExtraOption((prev) => [...prev, extra])
    }

    const handleEdit = async () => {

        setLoading(true)
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "uploads")

        try {

            if (file !== null) {
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dm1ld999l/image/upload",
                    data
                )

                const { url } = uploadRes.data
                const newProduct = {
                    title,
                    desc,
                    img: url || pizzaObject.img,
                    prices,
                    extraOption,
                }

                await axios.put("http://localhost:3000/api/products/" + pizzaObject._id, newProduct)
                setLoading(false)
                setCloseModal(false)
            }

            const url = pizzaObject.img
            const newProduct = {
                title,
                desc,
                img: url,
                prices,
                extraOption,
            }

            await axios.put("http://localhost:3000/api/products/" + pizzaObject._id, newProduct)
            setLoading(false)
            setCloseModal(false)

        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    return (
        <div className={styles.container}>
            {!loading ?
                <div className={styles.wrapper}>
                    <span onClick={() => setCloseModal(false)} className={styles.close}>
                        <FaTimes />
                    </span>
                    <h1>Editar pizza {pizzaObject._id.slice(0, 5)}...</h1>
                    <div className={styles.item}>
                        <label className={styles.label}>Selecione uma imagem</label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className={styles.item}>
                        <label className={styles.label}>Nome da pizza</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={title}
                            placeholder="Digite aqui nome da pizza"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label className={styles.label}>Descrição</label>
                        <textarea
                            rows={4}
                            type="text"
                            value={desc}
                            placeholder="Digite aqui descrição da pizza"
                            onChange={(e) => setDesc(e.target.value)}
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.item}>
                        <label className={styles.label}>Preços</label>
                        <div className={styles.priceContainer}>
                            <input
                                className={`${styles.input} ${styles.inputSm}`}
                                type="number"
                                placeholder="Pequena"
                                value={prices[0]}
                                onChange={(e) => changePrice(e, 0)}
                            />
                            <input
                                className={`${styles.input} ${styles.inputSm}`}
                                type="number"
                                placeholder="Média"
                                value={prices[1]}
                                onChange={(e) => changePrice(e, 1)}
                            />
                            <input
                                className={`${styles.input} ${styles.inputSm}`}
                                type="number"
                                placeholder="Grande"
                                value={prices[2]}
                                onChange={(e) => changePrice(e, 2)}
                            />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <label className={styles.label}>Ingredientes extras</label>
                        <div className={styles.extra}>
                            <input
                                className={`${styles.input} ${styles.inputSm}`}
                                type="text"
                                placeholder="Nome"
                                name="text"
                                onChange={handleExtraInput}
                            />
                            <input
                                className={`${styles.input} ${styles.inputSm}`}
                                type="number"
                                placeholder="Preço"
                                name="price"
                                onChange={handleExtraInput}
                            />
                            <button className={styles.extraButton} onClick={handleExtra}>
                                Adicionar
                            </button>
                        </div>
                        <div className={styles.extraItems}>
                            {extraOption.map((option) => (
                                <span key={option.text} className={styles.extraItem}>
                                    {option.text}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className={styles.addButton} onClick={handleEdit}>
                        Editar
                    </button>
                </div>
                :
                <div className={styles.wrapper}>
                    <div className={styles.ripple}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Add