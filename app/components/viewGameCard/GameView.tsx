'use client'
import ListGameCard from "./ListGameCard"
import GridGameCard from "./GridGameCard"
import { useView } from "./ViewProvider"

type Game = {
    id: number,
    image: string,
    name: string,
    rating: number,
    description: string
}

type Props = {
  games: Game[];
};

const GameView = ({games}: Props) => {    

    const {view} = useView()

    return(
        <div>
            {view === "list" ? (
                games.map(game => (
                    <ListGameCard key={game.id} game={game}/>
                ))
            ) : (
                 games.map(game => (
                    <GridGameCard key={game.id} game={game}/>
                ))
            )
            }
        </div>
    )
}

export default GameView