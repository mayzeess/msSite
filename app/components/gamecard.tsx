import styles from "./style/GamesPage.module.css"
import Image from "next/image"
import Link from "next/link"
import Button from "./button"
import AdminOnly from "./AdminOnly"
import SortGames from "./SortGames"

type Game = {
    id: number,
    image: string,
    name: string,
    rating: number,
    description: string
}

type GamePost = {
  games: Game[];
};

const GameCard = ({games}: GamePost) => {    

    return(
        <div>
            <h1>Список игр</h1>
            <div className={styles.toolbar}>
                <AdminOnly>
                    <Button href="/game/create" text="Добавить игру"/>
                </AdminOnly>
                <SortGames />
            </div>
            {games.map(el =>(
                <Link href={'/game/' + el.id} className={styles.gamecard} key={el.id}>
                    <div key={el.id} className={styles.imageContainer}>
                        <Image src={el.image} alt={el.name} fill sizes="1000px" style={{objectFit: "cover", objectPosition: "center"} }/>
                    </div>
                    <div className={styles.info}>
                        <h2>Название: {el.name}</h2>
                        <p>Рейтинг: {el.rating}/10</p>
                        <p>Комментарий: {el.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default GameCard