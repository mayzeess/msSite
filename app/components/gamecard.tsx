import styles from "./style/GamesPage.module.css"
import Button from "./button"
import AdminOnly from "./AdminOnly"
import SortGames from "./SortGames"
import GameView from "./viewGameCard/GameView"

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
            <GameView games={games}/>
        </div>
    )
}

export default GameCard