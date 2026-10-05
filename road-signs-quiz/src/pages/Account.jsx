import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'


function Account() {
    const {user, handleLogout} = useAuth()

    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            {user.attempts.length === 0 ? <p>No attempts yet</p> : null}
            <Link to="/exam">Start Your Exam</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Account