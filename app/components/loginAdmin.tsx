'use client'

import styles from "./style/formAddGame.module.css"
import { useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginAdmin = () => {    

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
        login,
        password,
        redirect: false,
    });

    setLoading(false);

    if (result?.error) {
        setError("Неверный логин или пароль");
        return;
    }

    router.push("/admin");
    router.refresh()
};

    return(
        <div>
            <h1>Админ панель</h1>
            <form className={styles.loginAdmin} onSubmit={handleSubmit}>
                <input value={login} type="text" placeholder="Логин" className={styles.input} onChange={(e) => setLogin(e.target.value)}/>
                <input value={password} type="password" placeholder="Пароль" className={styles.input} onChange={(e) => setPassword(e.target.value)}/>
                <button className={styles.submitButton}>Войти</button>
            </form>
        </div>
    )
}

export default LoginAdmin