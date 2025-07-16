import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAuth } from '../../../Contexts/AuthContext';

import '../../Styles/Auth.css'

function SignUp() {

    const navigate = useNavigate()

    const { signup, error, setError } = useAuth()

    const [passVisible, setPassVisible] = useState(false)
    const [filled, setFilled] = useState({ email: false, password: false })
    const [loading, setLoading] = useState(false)

    const btn = useRef()
    const email = useRef()
    const password = useRef()

    useEffect(() => {
        document.querySelector('.auth-form-container').setAttribute('style', "--angle-x: 0.0deg; --angle-y: 0.0deg");
    }, [])
    
    useEffect(() => {
        if (filled.email && filled.password && !loading) btn.current.disabled = false
        else btn.current.disabled = true
    }, [filled])

    function handleChange(e) {
        if (e.target.checked) setPassVisible(true)
        else setPassVisible(false)
    }
    function handleEmailChange(e) {
        if (!e.target.value || e.target.value == '') setFilled(prev => ({ ...prev, email: false }))
        else setFilled(prev => ({ ...prev, email: true }))
    }
    function handlePasswordChange(e) {
        if (!e.target.value || e.target.value == '') setFilled(prev => ({ ...prev, password: false }))
        else setFilled(prev => ({ ...prev, password: true }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(false)
            setError('')
            signup(email.current.value, password.current.value)
        } catch (err) {
            return setError('An error occurred')
        } finally {
            navigate('/', { replace: true })
        }

        setLoading(false)
    }

    const eye = (bool) => {
        return bool ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="eye eye-visisble" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="eye eye-crossed" viewBox="0 0 16 16">
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
            </svg>
        )
    }

    function morph(e) {
        const shadow = e.currentTarget.querySelector('.mouse-shadow')
        
        let rect = e.currentTarget.getBoundingClientRect()
        let mouseX = e.clientX - rect.left
        let mouseY = e.clientY - rect.top
        let h = rect.height
        let w = rect.width

        let px = Math.abs(Math.floor(100 / w * mouseX) - 100)
        let py = Math.abs(Math.floor(100 / h * mouseY) - 100)

        let lp = 50 + (px - 50) / 1.5
        let tp = 50 + (py - 50) / 1.5
        let tx = ((lp - 50) / 1.5) * .8
        let ty = ((tp - 50) / 2) * -1

        shadow.setAttribute('style', `--mouse-x: ${mouseX}px; --mouse-y: ${mouseY}px`)
        e.currentTarget.setAttribute('style', `--angle-x: ${ty}deg; --angle-y: ${tx}deg`)
    }

    return (
        <motion.div
            id='auth'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="auth-banner" select="false">
                <div className="banner-part">
                </div>
                <div className="auth-part">
                    <div className="auth-form-container" onMouseMove={morph}>
                        <div className="auth-parallax">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                        <div className="auth-container">
                            <div className="auth-heading-container" select="false">
                                <h2 className="auth-heading heading">Sign Up</h2>
                                <span className="auth-heading-line"></span>
                            </div>
                            {error && <div id="error" select="false">{error}</div>}
                            <form className='auth-form' onSubmit={handleSubmit}>
                                <div className="label-container email-container">
                                    <span className="label" select="false">Email</span>
                                    <div className="input-container">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder='Enter your email'
                                            required
                                            className='input'
                                            onChange={handleEmailChange}
                                            ref={email}
                                        />
                                    </div>
                                </div>
                                <div className="label-container password-container">
                                    <span className="label" select="false">Password</span>
                                    <div className="input-container">
                                        <input
                                            type={!passVisible ? 'password' : 'text'}
                                            name="password"
                                            id="password"
                                            placeholder='Enter your password'
                                            required
                                            className='input'
                                            onChange={handlePasswordChange}
                                            ref={password}
                                        />
                                        <div className="password-toggle-container">
                                            <input
                                                type="checkbox"
                                                name="password-toggle"
                                                id="password-toggle"
                                                onChange={handleChange}
                                                value={passVisible}
                                            />
                                            {eye(passVisible)}
                                        </div>
                                    </div>
                                </div>
                                <div className="auth-btn-redirect-container">
                                    <div className="auth-redirect-container">
                                        <div className="redirect-text">Got an account already?</div>
                                        <Link to='/login' className='redirect-link'>Login</Link>
                                    </div>
                                    <div className="auth-btn-container" select="false">
                                        <button className="auth-btn" type='submit' ref={btn}>
                                            <span>Sign Up</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="reflection">
                            <div className="mouse-shadow"></div>
                        </div>
                    </div>
                </div>
            </div>
            
        </motion.div>
    )
}

export default SignUp