import styles from '../styles/Footer.module.css';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src="/img/logo.png" width={300} height={260} priority={true} />
            </div>
            <div className={styles.item}>
                <h3>Fazemos a melhor fatia de pizza!</h3>
                <p>A Pizzaria foi inaugurada em X de XX de XXXX pelos Sr. Username e UserSocio, na Rua XXXXX XXXXX, 0000 esquina com a rua XXXX, City ESTADO. Em nosso cardápio as pizzas têm um lugar em destaque.</p>
                <p>Temos ingredientes frescos para sua pizza, o tempo de entrega também é um dos nossos diferenciais.</p>
            </div>
            <div className={styles.item}>
                <h3>Endereço</h3>
                <ul className={styles.list}>
                    <li>Rua Téofilo Andrade, N° 456</li>
                    <li>Carrancas, 37245000</li>
                    <li>(55) 45769-2684</li>
                    <br />
                    <li>Rua Téofilo Andrade, N° 456</li>
                    <li>Carrancas, 37245000</li>
                    <li>(55) 45769-2684</li>
                </ul>
            </div>
            <div className={styles.item}>
                <h3>Horário de atendimento</h3>
                <ul className={styles.listHours}>
                    <li>Segunda - Quinta</li>
                    <li>11:00:00 - 18:00:00</li>
                    <li>Sexta e Sábado</li>
                    <li>10:00:00 - 22:00:00</li>
                    <li>Domingos - Feriados</li>
                    <li>12:00:00 - 18:00:00</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;