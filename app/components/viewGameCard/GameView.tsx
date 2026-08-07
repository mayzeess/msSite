'use client'
import { useState } from "react"
import ListGameCard from "./ListGameCard"
import GridGameCard from "./GridGameCard"
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

    const [view, setView] = useState<"list" | "grid">("list")

    return(
        <div>
            <button onClick={() => setView(view === "list" ? "grid" : "list")}>
                {view === "list" ? "Grid" : "List"}
            </button>
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