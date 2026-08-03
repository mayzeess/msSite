
'use client'
import {useRouter, useSearchParams } from "next/navigation"
import styles from "./style/button.module.css"

const sortOptions = [
    { value: "date_desc", label: "По дате (новые)" },
    { value: "date_asc", label: "По дате (старые)" },
    { value: "rating_desc", label: "По рейтингу ↓" },
    { value: "rating_asc", label: "По рейтингу ↑" },
    { value: "name_asc", label: "По названию А-Я" },
    { value: "name_desc", label: "По названию Я-А" },
];
    

const SortGames = () => {    

    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams)
        params.set("sort", e.target.value)
        router.replace(`?${params.toString()}`)
    }

    return(
        <div>
            <select value={searchParams.get("sort") ?? "date_desc"} onChange={handleChange} className={styles.buttonSortGame}>
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SortGames