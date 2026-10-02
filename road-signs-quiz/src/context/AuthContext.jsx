/* This file is designed to manage authentication across whole app
Setup:
AuthContext - the Context object itself, holds user/handleLogin/handleLogout/setUser
AuthProvider - wraps the app, provides auth state to every nested component
useAuth() - shorthand hook so components don't need useContext(AuthContext) directly
*/

import { createContext, useState, useContext  } from "react";
import { login as loginUser, logout as logoutUser, getCurrentUser } from "../data/userStore";

/* ----------------------- CONTEXT DEFINITION ----------------------- */

const AuthContext = createContext(null)

/* ----------------------- AUTH PROVIDER ----------------------- */

export function AuthProvider({ children }) {
    // This functions initializes state by checking localStorage immediately —
    // so a page refresh doesn't lose the logged-in session
    // The whole job is to wrap the entire app in a Context Provider, without caring what that app actually contains.

    const [ user, setUser ] = useState(() => getCurrentUser())

    const handleLogin = ( email, password ) => {
        // LoginUser() throws if credentials are invalid — that error is NOT caught here,
        // it propagates up to whichever page calls handleLogin, so that page
        // decides how to display the error to the user

        const loggedUser = loginUser( email, password )
        setUser(loggedUser)
    }

    const handleLogout = () => {
        logoutUser()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout ,setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

/* ----------------------- USE AUTH HOOK ----------------------- */

// extra function (HOOK) wrapping useContext — so every component just
// calls useAuth() instead of importing AuthContext + useContext everywhere
export function useAuth() {
    return useContext(AuthContext)
}