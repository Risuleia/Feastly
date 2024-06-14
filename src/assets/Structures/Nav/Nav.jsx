import React from 'react'
import { NavLink } from 'react-router-dom'

import navigation from "../../../Functions/Navigation.ts";
import navigationonroutechange from "../../../Functions/NavigationOnRouteChange.ts";

import logo from '../../logoFull.svg'

import './Nav.css'

function Nav() {

    return (
        <div id="nav" select="false">
            <NavLink className="logo" to="/" onClick={ () => { navigationonroutechange() } }>
                <img src={logo} alt="Feastly" />
            </NavLink>
            <nav className="navbar">
                <button className="nav-item add-button">
                    <span className="material-symbols-rounded add-icon">add</span>
                    <span className="add-btn-text">Add</span>
                    <span className="pulse"></span>
                </button>
                <div className="nav-item">
                    <NavLink className="nav-link" to='recipes' relative="path" onClick={ () => { navigationonroutechange() } }>Recipes</NavLink>
                    <span className="slide"></span>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to='signup' relative="path" onClick={ () => { navigationonroutechange() } }>Sign Up</NavLink>
                    <span className="slide"></span>
                </div>
            </nav>
            <button className="nav-btn material-symbols-rounded" name="nav" onClick={ () => { navigation() } }>
                <span className="line line-1"></span>
                <span className="line line-2"></span>
                <span className="line line-3"></span>
            </button>
        </div>
    )
}

export default Nav