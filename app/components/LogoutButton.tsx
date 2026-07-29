'use client'
import styles from "./style/button.module.css"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
    return(
        <button className={styles.button} onClick={() => signOut()}>Выйти</button>
    )
}

export default LogoutButton