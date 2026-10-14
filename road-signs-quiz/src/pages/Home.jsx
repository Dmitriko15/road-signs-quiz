import { Link } from 'react-router-dom'

function Home() {
    return (
        <section className='py-8'>
            <h1 className="text-4xl font-bold text-slate-900">BestDrive with Dmitri</h1>
            <h2 className="mt-2 text-xl font-semibold text-blue-600">Welcome to the Irish Road Sign Test</h2>

            <div className="mt-6 space-y-4 text-lg text-slate-700">
                <p>Our Irish road sign test allows you to practice the road signs you may be asked
                on your driving test. You have 3 minutes to answer 10 questions and must answer
                at least 8 correctly to pass.
                </p>
                <p>
                On your driving test, you are likely to be asked 10 road sign questions before you leave the test centre.
                </p>
                <p>
                If you want to try out a theory test quiz, {' '}<Link to="/demo" className="font-semibold text-blue-600 underline hover:text-blue-800">head here</Link>{' '} for 3 demo questions.
                Good Luck!</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/signup" className="rounded bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Sign up to start</Link>
                <Link to="/login" className="rounded border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100">Sign in</Link>
            </div>
        </section>
    )
}

export default Home