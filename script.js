const questions = [
    {
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

let arr = [];
let questionNum = 1;
let playerScore = 0;
let index = 0;

function handleQuestions() {
    while (arr.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)];
        if (!arr.includes(random)) {
            arr.push(random);
        }
    }
}

function checkForAnswer() {
    const currentQuestion = arr[index];
    const currentQuestionAnswer = currentQuestion.correctOption;
    const options = document.getElementsByName("option");
    let correctOption = null;

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id;
        }
    })

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green";
            playerScore++;
            index++;
            questionNum++;
        } else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id;
            document.getElementById(wrongLabelId).style.backgroundColor = "red";
            document.getElementById(correctOption).style.backgroundColor = "green";
            index++;
            questionNum++;
        }
    })
    const label = document.getElementsByTagName('label');
    for (let i = 0; i < label.length; i++) {
        label[i].style.pointerEvents = "none";
    }
}

function nextQuestion(index) {
    handleQuestions();
    const currentQuestion = arr[index];
    document.getElementById("question-text").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function handleNextQuestion() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
    const label = document.getElementsByTagName('label');
    for (let i = 0; i < label.length; i++) {
        label[i].style.pointerEvents = "auto";
    }
    (index <= 9) ? nextQuestion(index) : endGame();
    resetOptionBackground();
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById('card').style.backgroundColor = "rgb(255, 200, 200)";
        document.getElementById(option.labels[0].id).style.backgroundColor = "";
    })
}

function endGame() {
    document.getElementById('wrong-answers').innerHTML = 10 - playerScore;
    document.getElementById('right-answers').innerHTML = playerScore;
    document.getElementById('score-modal').style.display = "flex";
}

function closeScore() {
    questionNum = 1;
    playerScore = 0;
    index = 0;
    arr = [];
    nextQuestion(index);
    document.getElementById('score-modal').style.display = "none";
}