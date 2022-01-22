import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Navbar = () => {

    const quantity = useSelector(state => state.cart.quantity)

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Image
                        src="/img/phone.png"
                        width={32}
                        height={32}
                        alt="Pizzaria"
                        priority={true}
                    />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>PEÇA AGORA!</div>
                    <div className={styles.text}>(35) 0 0000-0000</div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href="/" passHref>
                        <li className={styles.listItem}>Home</li>
                    </Link>
                    <li className={styles.listItem}>Menu</li>
                    <Image
                        priority={true}
                        src="/img/logo.png"
                        width={110}
                        height={96}
                        alt="logo"
                    />
                    <li className={styles.listItem}>Sobre</li>
                    <li className={styles.listItem}>Contato</li>
                </ul>
            </div>
            <Link href="/cart" passHref>
                <div className={styles.item}>
                    <div className={styles.cart}>
                        <Image
                            src="/img/cart.png"
                            width={30}
                            height={30}
                            alt="logo"
                        />
                        <div className={styles.counter}>{quantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Navbar