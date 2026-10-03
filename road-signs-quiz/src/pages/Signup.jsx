import { useState } from 'react'
import { signup } from '../data/userStore'


function isValidPassword(){
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) return
        if (!isValidPassword(password)) {
            setError('Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.')
            return 
        }
        try {
            const newUser = signup(email, password)
        } catch (err) {
            setError(err.message)
        }
    }

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
    
    return (
        <div>
            <h1>Sign Up now</h1>
            <form onSubmit={handleSubmit}>
                <input 
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
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup