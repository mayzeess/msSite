'use client'
import { useView } from "./ViewProvider"
import styleButton from "../style/button.module.css"
import { useState, useEffect } from "react"

type View = 'grid' | 'list'

const ButtonView = () => {

    const {view, setView} = useView()

    return(
        <div>
            <button onClick={() => setView(view === "list" ? "grid" : "list")} className={styleButton.button}>
                {view === "list" ? "Grid" : "List"}
            </button>
        </div>
    )
}

export default ButtonView