import { useState } from 'react'
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

function useQuiz(questionCount){
    const[quizQuestions] = useState(() => 
        shuffle(questions).slice(0, questionCount).map(shuffleQuestion)
    )
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentQuestion = quizQuestions[currentIndex]
    const isLastQuestion = currentIndex === quizQuestions.length-1

    function goToNext() {
        if(!isLastQuestion) {
            setCurrentIndex(prev => prev+1)
        }
    }

    return {
        currentQuestion,
        currentIndex,
        total: quizQuestions.length,
        isLastQuestion,
        goToNext
    }
}

export default useQuiz