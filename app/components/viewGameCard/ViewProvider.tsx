'use client'

import { createContext, useContext, useState, useEffect } from "react"

type View = "list" | "grid"


type ViewContextType = {
    view: View
    setView: (view: View) => void
}

const ViewContext = createContext<ViewContextType | null>(null)

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [view, setView] = useState<View>("grid")
    const [isViewLoaded, setIsViewLoaded] = useState(false)
    
    useEffect(() => {
        const savedView = localStorage.getItem('view') as View | null
        if (savedView === 'grid' || savedView === 'list'){
            setView(savedView)
        }
        setIsViewLoaded(true)
    }, [])

    useEffect(() => {
        if (!isViewLoaded) return

        document.documentElement.setAttribute('data-view', view)
        localStorage.setItem('view', view)
    }, [view, isViewLoaded])

    if (!isViewLoaded){
        return null
    }
    
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