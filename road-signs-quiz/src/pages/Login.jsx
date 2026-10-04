import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    // Adding automated login and redirect to accoutn page after successful signup
    const {handleLogin} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) {
            setError('Please fill in both email and password.')
            return
        }
        
        try {
            handleLogin(email, password)
            navigate('/account')
        } catch (err) {
            setError(err.message)
        }
    }
    
    return (
        <div>
            <h1>Login Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                type='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email ...'
                />
                <input 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Password ...'
                />
                <button type='submit'>Login</button>
            </form>
            <Link to="/signup">New to our App? Sign Up</Link>
        </div>
    )
}

export default Login