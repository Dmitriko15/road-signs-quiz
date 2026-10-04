import { Link } from 'react-router-dom'
//import Demo from './attempt/Demo'


function Home() {
    return (
        <div>
            <h1>BestDrive with Dmitri</h1>
            <h2>Welcome to the Irish Road Sign Test</h2>
            <p>Our Irish road sign test allows you to practice the road signs you may be asked
            on your driving test. You have 3 minutes to answer 10 questions and must answer
            at least 8 correctly to pass.
            </p>
            <p>
            On your driving test, you are likely to be asked 10 road sign questions before you leave the test centre.
            </p>
            <p>
            If you want to try out a theory test quiz, <Link to="/demo">head here</Link> for XXX demo questions.
            Good Luck!</p>
            <Link to="/about">Go to About</Link>
            <br />
            <Link to="/login">Sign In</Link>
            <br />
            <Link to="/contact">Contact Us</Link>
        </div>
    )
}

export default Home