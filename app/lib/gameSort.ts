import { Prisma } from "@/app/generated/prisma/client";

export function getOrderBy(
    sort: string
): Prisma.GameOrderByWithRelationInput {
    switch (sort) {
        case "rating_desc":
            return { rating: "desc" }
        case "rating_asc":
            return { rating: "asc" }
        case "name_asc":
            return { name: "asc" }
        case "name_desc":
            return { name: "desc" }
        case "date_asc":
            return { createdAt: "asc" }
        default:
            return { createdAt: "desc" }
    }
}