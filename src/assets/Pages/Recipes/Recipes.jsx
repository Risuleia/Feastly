import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import Searchbar from '../../Structures/Searchbar/Searchbar'
import RecipeItem from '../../Structures/Recipe Item/RecipeItem'

import useRecipes from '../../../Hooks/useRecipes'

import dishes from '../../../images/dishes.png'

import '../../Styles/Recipes.css'

function Recipes() {

    const { recipes, loading, error } = useRecipes(10);

    return (
        <motion.div
            id='recipes'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="recipes-banner" select="false">
                <div className="banner-part">
                    <div className="banner-image">
                        <img src={dishes}  />
                    </div>
                </div>
                <div className="banner-text">
                    <span>Explore from a <span className='underlined' maskable="true">huge</span> variety of <span className="underlined">delicacies</span>!</span>
                    <button
                        onClick={(e) => {
                            document.querySelector('.recipe-items').scrollIntoView();
                            e.target.blur()
                        }}
                        className="material-symbols-rounded move-down-icon"
                    >
                        double_arrow
                    </button>
                </div>
            </div>
            <Searchbar />
            <div className="@container">
                <div className="recipe-items">
                    {recipes.map(item => (
                        <RecipeItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Recipes