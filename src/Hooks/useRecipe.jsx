import React, { useState, useEffect } from "react"

function useRecipes(id) {
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    let uri = `http://localhost:8000/recipe?id=${id}`

    const fetchData = async () => {
        setLoading(true)

        try {
            const res = await fetch(uri, {
                headers: {
                    "Authorization": import.meta.env.VITE_API_KEY || ''
                }
            })
            const data = await res.json();
            setRecipe(data || null)
            setLoading(false)
        } catch (err) {
            setError(err)
            setRecipe(null)
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { recipe, loading, error }

}

export default useRecipes