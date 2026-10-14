import { useState, useEffect } from 'react'
import questions from '../data/questions'

function shuffle(array) {
    const copy = [...array]
    for (let i=copy.length-1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [copy[i], copy[j]]=[copy[j], copy[i]]
    }
    return copy
}

function shuffleQuestion(question) {
    const correctText = question.options[question.correctAnswer]
    const options = shuffle(question.options)
    return {...question,options, correctAnswer: options.indexOf(correctText)}
}

function useQuiz(questionCount, timeLimitSeconds){
    const[quizQuestions] = useState(() => 
        shuffle(questions).slice(0, questionCount).map(shuffleQuestion)
    )
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [ pickedById, setPickedById ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)
    const [ timeLeft, setTimeLeft ] = useState(timeLimitSeconds)
    const [ endTime ] = useState(() => Date.now() + timeLimitSeconds * 1000)

    const currentQuestion = quizQuestions[currentIndex]
    const isFirstQuestion = currentIndex === 0
    const isLastQuestion = currentIndex === quizQuestions.length-1
    const selectedIndex = pickedById[currentQuestion.id] ?? null
    const isFinished = submitted || timeLeft === 0

    const results = quizQuestions.map(question => {
        const picked = pickedById[question.id] ?? null
        return {
            questionId: question.id,
            selectedIndex: picked,
            correct: picked !== null && picked === question.correctAnswer
        }
    })

    const score = results.filter(result => result.correct).length
    const answeredCount = Object.keys(pickedById).length

    useEffect(() => {
        if(isFinished) return

        const id = setInterval(() => {
            setTimeLeft(Math.max(0, Math.ceil((endTime - Date.now()) / 1000 )))
        }, 250)

        return () => clearInterval(id)
    }, [isFinished, endTime])

    function selectAnswer(index) {
        if (isFinished) return
        setPickedById(prev => ({...prev, [currentQuestion.id]: index}))
    }

    function goNext() {
        if (isLastQuestion || isFinished) return
        setCurrentIndex(prev => prev+1)
    }

    function goPrevious() {
        if (isFirstQuestion || isFinished) return
        setCurrentIndex(prev => prev-1)
    }

    function submit() {
        setSubmitted(true)
    }

    return {
        quizQuestions,
        currentQuestion,
        currentIndex,
        total: quizQuestions.length,
        isFirstQuestion,
        isLastQuestion,
        selectedIndex,
        answers: results,
        answeredCount,
        score,
        isFinished,
        timeLeft,
        selectAnswer,
        goNext,
        goPrevious,
        submit
    }
}

export default useQuiz