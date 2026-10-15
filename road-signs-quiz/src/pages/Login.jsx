import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

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
        <section className='py-8'>
            <h1 className="text-4xl font-bold text-slate-900">Login Page</h1>
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
                    <button type='submit' className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">Log In</button>
                </form>
                <Link to="/signup" className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">New to our App? Sign Up</Link>
            </div>
        </section>
    )
}

export default Login