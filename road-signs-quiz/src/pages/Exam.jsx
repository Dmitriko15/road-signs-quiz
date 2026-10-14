import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

import useQuiz from '../hooks/useQuiz'
import { saveAttempt, getCurrentUser } from '../data/userStore'


const PASS_MARK = 8
const QUESTION_COUNT = 10
const TIME_LIMIT_SECONDS = 180

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function ExamRun({ onRetry }) {
   const { setUser } = useAuth()
   const {
      quizQuestions, currentQuestion, currentIndex, total, isLastQuestion, selectedIndex, answers, score, isFinished, timeLeft, selectAnswer, next
   } = useQuiz(QUESTION_COUNT, TIME_LIMIT_SECONDS)

   const hasSaved = useRef(false)
   const passed = score >= PASS_MARK

   useEffect(() => {
      if (!isFinished || hasSaved.current) return
      hasSaved.current = true

      saveAttempt({
         date: new Date().toISOString(),
         score, total, passed, answers
      })

      setUser(getCurrentUser())
   }, [isFinished, score, total, passed, answers, setUser])

   if (isFinished) {
      return (
         <div>
            <h1>{passed ? 'Passed' : 'Failed'}: {score} / {total}</h1>
            <p>Pass mark: {PASS_MARK}</p>

            <ul>
               {answers.map((answer, i) => (
                  <li key={answer.questionId}>
                     Question {i + 1}: {answer.correct ? '✓ Correct' : '✗ Wrong'}
                  </li>
               ))}
            </ul>

            <button onClick={onRetry}>Try again</button>
            <Link to="/account">Back to Account</Link>
         </div>
      )
   }

   return (
      <div>
         <p>Time left: {formatTime(timeLeft)}</p>
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

function Exam() {
   const [ run, setRun ] = useState(0)
   return <ExamRun key={run} onRetry={() => setRun(prev => prev+1)}/>
}

export default Exam