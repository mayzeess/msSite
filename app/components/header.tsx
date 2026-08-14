'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

type Theme = 'dark' | 'light'

const Header = () => {

    const [theme, setTheme] = useState<Theme>('dark')
    const [isThemeLoaded, setIsThemeLoaded] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme === 'dark' || savedTheme === 'light'){
            setTheme(savedTheme)
        }
        setIsThemeLoaded(true)
    }, [])

    useEffect(() => {
        if (!isThemeLoaded) return

        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme, isThemeLoaded])

    const changeTheme = () => {
        setTheme(currentTheme => 
            currentTheme === 'dark' ? 'light' : 'dark'
        )
    }

    return(
        <header>
            <nav>
                <Link href="/" className="navLink">Home</Link>
                <Link href="/about" className="navLink">About</Link>
                <Link href="/game" className="navLink">Game</Link>
                <Link href="/admin" className="navLink">Admin</Link>
            </nav>
            <button className="buttonTheme" onClick={changeTheme}>
                <div className="themeIcon">
                    <Image src="/background/sunMoon.png" alt="" fill/>
                </div>
                {/* {theme === 'dark' ? '🌑' : '☀️'} */}
            </button>
        </header>
    )
}

export default Header