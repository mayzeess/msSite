'use client'
import styles from "./style/formAddGame.module.css"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Game = {
    id: number,
    image: string,
    name: string,
    rating: number,
    description: string
}

type PostGame = {
  game: Game;
}

const EditGame = ({game}: PostGame) => {

    const [rating, setRating] = useState(game.rating)
    const [imagePreview, setImagePreview] = useState<string | null>(game.image)
    
    const [message, setMessage] = useState("")
    
    const [name, setName] = useState(game.name)
    const [description, setDescription] = useState(game.description)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const router = useRouter()

    
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("rating", String(rating))
        formData.append("description", description)
        if (imageFile) {
            formData.append("image", imageFile)
        }

        const response = await fetch(`/api/game/${game.id}`, {    
            method: "PUT",
            body: formData
        })

        if (response.ok) {
            setMessage("Изменения сохранены")
            router.push(`/game/${game.id}`)
        }
    }

    return(
        <div className={styles.infoPage}>
            <form className={styles.gameForm} onSubmit={handleSubmit}>
                <div className={styles.imageContainerForm}>
                    <input
                    className={styles.fileInput}
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    />
                    {imagePreview ? ( 
                        <img
                        src={imagePreview}
                        className={styles.preview}
                        />
                    ) : (
                        <div className={styles.emptyPreview}>
                            Изображение
                        </div>
                    )}
                </div>
                
                <div className={styles.formInfo}>
                    <h2>Редактирование игры</h2>
                    {message && (
                        <p className={styles.success}>{message}</p>
                    )}
                    <input
                    required
                    className={styles.input}
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <label>
                    Оценка: {rating}/10
                    </label>
                    <input
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    type="range" 
                    className={styles.range} placeholder="Оценка"
                    min="1"
                    max="10"
                    step="1"
                    />
                    <textarea 
                    className={styles.textarea} 
                    placeholder="Комментарий"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    <button 
                    type="submit" 
                    className={styles.submitButton}
                    >
                        Применить
                    </button>
                </div>
            </form>
        </div>
    )
}



export default EditGame