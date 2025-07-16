import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import PlateFallback from '../../../images/Plate Fallback.svg'

import useRecipe from '../../../Hooks/useRecipe'

import '../../Styles/RecipePage.css'
import { PieChart } from '@mui/x-charts'

function RecipePage() {

    const { rid } = useParams();
    
    const { recipe, loading, error } = useRecipe(rid);

    // let diets = recipe?.diets;
    // if (!recipe?.vegetarian && !recipe?.vegan && !recipe?.gluten_free && recipe?.diets?.length == 0) diets.push("non-vegetarian")
    
    let cuisines = recipe?.cuisines;
    if (recipe?.cuisines?.length == 0) cuisines.push("Any")

    function decideHue(property) {
        if (property.name == "Nutrition Score") {
            if (property.amount <= 30) return 0
            else if (property.amount > 30 && property.amount <= 45) return 37
            else return 116
        } else if (property.name == "Glycemic Index") {
            if (property.amount >= 70) return 0
            else if (property.amount >= 55 && property.amount < 70) return 37
            else return 116
        } else if (property.name == "Glycemic Load") {
            if (property.amount >= 20) return 0
            else if (property.amount < 20 && property.amount >= 11) return 37
            else return 116
        } else if (property.name == "Inflammation Score") {
            if (property.amount >= 0) return 0
            else if (property.amount < 0  && property.value <= -5) return 37
            else return 116
        } else return 0
    }

    function decideValue(value) {
        if (value <= 33.3) return 0
        else if (value > 33.3 && value <= 66.6) return 37
        else return 116
    }

    return (
        <motion.div
            id='recipe-page'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="recipe-page-banner" select="false">
                <div className="banner-part">
                    <div className="banner-image">
                        <img
                            src={recipe?.image}
                            alt={recipe?.title}
                            select="false"
                            onError={(e) => {
                                e.target.src = PlateFallback;
                                e.target.onerror = null;
                            }}
                        />
                    </div>
                </div>
                <div className="banner-info" select="false">
                    <div className="recipe-main">
                        <div className="recipe-diets">
                            {recipe?.diets?.map((diet, index) => (
                                <div key={index} className="recipe-diet">{diet}</div>
                            ))}
                        </div>
                        <div className="recipe-header">
                            <div className="recipe-title">{recipe?.title}</div>
                            <div className="recipe-details-capsules">
                                {!loading && ([recipe?.ready_in_minutes, recipe?.servings].map((detail, index) => (
                                    <div key={index} className="recipe-details-capsule">
                                        <div className="recipe-details-capsule-icon">
                                            <span className="material-symbols-rounded">{["timer", "diversity_3"][index]}</span>
                                        </div>
                                        <div className="recipe-details-capsule-value">{detail}</div>
                                    </div>
                                )))}
                            </div>
                        </div>
                        <div className="recipe-meal-types">
                            {recipe?.dish_types?.map((mealType, index) => (
                                <div key={index} className="recipe-meal-type">{mealType}</div>
                            ))}
                        </div>
                        <div className="recipe-cuisines">
                            {cuisines?.map((cuisine, index) => (
                                <div key={index} className="recipe-cuisine">
                                    <div className="hashtag">
                                        <span className="material-symbols-rounded">tag</span>
                                    </div>
                                    <div className="recipe-cuisine-text">{cuisine}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        document.querySelector('.recipe-capsules').scrollIntoView();
                        e.target.blur()
                    }}
                    className="material-symbols-rounded move-down-icon"
                >
                    double_arrow
                </button>
            </div>
            <div className="@container">
                <div className="recipe-capsules">
                    <div className="recipe-summary capsule" select="false">
                        {recipe?.summary?.replace(/<.*?>/g, '')}
                    </div>
                    <div className="recipe-ingredients capsule">
                        <div className="capsule-heading" select="false">Ingredients</div>
                        <div className="capsule-content">
                            {recipe?.ingredients?.map((ingredient, index) => (
                                <div key={index} className="recipe-ingredient" select="false">
                                    <div className="recipe-ingredient-amount">{ingredient?.amount}</div>
                                    {ingredient?.unit && <div className="recipe-ingredient-unit">{ingredient?.unit}</div>}
                                    <div className="recipe-ingredient-name">{ingredient?.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="recipe-instructions capsule">
                        <div className="capsule-heading" select="false">Instructions</div>
                        <div className="capsule-content">
                            {recipe?.instructions?.map((instruction, index) => (
                                <div key={index} className="recipe-instruction">
                                    <div className="recipe-instruction-number" select="false">{instruction?.number}</div>
                                    <div className="recipe-instruction-step">{instruction?.step}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="capsule-row">
                        <div className="recipe-nutrients capsule">
                            <div className="capsule-heading" select="false">Nutritional Analysis</div>
                            <div className="capsule-content">
                                {recipe?.nutrition?.nutrients?.map((nutrient, index) => (
                                    <div key={index} className="recipe-nutrient" select="false">
                                        <div className="recipe-nutrient-name">{nutrient?.name}</div>
                                        <div className="recipe-nutrient-value-container" style={{ "--nutrition-accent": decideValue(nutrient?.percentOfDailyNeeds?.toFixed(1)) }}>
                                            <div className="recipe-nutrient-value">{nutrient?.amount}</div>
                                            <div className="recipe-nutrient-unit">{nutrient?.unit}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="recipe-properties capsule">
                            <div className="capsule-heading" select="false">Properties</div>
                            <div className="capsule-content">
                                {recipe?.nutrition?.properties?.map((property, index) => (
                                    <div key={index} className="recipe-property" select="false">
                                        <div className="recipe-property-name">{property?.name}:</div>
                                        <div
                                            className="recipe-property-value"
                                            style={{ "--labelled-accent": decideHue(property) }}
                                        >
                                            {property?.amount.toFixed(1)}{property?.name == 'Nutrition Score' ? '%' : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default RecipePage