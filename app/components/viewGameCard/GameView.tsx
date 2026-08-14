'use client'
import ListGameCard from "./ListGameCard"
import GridGameCard from "./GridGameCard"
import { useView } from "./ViewProvider"
import styles from "../style/GridGameCard.module.css"

type Game = {
    id: number,
    image: string,
    name: string,
    rating: number,
    description: string
}

type Props = {
  games: Game[]
}

const GameView = ({games}: Props) => {    

    const {view} = useView()

    return(
        <div>
            {view === "list" ? (
                games.map(game => (
                    <ListGameCard key={game.id} game={game}/>
                ))
            ) : (
                <div className={styles.gameGrid}>
                    {games.map(game => (
                        <GridGameCard key={game.id} game={game}/>
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default GameView