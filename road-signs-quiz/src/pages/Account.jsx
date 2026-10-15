import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'


function Account() {
    const {user} = useAuth()

    return (
        <section className='py-8'>
            <h1 className="text-4xl font-bold text-slate-900">Welcome, {user.email}</h1>
            {user.attempts.length === 0 ? (
            <p className="mt-6 text-slate-600">No attempts yet</p>
            ) : (
            <ul className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                {user.attempts.map(attempt => (
                <li key={attempt.date} className="flex flex-wrap justify-between gap-2 px-4 py-3">
                    <span>{new Date(attempt.date).toLocaleString()}</span>
                    <span>{attempt.score}/{attempt.total} —{' '}
                        <span className={attempt.passed ? 'font-semibold text-green-700' : 'font-semibold text-red-700'}>
                            {attempt.passed ? 'Pass' : 'Fail'}
                        </span>
                    </span>
                </li>
                ))}
            </ul>
            )}
            <Link to="/exam" className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Start Your Exam</Link>
        </section>
    )
}

export default Account