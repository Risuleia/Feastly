import React from 'react'
import { motion } from 'framer-motion'

import '../Styles/Home.css'

function Home() {
    return (
        <motion.div
            id='home'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="home-banner-container">

            </div>
        </motion.div>
    )
}

export default Home