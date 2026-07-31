import GameCard from "../components/gamecard";
import { Geist, Geist_Mono, Oswald } from "next/font/google"
import { prisma } from "@/app/lib/prisma"
import { getOrderBy } from "../lib/gameSort";

const geistOswald = Oswald({
  subsets: ["latin"],
});

type Props = {
    searchParams: Promise<{
        sort?: string;
    }>
}

export default async function Game({searchParams} : Props) {  

  const params = await searchParams
  const sort = params.sort ?? "date_desc"
  const orderBy = getOrderBy(sort)

  const games = await prisma.game.findMany({orderBy,})

  return (
    <div>
        <GameCard games={games}/>
    </div>
  );
}