import './App.css'
import { signup, login, logout, getCurrentUser, saveAttempt } from './data/userStore'


function App() {
  // WHY: this runs once when App first renders — enough to manually trigger our test calls
  //      TEMPORARY — delete this entire block once testing is done
  const runTest = () => {
    console.log('--- Starting test ---')

    try {
      const newUser = signup('dmitri@test.com', 'test1234')
      console.log('Signed up:', newUser)
    } catch (err) {
      console.log('Signup error (expected if you re-run this):', err.message)
    }

    console.log('Current user before login:', getCurrentUser())

    const loggedInUser = login('dmitri@test.com', 'test1234')
    console.log('Logged in:', loggedInUser)

    console.log('Current user after login:', getCurrentUser())

    saveAttempt(loggedInUser.id, {
      date: new Date().toISOString(),
      score: 8,
      total: 10,
      passed: true,
      answers: []
    })

    console.log('Current user after saving attempt:', getCurrentUser())
  }

  return (
    <div>
      <h1>Test Page</h1>
      {/* TEMPORARY — just a button to trigger the test on demand */}
      <button onClick={runTest}>Run Test</button>
    </div>
  )
}

export default App
