import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'


import useQuiz from '../hooks/useQuiz'

function Demo() {
  const { currentQuestion, currentIndex, total, isLastQuestion, goToNext } = useQuiz(5)

  return (
    <div>
      <p>Question {currentIndex + 1} of {total}</p>
      <img src={currentQuestion.image} width="120" alt="Road sign" />
      <ul>
        {currentQuestion.options.map((option, i) => (
          <li key={i}>{option}{i === currentQuestion.correctAnswer ? ' ✓' : ''}</li>
        ))}
      </ul>
      <button onClick={goToNext} disabled={isLastQuestion}>Next</button>
    </div>
  )
}

export default Demo