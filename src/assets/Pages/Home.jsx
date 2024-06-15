import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import bannerImg from '../../images/pasta.png'
import openFridge from '../../images/openFridge.svg'

import '../Styles/Home.css'

function Home() {

    return (
        <motion.div
            id='home'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="home-banner" select="false">
                <div className="banner-part">
                    <div className="banner-image">
                        <img src={bannerImg}  />
                    </div>
                </div>
                <div className="banner-text">
                    <span>The <span className='underlined' maskable="true">largest</span> catalogue for <Link to='/recipes'>recipes</Link>!</span>
                </div>
            </div>
            <div className="best-picks-section">
                <div className="thumbnails-part">
                    {[1,2,3,4,5,6].map(item => (
                        <div className="item-thumbnail">
                            {item.toString()}
                        </div>
                    ))}
                </div>
                <div className="capsules-part">
                    <div className="capsule-scroll">
                        {[1,2,3,4,5,6].map(item => (
                            <div className="item-capsule">
                                {item.toString()}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="what-can-you-make-section" select="false">
                <div className="section-text">
                    <div className="section-main-text">Got your ingredients? Something <span className="underlined">special</span>?</div>
                    <div className="section-sub-text">We got you covered on that!</div>
                    <div className='section-main-link'>
                        Let's see
                        <Link to='what-can-i-make'>
                            what you can make
                            <span className="pulse"></span>
                            <span className="material-symbols-rounded click-icon">swipe_down</span>
                        </Link>
                    </div>
                    <p className="section-tertiary-text"><span>Time to turn those ingredients into something delicious !</span></p>
                </div>
                <div className="section-image">
                    <img src={openFridge} alt="fridge" />
                </div>
            </div>
        </motion.div>
    )
}

export default Home