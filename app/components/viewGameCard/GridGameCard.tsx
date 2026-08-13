import styles from "../style/GridGameCard.module.css"
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
                <div className={styles.imageContainer}>
                    <Image src={game.image} alt={game.name} fill sizes="1000px" style={{objectFit: "cover", objectPosition: "center"} }/>
                </div>
            </Link>
        </div>
    )
}

export default GridGameCard