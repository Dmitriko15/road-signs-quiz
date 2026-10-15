function About() {
    return (
        <section className='py-8'>
            <h1 className="text-4xl font-bold text-slate-900">About</h1>
            <div className="mt-6 space-y-4 text-lg text-slate-700">
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
                Built with React, React Router, styled with Tailwind CSS and browser localStorage for account
                and quiz data — no backend server required.
                </p>
            </div>
        </section>
    )
}

export default About