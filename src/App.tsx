import React from 'react'

import Nav from './assets/Structures/Nav/Nav'
import AnimatedRoutes from './assets/AnimatedRoutes'
import MotionShapes from './assets/Structures/MotionShapes/MotionShapes'
import AddModal from './assets/Structures/Add Modal/AddModal'

import './App.css'

function App() {

    setInterval(() => {
        if (document.hasFocus()) document.body.setAttribute('data-animations', 'true')
        else document.body.setAttribute('data-animations', 'false')
    }, 2000);

    return (
        <>
            <Nav />
            <div id="parallax">
                <MotionShapes />
            </div>
            <div id="main">
                <AnimatedRoutes />
            </div>
            <AddModal />
        </>
    )
}

export default App
