import styles from '../styles/Add.module.css'

const AddButton = ({ setClose }) => {
    return (
        <div className={styles.mainAddButton} onClick={() => setClose(true)}>
            Adicionar Pizza
        </div>
    )
}

export default AddButton