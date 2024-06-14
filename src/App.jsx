import { useState } from 'react'
import './App.css'

import Nav from './assets/Structures/Nav/Nav'
import AnimatedRoutes from './assets/AnimatedRoutes'

function App() {
    return (
        <>
            <Nav />
            <div id="main">
                <AnimatedRoutes />
            </div>
        </>
    )
}

export default App
