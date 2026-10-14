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
    const [currentIndex, setCurrentIndex] = useState(0)
    const [ selectedIndex, setSelectedIndex ] = useState(null)
    const [ answers, setAnswers ] = useState([])
    const [ timeLeft, setTimeLeft ] = useState(timeLimitSeconds)
    const [ endTime ] = useState(() => Date.now() + timeLimitSeconds * 1000)

    const currentQuestion = quizQuestions[currentIndex]
    const isLastQuestion = currentIndex === quizQuestions.length-1
    const score = answers.filter(answer => answer.correct).length
    const isFinished = answers.length === quizQuestions.length || timeLeft === 0

    const results = quizQuestions.map(question => {
        const given = answers.find(answer => answer.questionId == question.id)
        return given ?? { questionId: question.id, selectedIndex: null, correct: false }
    })

    useEffect(() => {
        if(isFinished) return

        const id = setInterval(() => {
            setTimeLeft(Math.max(0, Math.ceil((endTime - Date.now()) / 1000 )))
        }, 250)

        return () => clearInterval(id)
    }, [isFinished, endTime])

    function selectAnswer(index) {
        if (isFinished) return
        setSelectedIndex(index)
    }

    function next() {
        if(selectedIndex === null || isFinished) return

        const answer = {
            questionId: currentQuestion.id,
            selectedIndex,
            correct: selectedIndex === currentQuestion.correctAnswer
        }

        setAnswers(prev => [...prev, answer])
        setSelectedIndex(null)

        if(!isLastQuestion){
            setCurrentIndex(prev => prev+1)
        }
    }

    return {
        quizQuestions,
        currentQuestion,
        currentIndex,
        total: quizQuestions.length,
        isLastQuestion,
        selectedIndex,
        answers: results,
        score,
        isFinished,
        timeLeft,
        selectAnswer,
        next
    }
}

export default useQuiz