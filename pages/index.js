import { useState, useEffect } from "react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Components
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import axios from 'axios'
import Add from "../components/Add"
import AddButton from "../components/AddButton"

const Home = ({ pizzaList, admin }) => {

    const [close, setClose] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Pizza Delivery</title>
                <meta name="description" content="Aplicativo pizza demo" />
                <link rel="icon" href="/pizza.ico" />
            </Head>
            <Featured />
            {admin && <AddButton setClose={setClose} />}
            {!loading ?
                <PizzaList pizzaList={pizzaList} />
                :
                <div className={styles.ripple}>
                    <div></div>
                    <div></div>
                </div>
            }
            {close && <Add setClose={setClose} />}
        </div>
    )
}

export default Home;

export const getServerSideProps = async (ctx) => {

    const myCookie = ctx.req?.cookies || ""
    let admin = false

    if (myCookie.token === process.env.TOKEN) {
        admin = true
    }

    const response = await axios.get('http://localhost:3000/api/products')
    return {
        props: {
            pizzaList: response.data,
            admin
        }
    }
}