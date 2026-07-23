import styles from "./style/formAddGame.module.css"

const LoginAdmin = () => {    

    return(
        <div>
            <h1>Админ панель</h1>
            <form className={styles.loginAdmin}>
                <input type="text" placeholder="Логин" className={styles.input}/>
                <input type="password" placeholder="Пароль" className={styles.input}/>
                <button className={styles.submitButton}>Войти</button>
            </form>
        </div>
    )
}

export default LoginAdmin