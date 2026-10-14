import { useState } from 'react'
import { Link } from 'react-router-dom'
import useQuiz from '../hooks/useQuiz'

const QUESTION_COUNT = 3
const TIME_LIMIT_SECONDS = 60


function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function DemoRun({ onRetry }) {
  const {
    currentQuestion, currentIndex, total, isLastQuestion,
    selectedIndex, answers, score, isFinished, timeLeft, selectAnswer, next
  } = useQuiz(QUESTION_COUNT, TIME_LIMIT_SECONDS)

  if (isFinished) {
    return (
      <div>
        <h1>Demo Score: {score} / {total}</h1>
        <p>This is a practice run. Your result is not recorded.</p>
        <ul>
          {answers.map((answer, i) => (
            <li key={answer.questionId}>
              Question {i + 1}: {answer.correct ? '✓ Correct' : '✗ Wrong'}
            </li>
          ))}
        </ul>

        <button onClick={onRetry}>Try the demo again</button>

        <p>Ready for the real exam?</p>
        <Link to="/signup" replace>Sign up</Link>
        {' '}or{' '}
        <Link to="/login" replace>Log in</Link>
      </div>
    )
  }

  return (
    <div>
      <p>Time Left: {formatTime(timeLeft)}</p>
      <p>Question {currentIndex + 1} of {total}</p>
      <img src={currentQuestion.image} width="120" alt="Road sign" />
      <ul>
        {currentQuestion.options.map((option, i) => (
          <li key={i}>
            <button onClick={() => selectAnswer(i)}>
              {option}{i === selectedIndex ? '  ◀ selected' : ''}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={next} disabled={selectedIndex === null}>
        {isLastQuestion ? 'Finish' : 'Next'}
      </button>
    </div>
  )
}

function Demo() {
  const [run, setRun] = useState(0)
  return <DemoRun key={run} onRetry={() => setRun(prev => prev + 1)} />
}

export default Demo