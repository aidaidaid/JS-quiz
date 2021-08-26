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
        question: "В каком году началась Первая мировая война?",
        optionA: "1912",
        optionB: "1914",
        optionC: "1918",
        optionD: "1921",
        correctOption: "optionB"
    },

    {
        question: "Самая длинная река?",
        optionA: "Нил",
        optionB: "Амазонка",
        optionC: "Миссисипи",
        optionD: "Янцзы",
        correctOption: "optionB"
    },

    {
        question: "Сколько на Земле материков?",
        optionA: "5",
        optionB: "6",
        optionC: "7",
        optionD: "8",
        correctOption: "optionB"
    },

    {
        question: "Страна с наибольшей площадью?",
        optionA: "Россия",
        optionB: "Китай",
        optionC: "Канада",
        optionD: "США",
        correctOption: "optionA"
    },

    {
        question: "Основатель Apple?",
        optionA: "Илон Маск",
        optionB: "Билл Гейтс",
        optionC: "Стив Возняк",
        optionD: "Стив Джобс",
        correctOption: "optionD"
    },

    {
        question: "В каком году была осуществлена высадка на Луну?",
        optionA: "1956",
        optionB: "1960",
        optionC: "1969",
        optionD: "1982",
        correctOption: "optionC"
    }
]

let shuffledQuestions = [];

function handleQuestions() {
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)];
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random);
        }
    }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

//document.getElementsByTagName('span').remo toggleClass('after-click');


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
    const currentQuestion = shuffledQuestions[indexNumber];
    const currentQuestionAnswer = currentQuestion.correctOption;
    const options = document.getElementsByName("option");
    let correctOption = null;

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    // if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
    //     document.getElementById('option-modal').style.display = "flex"
    // }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            //document.getElementById(correctOption).style.backgroundColor = "green"
            document.getElementById('card').style.backgroundColor = "green"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        } else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
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

        // document.getElementsByTagName('span').removeClass('after-click');
        document.getElementsByClassName('game-options-container').disabled = true;
        document.getElementsByClassName('game-options-container').prop("readonly", true)
}

function handleNextQuestion() {
    //checkForAnswer()
    unCheckRadioButtons();
    (indexNumber <= 9) ? NextQuestion(indexNumber) : handleEndGame();
    resetOptionBackground();
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById('card').style.backgroundColor = "pink"
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}