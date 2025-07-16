import React from 'react'
import { Link } from 'react-router-dom';

import PlateFallback from '../../../images/Plate Fallback.svg'

import './RecipeItem.styles.css';

function RecipeItem({ item }) {

    // let diets = item.diets
    // if (!item.vegetarian && !item.vegan && !item.gluten_free && diets.length == 0) diets.push("non-vegetarian")

    function decideHue(value) {
        if (value <= 30.0) return 0.0
        else if (value > 30.0 && value <= 45.0) return 37.0
        else return 116
    }

    return (
        <div className='recipe-item'>
            <Link className="recipe-img" to={`/recipes/${item.id}`}>
                <img
                    src={item.image}
                    alt={item.title}
                    select="false"
                    onError={(e) => {
                        e.target.src = PlateFallback;
                        e.target.onerror = null;
                        e.target.setAttribute('style', 'width: 60% !important; height: 60% !important; opacity: .55');
                        e.target.parentElement.setAttribute('style', 'padding: 2rem !important');
                    }}
                />
            </Link>
            <div className="recipe-details">
                <div className="recipe-details-heading">
                    <Link className="recipe-details-title" to={`/recipes/${item.id}`}>{item.title}</Link>
                    <button className="recipe-fav-btn" select="false">
                        <span className="material-symbols-rounded">favorite</span>
                    </button>
                </div>
                <div className="recipe-details-info">
                    <div className="recipe-details-labelled" select="false">
                        {[item.nutrition.properties[3], item.nutrition.properties[0]].map((item) => (
                            <div className="recipe-details-labelled-container">
                                <div className="recipe-details-labelled-text">{item.name}:</div>
                                <div
                                    className="recipe-details-labelled-value"
                                    style={{ "--labelled-accent": item.name == 'Nutrition Score' ? decideHue(item.amount.toFixed(1)) : decideHue(100 - item.amount.toFixed(1)) }}
                                >
                                    {item.amount.toFixed(1)}{item.name == 'Nutrition Score' ? '%' : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="recipe-details-capsules" select="false">
                        {[item.ready_in_minutes, item.servings].map((detail, index) => (
                            <div key={index} className="recipe-details-capsule">
                                <div className="recipe-details-capsule-icon">
                                    <span className="material-symbols-rounded">{["timer", "diversity_3"][index]}</span>
                                </div>
                                <div className="recipe-details-capsule-value">{detail}</div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="recipe-details-tags">
                        {
                            item.tags.map((tag) => (
                                <div key={uuidv4()} className="store-item-tag" select="false">
                                    <span className="hash material-symbols-rounded">tag</span>
                                    <span className="tag-text">{tag}</span>
                                </div>
                            ))
                        }
                    </div> */}
                </div>
            </div>
            <div className="recipe-labels" select="false">
                {item.diets.map((diet, index) => (
                    <div key={index} className="recipe-label">{diet.charAt(0).toUpperCase() + diet.slice(1)}</div>
                ))}
            </div>
        </div>
    )
}

export default RecipeItem