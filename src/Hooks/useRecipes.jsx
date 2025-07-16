import React, { useState, useEffect } from "react"

// export interface Recipe {
//     id: string,
//     title: string,
//     summary: string,
//     image: string,
//     vegetarian: Boolean,
//     vegan: Boolean,
//     gluten_free: Boolean,
//     dairy_free: Boolean,
//     ready_in_minutes: number,
//     servings: number,
//     ingredients: Ingredient[],
//     nutrition: {
//         nutrients: Nutrient[],
//         properties: Property[]
//     },
//     cuisines: string[],
//     dish_types: string[],
//     diets: string[],
//     instructions: Step[]
// }

// interface Ingredient {
//     name: string,
//     amount: Number,
//     unit: string
// }
// interface Nutrient {
//     name: string,
//     amount: Number,
//     unit: string
// }
// interface Property {
//     name: string,
//     amount: Number,
// }
// interface Step {
//     number: Number,
//     step: string
// }

// interface UseRecipesResult {
//     recipes: Recipe[],
//     loading: Boolean,
//     error: string
// }

function useRecipes(limit = null, page = null) {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    let uri;
    if (limit) uri = `http://localhost:8000/recipes?limit=${limit}`
    else uri =  `http://localhost:8000/recipes?page=${page}`

    const fetchData = async () => {
        setLoading(true)

        try {
            const res = await fetch(uri, {
                headers: {
                    "Authorization": import.meta.env.VITE_API_KEY || ''
                }
            })
            const data = await res.json();
            setRecipes(data || [])
            setLoading(false)
        } catch (err) {
            setError(err)
            setRecipes([])
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { recipes, loading, error }

}

export default useRecipes