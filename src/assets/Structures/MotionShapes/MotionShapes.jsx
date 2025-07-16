import React, { useEffect } from 'react'

import './MotionShapes.styles.css'

function MotionShapes() {

    useEffect(() => {
        const particles = document.querySelectorAll('#motion-shapes i')
        const parent = document.getElementById('motion-shapes')
        const colorArr = ['#a0c0e6', '#35edc9', '#edd835', '#e4acac']
        setInterval(() => {
            particles.forEach(particle => {
                particle.setAttribute('style', `--ty: ${Math.random() > .5 ? '-' : ''}${Math.random() * (parent.clientHeight / 1.5)}px; --tx: ${Math.random() > .5 ? '-' : ''}${Math.random() * (parent.clientWidth / 1.5)}px; --rx: ${Math.random() * 360}deg; --rz: ${Math.random() * 360}deg; --shape-accent: ${colorArr[Math.floor(Math.random() * 4)]}`)
            });
        }, 10000);  
    }, [])

    return (
        <div id="motion-shapes">
            <i></i><i></i><i></i><i></i><i></i>
        </div>
    )
}

export default MotionShapes