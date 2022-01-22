import { useState } from 'react'
import styles from '../styles/Featured.module.css'
import Image from 'next/image'

const Featured = () => {
    const [index, setIndex] = useState(0)

    const sliderData = [
        {
            title: "Fazemos a melhor pizza da região, confira todos os sabores no menu!",
            desc: "Nosso diferencial além de fazer a melhor pizza é o tempo em que realizamos nosso trabalho.",
            img: "/img/featured.png"
        },
        {
            title: "Ingredientes frescos, tudo pronto e quentinho pra você saborear.",
            desc: "Preparamos todos os ingredientes, falta só você fazer seu pedido e em alguns minutos vai estar saboreando uma bela pizza.",
            img: "/img/featured-pizza.png"
        },
        {
            title: "Adicione mais ingredientes e deixe sua pizza ainda mais bonita!",
            desc: "Mais é sempre bem-vindo, adicione ingredientes e deixe sua pizza mais saborosa e turbinada.",
            img: "/img/pizza-new.png"
        }
    ]

    const handleArrow = (direction) => {
        if (direction === "l") {
            setIndex(index !== 0 ? index - 1 : sliderData.length - 1)
        }

        if (direction === "r") {
            setIndex(index !== 2 ? index + 1 : 0)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow("l")}>
                <Image src="/img/arrowl.png" width={80} height={80} objectFit="contain" />
            </div>
            <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
                {sliderData.map((item, index) => (
                    <div className={styles.imgContainer} key={index}>
                        <div className={styles.leftArea}>
                            <h1 className={styles.titleHeadline}>{item.title}</h1>
                            <p className={styles.descHeadline}>{item.desc}</p>
                        </div>
                        <div className={styles.rightArea}>
                            <Image src={item.img} width={600} height={600} objectFit='contain'/>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow("r")}>
                <Image src="/img/arrowr.png" width={80} height={80} objectFit="contain" />
            </div>
        </div>
    )
}

export default Featured