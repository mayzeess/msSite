'use client'
import styles from "./style/formAddGame.module.css"
import { useState } from "react";

const FormAddGame = () => {

    const [rating, setRating] = useState(1)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    
    const [message, setMessage] = useState("")

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!imageFile) {
            alert("Выберите изображение")
            return
        }
        if (!name.trim()) {
            alert("Введите название игры")
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("rating", String(rating))
        formData.append("description", description.trim() ? 
        description.trim() : "Без комментариев")
        formData.append("image", imageFile)

        const response = await fetch("/api/game", {
            method: "POST",
            body: formData,
        })

        const result = await response.json()
        
        if (response.ok) {
            setMessage("Игра успешно добавлена!")
            setName("");
            setDescription("");
            setRating(1);
            setImageFile(null);
            setImagePreview(null); 
        }
        console.log(result)
    }

    return (
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
                <h2>Форма создания игры</h2>

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
                    type="range"
                    className={styles.range}
                    min="1"
                    max="10"
                    step="1"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
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
                    Добавить
                </button>
            </div>
        </form>
    </div>
    )
}



export default FormAddGame