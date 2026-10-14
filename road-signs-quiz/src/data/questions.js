/* This file is the single question bank for the whole quiz
Both the Exam page and the Demo page read from it through the useQuiz hook
Here is a setup for exports:
questions - array of 14 road sign questions
useQuiz shuffles the pool and picks 10 for Exam or 3 for Demo, shuffling each question's options too

DATA SHAPE (exported as default array)
Question: { id, image (path string), text, options: [] (4 strings), correctAnswer (number, 0-3) }
Image paths point to files in public/signs/, served from the root (e.g. '/signs/stop.png')
Attempt answers reference questions by id: { questionId, selectedIndex (null if unanswered), correct }
*/

/* ----------------------- QUESTIONS shape -----------------------*/

const questions = [
    {
        id: 1,
        image: '/signs/stop.png',
        text: 'What does this sign mean?',
        options: ['Stop', 'Give way', 'No entry', 'Road closed'],
        correctAnswer: 0
    },
    {
        id: 2,
        image: '/signs/yield.png',
        text: 'What does this sign mean?',
        options: ['Stop', 'No entry', 'Priority road', 'Give way'],
        correctAnswer: 3
    },
    {
        id: 3,
        image: '/signs/clearway.png',
        text: 'What does this sign mean?',
        options: ['No parking', 'No stopping (clearway)', 'No entry', 'Road closed'],
        correctAnswer: 1
    },
    {
        id: 4,
        image: '/signs/deadend.png',
        text: 'What does this sign mean?',
        options: ['Road closed', 'Roadworks ahead', 'Dead end (no through road)', 'No entry'],
        correctAnswer: 2
    },
    {
        id: 5,
        image: '/signs/exit100.png',
        text: 'What does this sign mean?',
        options: ['Motorway exit 100 metres ahead', 'Motorway entry 100 metres ahead', 'Roundabout exit 100 metres ahead', 'Service area 100 metres ahead'],
        correctAnswer: 0
    },
    {
        id: 6,
        image: '/signs/height.png',
        text: 'What does this sign mean?',
        options: ['Minimum vehicle height', 'Low bridge warning', 'Maximum vehicle height', 'Maximum load height'],
        correctAnswer: 2
    },
    {
        id: 7,
        image: '/signs/weight.png',
        text: 'What does this sign mean?',
        options: ['Minimum vehicle weight', 'Maximum vehicle weight', 'No Entry — Large Vehicles (by Weight)', 'No Entry — Large Vehicles only (min Weight)'],
        correctAnswer: 2
    },
    {
        id: 8,
        image: '/signs/hospital.png',
        text: 'What does this sign mean?',
        options: ['Highway Ahead', 'Heritage site Ahead', 'Emergency vehicles only', 'Hospital Ahead'],
        correctAnswer: 3
    },
    {
        id: 9,
        image: '/signs/slowlane.png',
        text: 'What does this sign mean?',
        options: ['Overtaking lane', 'Bus lane', 'Slow vehicles lane', 'Lane closed'],
        correctAnswer: 2
    },
    {
        id: 10,
        image: '/signs/speedlimit.png',
        text: 'What does this sign mean?',
        options: ['Minimum speed limit', 'Maximum speed limit', 'Recommended speed', 'End of speed limit'],
        correctAnswer: 1
    },
    {
        id: 11,
        image: '/signs/turnleft.png',
        text: 'What does this sign mean?',
        options: ['Turn left', 'Turn left ahead', 'Keep left', 'No left turn'],
        correctAnswer: 0
    },
    {
        id: 12,
        image: '/signs/turnright.png',
        text: 'What does this sign mean?',
        options: ['Turn right ahead', 'Turn right', 'Keep right', 'No right turn'],
        correctAnswer: 1
    },
    {
        id: 13,
        image: '/signs/keepleft.png',
        text: 'What does this sign mean?',
        options: ['Turn left', 'Turn left ahead', 'Keep left', 'No left turn'],
        correctAnswer: 2
    },
    {
        id: 14,
        image: '/signs/keepright.png',
        text: 'What does this sign mean?',
        options: ['Turn right ahead', 'Turn right', 'Keep right', 'No right turn'],
        correctAnswer: 2
    }
]

export default questions