import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import EditModal from "../../components/EditModal"
import styles from "../../styles/Admin.module.css"

const Admin = ({ pizzaData }) => {

    const router = useRouter()

    const [pizzaList, setPizzaList] = useState(pizzaData)

    const [pizzaObject, setPizzaObject] = useState({})
    const [closeModal, setCloseModal] = useState(false)

    const handleModalOpen = (id) => {
        setCloseModal(true)

        let product = pizzaList.filter(item => item._id === id)
        //console.log(product)
        setPizzaObject(product[0])
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete("http://localhost:3000/api/products/" + id)
            setPizzaList(pizzaList.filter(item => item._id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    const handleOrdersGo = () => {
        router.push("/admin/orders")
    }

    return (
        <div className={styles.container}>
            {pizzaList.length > 0 &&

                <div className={styles.item}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Produtos</h1>
                        <button
                            className={styles.nextButton}
                            onClick={handleOrdersGo}
                        >Pedidos</button>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.trTitle}>
                                <th>ID</th>
                                <th>Imagem</th>
                                <th>Nome</th>
                                <th className={styles.centerTableItem}>Preços</th>
                                <th className={styles.rightTableItem}>Ingredientes extras</th>
                                <th className={styles.rightTableItem}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pizzaList.map((item) => (
                                <tr className={styles.trTitle} key={item._id}>
                                    <td>{item._id.slice(0, 5)}...</td>
                                    <td>
                                        <Image
                                            src={`/img/${item.img}`}
                                            width={50}
                                            height={50}
                                            objectFit="cover"
                                        />
                                    </td>
                                    <td>{item.title}</td>
                                    <td className={styles.centerTableItem}>
                                        R$ {item.prices[2].toFixed(2).replace('.', ',')}
                                    </td>
                                    <td className={styles.rightTableItem}>
                                        {item.extraOption.map((item, key) => (
                                            <span key={key}>{item.text},</span>
                                        ))}
                                    </td>
                                    <td className={styles.rightTableItem}>
                                        <button
                                            className={styles.button}
                                            onClick={() => handleModalOpen(item._id)}
                                        >Editar</button>
                                        <button
                                            className={styles.button}
                                            onClick={() => handleDelete(item._id)}
                                        >Deletar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            }

            {closeModal &&
                <EditModal
                    setCloseModal={setCloseModal}
                    pizzaObject={pizzaObject}
                />
            }
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || ""

    if(myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false
            }
        }
    } else {
        const response = await axios.get('http://localhost:3000/api/products')
        return {
            props: {
                pizzaData: response.data
            }
        }
    }
}

export default Admin