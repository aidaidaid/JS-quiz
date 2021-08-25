const questions = [{
        question: "Столица Нигерии?",
        optionA: "Лагос",
        optionB: "Ибадан",
        optionC: "Бенин‑Сити",
        optionD: "Абуджа",
        correctOption: "optionD"
    },

    {
        question: "Сколько естественных спутников у Урана?",
        optionA: "25",
        optionB: "27",
        optionC: "29",
        optionD: "31",
        correctOption: "optionB"
    },

    {
        question: "Ближайшая звезда к Солнечной системе?",
        optionA: "Альфа Центавра А",
        optionB: "Алтаир",
        optionC: "Сириус",
        optionD: "Проксима Центавра",
        correctOption: "optionD"
    },

    {
        question: "Что не относится к щелочным металлам?",
        optionA: "Натрий",
        optionB: "Цезий",
        optionC: "Родий",
        optionD: "Литий",
        correctOption: "optionC"
    },

    {
        question: "How manay hours can be found in a day ?",
        optionA: "30 hours",
        optionB: "38 hours",
        optionC: "48 hours",
        optionD: "24 hours",
        correctOption: "optionD"
    },

    {
        question: "Which is the longest river in the world ?",
        optionA: "River Nile",
        optionB: "Long River",
        optionC: "River Niger",
        optionD: "Lake Chad",
        correctOption: "optionA"
    },

    {
        question: "_____ is the hottest Continent on Earth ?",
        optionA: "Oceania",
        optionB: "Antarctica",
        optionC: "Africa",
        optionD: "North America",
        correctOption: "optionC"
    },

    {
        question: "Which country is the largest in the world ?",
        optionA: "Russia",
        optionB: "Canada",
        optionC: "Africa",
        optionD: "Egypt",
        correctOption: "optionA"
    },

    {
        question: "Which of these numbers is an odd number ?",
        optionA: "Ten",
        optionB: "Twelve",
        optionC: "Eight",
        optionD: "Eleven",
        correctOption: "optionD"
    },

    {
        question: `"You Can't see me" is a popular saying by`,
        optionA: "Eminem",
        optionB: "Bill Gates",
        optionC: "Chris Brown",
        optionD: "John Cena",
        correctOption: "optionD"
    }
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null;

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        } else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            //document.getElementsByClassName('game-quiz-container').style.backgroundColor = "red";
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        } else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    } else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    } else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

// const quizData = [
//     {
//       question: 'Which country produces the most coffee in the world?',
//       a: 'Columbia',
//       b: 'Indonesia',
//       c: 'Ethiopia',
//       d: 'Brazil',
//       correct: 'd',
//     },
//     {
//       question: 'What is Chandler’s last name in the sitcom Friends?',
//       a: 'Geller',
//       b: 'Smith',
//       c: 'Bing',
//       d: 'Johnson',
//       correct: 'c',
//     },
//     {
//       question: "What's the most expensive home in the world?",
//       a: 'Buckingham Palace - UK',
//       b: 'Antilla - India',
//       c: 'Villa Les Cédres - France',
//       d: 'Four Fairfield Pond -USA',
//       correct: 'a',
//     },
//     {
//       question: 'How many rides are there at Disney World?',
//       a: '50',
//       b: '42',
//       c: '46',
//       d: '49',
//       correct: 'b',
//     },
//     {
//       question: 'What was Beyoncé’s first solo album?',
//       a: 'Drunk In Love',
//       b: 'Dangerously In Love',
//       c: 'Lemonade',
//       d: 'Deja Vu',
//       correct: 'b',
//     },
//   ];

//   const quiz = document.getElementById('quiz'),
//     answerEls = document.querySelectorAll('.answer'),
//     questionEl = document.getElementById('question'),
//     a_text = document.getElementById('a_text'),
//     b_text = document.getElementById('b_text'),
//     c_text = document.getElementById('c_text'),
//     d_text = document.getElementById('d_text'),
//     submitBtn = document.getElementById('submit');

//   let currentQuiz = 0,
//     score = 0;

//   loadQuiz();

//   function loadQuiz() {
//     deselectAnswers();

//     const currentQuizData = quizData[currentQuiz];

//     questionEl.innerText = currentQuizData.question;
//     a_text.innerText = currentQuizData.a;
//     b_text.innerText = currentQuizData.b;
//     c_text.innerText = currentQuizData.c;
//     d_text.innerText = currentQuizData.d;
//   }


//   function deselectAnswers() {
//     answerEls.forEach((answerEl) => (answerEl.checked = false));
//   }

//   function getSelected() {
//     let answer;

//     answerEls.forEach((answerEl) => {
//       if (answerEl.checked) {
//         answer = answerEl.id;
//       }
//     });

//     return answer;
//   }

//   submitBtn.addEventListener('click', () => {
//     const answer = getSelected();
//     if (answer) {
//       if (answer === quizData[currentQuiz].correct) {
//         score++;
//       }

//       currentQuiz++;

//       if (currentQuiz < quizData.length) {
//         loadQuiz();
//       } else {
//         quiz.innerHTML = `
//           <h2>You answered ${score}/${quizData.length} questions correctly</h2>

//           <button onclick="location.reload()">Reload</button>
//         `;
//       }
//     }
//   });