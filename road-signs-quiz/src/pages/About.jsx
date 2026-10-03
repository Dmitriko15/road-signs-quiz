import { Link } from 'react-router-dom'

function About() {
    return (
        <div>
            <h1>About</h1>
            <p>
            This app is an Irish road sign quiz, built by Dmitri as part of the
            SOFT7031_27486 Client-Side Web Development module, Project 1 assignment.
            </p>
            <p>
            Users can sign up, sign in, and take a timed 10-question quiz testing
            knowledge of Irish road signs. Results are saved to your account, so you
            can track previous attempts and retry the quiz until you pass.
            </p>
            <p>
            Built with React, React Router, and browser localStorage for account
            and quiz data — no backend server required.
            </p>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default About