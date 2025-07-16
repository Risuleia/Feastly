import React, { createContext, useContext, useEffect, useState } from "react"
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase"

interface AuthContextProps {
    currentUser: Auth['currentUser'],
    login: (email: string, password: string) => Promise<void>,
    signup: (email: string, password: string) => Promise<void>,
    forgotPassword: (email: string) => Promise<void>,
    error: string,
    setError: React.Dispatch<React.SetStateAction<string>>
}

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextProps | null>(null)

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<Auth['currentUser'] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    async function login(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            return setError('Failed to sign in')
        }
    }

    async function signup(email: string, password: string) {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            return setError('Failed to sign up')
        }
    }

    async function forgotPassword(email: string) {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (err) {
            return setError('Failed to send email')
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(null)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = { currentUser, login, signup, forgotPassword, error, setError }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}