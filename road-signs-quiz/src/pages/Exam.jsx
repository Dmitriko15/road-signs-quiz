import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

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
      currentQuestion,
      currentIndex,
      total,
      isFirstQuestion,
      isLastQuestion,
      selectedIndex,
      answers,
      answeredCount,
      score,
      isFinished,
      timeLeft,
      selectAnswer,
      goNext,
      goPrevious,
      submit
   } = useQuiz(QUESTION_COUNT, TIME_LIMIT_SECONDS)

   const hasSaved = useRef(false)
   const passed = score >= PASS_MARK

   useEffect(() => {
      if (!isFinished || hasSaved.current) return
      hasSaved.current = true

      //console.log('Exam effect: saving', { score, total, passed }) // Used for debug session
      saveAttempt({
         date: new Date().toISOString(),
         score, total, passed, answers
      })

      setUser(getCurrentUser())
   }, [isFinished, score, total, passed, answers, setUser])

   if (isFinished) {
      return (
         <section className='py-8'>
            <div className="rounded-lg bg-blue-50 p-6 text-center text-blue-800">
               <h1 className="text-4xl font-bold">{passed ? 'Passed' : 'Failed'}: {score} / {total}</h1>
               <p>Pass mark: {PASS_MARK}</p>
            </div>
            <div className="mt-6 space-y-4 text-lg text-slate-700">
               <ul className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                  {answers.map((answer, i) => (
                     <li key={answer.questionId} className="flex justify-between px-4 py-2">
                        <span>Question {i + 1}</span>
                        <span className={answer.correct ? 'text-green-700' : 'text-red-700'}>
                           {answer.correct ? '✓ Correct' : '✗ Wrong'}
                        </span>                     
                     </li>
                  ))}
               </ul>

               <div className="mt-6">
                  <button onClick={onRetry} className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">Try again</button>
               </div>
               <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 text-center">
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                     <Link to="/account" className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">Back to Account</Link>
                  </div>
               </div>
            </div>
         </section>
      )
   }

   return (
   <section className="py-8">
      <div className="flex items-center justify-between">
      <p className="text-slate-700">Question {currentIndex + 1} of {total}</p>
      <p className={`font-mono text-xl font-semibold ${timeLeft <= 30 ? 'text-red-600' : 'text-slate-800'}`}>
         {formatTime(timeLeft)}
      </p>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{currentQuestion.text}</h2>
      <img
         src={currentQuestion.image}
         alt="Road sign"
         className="mx-auto mt-4 h-48 w-48 object-contain"
      />
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {currentQuestion.options.map((option, i) => (
         <li key={i}>
            <button
            onClick={() => selectAnswer(i)}
            aria-pressed={i === selectedIndex}
            className={`w-full cursor-pointer rounded-lg border-2 px-4 py-3 text-left ${
               i === selectedIndex
                  ? 'border-blue-600 bg-blue-50 font-semibold text-blue-800'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400'
            }`}
            >
            {option}
            </button>
         </li>
      ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4">
      <button
         onClick={goPrevious}
         disabled={isFirstQuestion}
         className="cursor-pointer rounded border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
         Previous
      </button>
      <p className="text-sm text-slate-600">Answered {answeredCount} of {total}</p>
      {isLastQuestion ? (
         <button onClick={submit} className="cursor-pointer rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            Submit
         </button>
      ) : (
         <button onClick={goNext} className="cursor-pointer rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            Next
         </button>
      )}
      </div>
   </section>
   )
}

function Exam() {
   const [ run, setRun ] = useState(0)
   return <ExamRun key={run} onRetry={() => setRun(prev => prev+1)}/>
}

export default Exam