import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import bannerImg from '../../images/pasta.png'
import openFridge from '../../images/openFridge.svg'

import useRecipes from '../../Hooks/useRecipes'

import trim from '../../Functions/trim.ts'

import '../Styles/Home.css'

function Home() {

    const { recipes, loading, error } = useRecipes(6)

    const [activeSlide, setActiveSlide] = useState(0);

    function scroll() {
        let slide =  document.querySelector(`.item-capsule#slide-${activeSlide}`)
        if (!slide) return
        let y = slide.offsetTop;
        let scrollElem = document.querySelector('.capsules-part')
        if (!scrollElem) return
        scrollElem.scrollTo(0, y)
    }
    
    
    useEffect(() => {
        setTimeout(() => {
            setActiveSlide(prev => prev == 5 ? 0 : prev + 1)
        }, 5000);
        scroll()
    }, [activeSlide])

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
                <div className="carousel" select='false'>
                    <div className="thumbnails-part">
                        {recipes?.map((item, index) => (
                            <div key={index} className={`item-thumbnail${activeSlide == index ? ' active' : ''}`} select="false" onClick={() => setActiveSlide(index)}>
                                <img src={item?.image} alt={item?.title} />
                            </div>
                        ))}
                    </div>
                    <div className="capsules-part">
                        <div className="capsule-scroll">
                            {recipes?.map((item, index) => (
                                <div id={`slide-${index}`} className="item-capsule">
                                    <div className="item-capsule-background">
                                        <img src={item?.image} alt={item?.title} />
                                    </div>
                                    <div className="item-capsule-overlay">
                                        <div className="item-capsule-thumbnail">
                                            <img src={item?.image} alt={item?.title} />
                                        </div>
                                        <Link to={`/recipes/${item?.id}`} className="item-capsule-title">{trim(item?.title, 40)}</Link>
                                        <div className="item-capsule-diets" select="false">
                                            {item?.diets?.map((diet, index) => (
                                                <div key={index} className="item-capsule-diet">{diet}</div>
                                            ))}
                                        </div>
                                    </div>
                                    {activeSlide == index && <div className="progress-bar"><span className="progress"></span></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text" select='false'>
                    Draw inspiration from thousands of delicacies!
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