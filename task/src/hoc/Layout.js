import React from 'react'
import './Layout.scss'

export const Layout = ({children}) => {
    return (
        <main className="layout">
            {children}
        </main>
    )
}
