'use client'

import { createContext, useContext, useState } from "react"

type View = "list" | "grid"

type ViewContextType = {
    view: View
    setView: (view: View) => void
}

const ViewContext = createContext<ViewContextType | null>(null)

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [view, setView] = useState<View>("list")

    return (
        <ViewContext.Provider value={{ view, setView }}>
            {children}
        </ViewContext.Provider>
    )
}

export const useView = () => {
    const context = useContext(ViewContext)

    if (!context) {
        throw new Error("error")
    }

    return context
}

export default ViewProvider