import { useState } from 'react'
import { signup } from '../data/userStore'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function isValidPassword(password){
    if (password.length < 8) return false

    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    return hasUpperCase && hasLowerCase && hasNumber
}

function Signup() {
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

        if (!isValidPassword(password)) {
            setError('Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.')
            return 
        }

        try {
            signup(email, password)
            handleLogin(email, password)
            navigate('/account')
        } catch (err) {
            setError(err.message)
        }
    }
    
    return (
        <section className='py-8'>
            <h1 className="text-4xl font-bold text-slate-900">Sign Up now</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="mt-6 space-y-4 text-lg text-slate-700">
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
                    <button type='submit' className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">Sign Up</button>
                </form>
                <Link to="/login" className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">Already have an account? Log in</Link>
            </div>
        </section>
    )
}

export default Signup