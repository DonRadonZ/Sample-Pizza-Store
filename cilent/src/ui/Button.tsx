import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ children, disabled, to, type }) {
    const base = "inline-block text-sm bg-yellow-400 uppercase tracking-wide font-semibold text-stone-800 rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
    const styles = {
        primary: base + 'px-4 py-3 sm:px-6 sm:py-4',
        small: base + 'px-4 py-2 md:px-5 md:py-2.5 text-xs',
        secondary: "inline-block text-sm bg-transparent border-2 border-stone-300 uppercase tracking-wide font-semibold text-stone-800 rounded-full hover:bg-stone-300 transition-colors text-stone-400 duration-300 focus:outline-none focus:ring focus:ring-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:ring-offset-2 focus:text-stone-800 disabled:cursor-not-allowed px-4 py-2.5 sm:px-6 sm:py-3.5"
    }
    
    if (to)
        return <Link to={to} className={styles[type]}>{children}</Link> 

    return (
        <button
            disabled={disabled}
        className= {styles[type]}
        >
            {children}
        </button>
    )
}
