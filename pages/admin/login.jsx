import { useState } from "react"
import { useRouter } from "next/router"
import styles from "../../styles/Login.module.css"
import axios from "axios"

const Login = () => {

    const router = useRouter()

    const [ username, setUsername ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ error, setError ] = useState(false)

    const handleClick = async () => {
        try {

            await axios.post("http://localhost:3000/api/login", {
                username,
                password
            })

            router.push("/admin")

        } catch (err) {
            setError(true)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Painel da Adminstração</h1>
                <input
                    type="text"
                    placeholder="Adminstrador"
                    className={styles.input}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.button} onClick={handleClick}>Login</button>
                {error && <div className={styles.error}>Email e/ou senha incorretos!</div> }
            </div>
        </div>
    )
}

export default Login