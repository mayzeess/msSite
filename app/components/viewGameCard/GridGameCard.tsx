import styles from "../style/CompactGameCard.module.css"
import Image from "next/image"
import Link from "next/link"

type Props = {
    game: {
        id: number;
        name: string;
        rating: number;
        description: string;
        image: string;
    };
};

const GridGameCard = ({game}: Props) => {    

    return(
        <div>
        <Link href={'/game/' + game.id} className={styles.gamecard}>
                    <div key={game.id} className={styles.imageContainer}>
                        <Image src={game.image} alt={game.name} fill sizes="1000px" style={{objectFit: "cover", objectPosition: "center"} }/>
                    </div>
                    <div className={styles.info}>
                        <h2>Название: {game.name}</h2>
                        <p>Рейтинг: {game.rating}/10</p>
                        <p>Комментарий: {game.description}</p>
                    </div>
                </Link>
        </div>
    )
}

export default GridGameCard