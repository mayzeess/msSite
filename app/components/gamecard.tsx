import styles from "./style/GamesPage.module.css"
import Button from "./button"
import AdminOnly from "./AdminOnly"
import SortGames from "./SortGames"
import GameView from "./viewGameCard/GameView"
import ButtonView from "./viewGameCard/ButtonView"
import ViewProvider from "./viewGameCard/ViewProvider"

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
        <ViewProvider>
            <div>
                <h1>Список игр</h1>
                <div className={styles.toolbar}>
                    <AdminOnly>
                        <Button href="/game/create" text="Добавить игру"/>
                    </AdminOnly>
                    <SortGames />
                    <ButtonView />
                </div>
                <GameView games={games}/>
            </div>
        </ViewProvider>
    )
}

export default GameCard