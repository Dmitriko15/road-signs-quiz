import useQuiz from '../hooks/useQuiz'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function Demo() {
  const {
    currentQuestion, currentIndex, total, isLastQuestion,
    selectedIndex, answers, score, isFinished, timeLeft, selectAnswer, next
  } = useQuiz(5, 20)

  if (isFinished) {
    return (
      <div>
        <h1>Score: {score} / {total}</h1>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
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

export default Demo