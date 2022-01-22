import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>A mais saborosa da cidade!</h1>
            <p className={styles.desc}>
                Temos ingredientes frescos para sua pizza, o tempo de entrega também é um dos nossos diferenciais.
            </p>
            <div className={styles.wrapper}>
                {pizzaList.map((pizza) => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                ))}
            </div>
        </div>
    );
}

export default PizzaList;