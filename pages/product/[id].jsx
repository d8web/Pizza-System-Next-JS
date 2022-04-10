import { useState } from 'react'
import styles from '../../styles/Product.module.css'
import Image from "next/image"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'

const Product = ({ pizza }) => {

    const dispatch = useDispatch()

    const [ price, setPrice ] = useState(pizza.prices[0])
    const [ size, setSize ] = useState(0)
    const [ quantity, setQuantity ] = useState(1)
    const [ extras, setExtras ] = useState([])

    const changePrice = (number) => {
        setPrice(price + number)
    }

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size]
        setSize(sizeIndex)
        changePrice(difference)
    }

    const handleChange = (e, option) => {
        const checked = e.target.checked

        if(checked) {
            changePrice(option.price)
            setExtras((prev) => [ ...prev, option ])
        } else {
            changePrice(-option.price)
            setExtras(extras.filter(extra => extra._id !== option._id))
        }
    }

    const handleClick = () => {
        dispatch(addProduct({...pizza, extras, price, quantity}))
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.imgContainer}>
                    <Image src={`/img/${pizza.img}`} layout="fill" objectFit="contain" priority={true} />
                </div>
            </div>
            <div className={styles.rightSide}>
                <h1 className={styles.title}>{pizza.title}</h1>
                <span className={styles.price}>R$ {price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Escolha o tamanho</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src="/img/size.png" layout="fill"/>
                        <span className={styles.number}>Brotinho</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/img/size.png" layout="fill"/>
                        <span className={styles.number}>Média</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src="/img/size.png" layout="fill"/>
                        <span className={styles.number}>Grande</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Escolha um ingrediente adicional!</h3>
                <div className={styles.ingredients}>
                    {pizza.extraOption.map((option) => (
                        <div className={styles.option} key={option._id}>
                            <input
                                type="checkbox"
                                name={option.text}
                                id={option.text}
                                className={styles.checkbox}
                                onChange={(e) => handleChange(e,option)}
                            />
                            <label htmlFor="double">{option.text}</label>
                        </div>
                    ))}
                </div>
                <div className={styles.add}>
                    <input
                        type="number"
                        defaultValue={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className={styles.quantity}
                    />
                    <button className={styles.button} onClick={handleClick}>Adicionar ao carrinho</button>
                </div>
            </div>
        </div>
    );
}

export default Product;

export const getServerSideProps = async ({ params }) => {
    const response = await axios.get(`http://localhost:3000/api/products/${params.id}`)
    return {
        props: {
            pizza: response.data
        }
    }
}