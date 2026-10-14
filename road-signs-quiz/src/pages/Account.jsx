import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'


function Account() {
    const {user, handleLogout} = useAuth()

    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            {user.attempts.length === 0 ? ( <p>No attempts yet</p> 
            ) : (
                <ul>
                    {user.attempts.map(attempt => (
                        <li key={attempt.date}>
                            {new Date(attempt.date).toLocaleString()} — {attempt.score}/{attempt.total} — {attempt.passed ? 'Pass' : 'Fail'}
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/exam">Start Your Exam</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Account