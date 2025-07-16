import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Auth/Login'
import SignUp from  './Pages/Auth/SignUp'
import Recipes from './Pages/Recipes/Recipes'
import RecipePage from './Pages/Recipes/RecipePage'
import AuthProvider from '../Contexts/AuthContext'

function AnimatedRoutes() {

    const location = useLocation();

    return (
        <AnimatePresence>
            <AuthProvider>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/recipes">
                        <Route index element={<Recipes />} />
                        <Route path=":rid" element={<RecipePage />} />
                    </Route>
                    
                    <Route path="/dashboard" exact element={<Dashboard />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/signup" exact element={<SignUp />} />
                </Routes>
            </AuthProvider>
        </AnimatePresence>
    )
}

export default AnimatedRoutes