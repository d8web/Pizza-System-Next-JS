import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const PizzaCard = ({ pizza }) => {
    return (
        <div className={styles.container}>
            <Link href={`/product/${pizza._id}`} passHref>
                <a href="">
                    <Image src={`/img/${pizza.img}`} width={500} height={500} />
                </a>
            </Link>
            <h1 className={styles.title}>{pizza.title}</h1>
            <span className={styles.price}>
                R$ {pizza.prices[0].toFixed(2).replace('.', ',')}
            </span>
            <p className={styles.desc}>{pizza.desc}</p>
        </div>
    )
}

export default PizzaCard