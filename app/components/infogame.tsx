import Link from "next/link"
import Image from "next/image";
import styles from "./style/GamesPage.module.css"
import DeleteButton from "./deletebutton"
import AdminOnly from "./AdminOnly";

type Game = {
    id: number,
    image: string,
    name: string,
    rating: number,
    description: string
}

type PostGame = {
  game: Game;
}

const InfoGame = ({game}: PostGame) => {
    return(
        <div className={styles.infoPage}>
            <div className={styles.gamecardinfo}>
                <div className={styles.imageContainerinfo}>
                    <Image src={game.image} alt={game.name} fill sizes="2000px" style={{objectFit: "contain", objectPosition: "center"} }/>
                </div>
                <div className={styles.info}>
                    <h2>{game.name}</h2>
                    <p>Рейтинг: {game.rating}/10</p>
                    <p>Комментарий: {game.description}</p>
                    <div className={styles.buttons}>
                        <Link href="/game" className={styles.buttoninfo}>Назад</Link>
                        <AdminOnly>
                            <Link href={`/game/${game.id}/edit`} className={styles.buttoninfo}>Редактировать</Link>
                            <DeleteButton gameId={game.id}/>
                        </AdminOnly>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoGame