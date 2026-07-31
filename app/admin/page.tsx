import LogoutButton from "../components/LogoutButton"
import styles from "./styles/admin.module.css"

export default function Admin() {
  return (
    <div>
        <h1>Admin страница</h1>
        <div className={styles.textAdmin}>
          <p>Вы выполнили вход в роли администаротора. <br/>
          Можете добавлять, удалять и рекдактировать игры на сайте.</p>
          <LogoutButton />
        </div>
    </div>
  );
}