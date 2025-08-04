// DOM Elements
const startScreen = document.getElementById("startScreen");
const rulesScreen = document.getElementById("rulesScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const exitBtn = document.getElementById("exitBtn");
const continueBtn = document.getElementById("continueBtn");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const nextBtn = document.getElementById("nextBtn");
const questionCounter = document.getElementById("questionCounter");
const timeDisplay = document.getElementById("time");
const finalScore = document.getElementById("finalScore");
const progress = document.getElementById("progress");
const emojiFeedback = document.getElementById("emojiFeedback");

const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

// Sounds
const heartbeatSound = new Audio("sounds/heartbeat.mp3");
heartbeatSound.loop = true;
const reliefSound = new Audio("sounds/relief.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const thumbsUpSound = new Audio("sounds/thumbs-up.mp3");
const angrySound = new Audio("sounds/angry.mp3");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

// 50 QUESTIONS
const questions = [
    { question: "What does HTML stand for?", options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"], answer: 1 },
    { question: "Which HTML tag is used to define an internal style sheet?", options: ["<style>", "<css>", "<script>", "<link>"], answer: 0 },
    { question: "Which HTML tag is used to display an image?", options: ["<img>", "<image>", "<src>", "<pic>"], answer: 0 },
    { question: "What is the correct HTML tag for inserting a line break?", options: ["<br>", "<break>", "<lb>", "<newline>"], answer: 0 },
    { question: "Which HTML tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
    { question: "How do you create a checkbox in HTML?", options: ["<checkbox>", "<check>", "<input type='checkbox'>", "<cb>"], answer: 2 },
    { question: "What does the <head> tag contain?", options: ["Metadata", "Visible page content", "Footer information", "Header title only"], answer: 0 },
    { question: "Which HTML attribute is used to define inline styles?", options: ["font", "styles", "style", "class"], answer: 2 },
    { question: "What is the default alignment of text in an HTML paragraph?", options: ["Left", "Center", "Right", "Justify"], answer: 0 },
    { question: "Which attribute specifies the destination address of a hyperlink?", options: ["src", "link", "href", "url"], answer: 2 },
    { question: "Which property is used to change text color in CSS?", options: ["font-color", "color", "text-color", "background-color"], answer: 1 },
    { question: "How do you select an element with id 'demo' in CSS?", options: [".demo", "#demo", "demo", "*demo"], answer: 1 },
    { question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: 2 },
    { question: "What does CSS stand for?", options: ["Colorful Style Sheets", "Creative Style System", "Cascading Style Sheets", "Computer Style Sheets"], answer: 2 },
    { question: "How do you make text bold in CSS?", options: ["font-weight: bold", "text:bold", "font:bold", "style:bold"], answer: 0 },
    { question: "Which property is used to change the background color?", options: ["color", "background-color", "bgcolor", "background"], answer: 1 },
    { question: "How do you center a block element in CSS?", options: ["margin: auto", "align: center", "position: center", "text-align: center"], answer: 0 },
    { question: "Which CSS property is used to change the font?", options: ["font-family", "font-style", "text-font", "font-weight"], answer: 0 },
    { question: "Which of the following is a valid CSS comment?", options: ["//comment", "<!-- comment -->", "/* comment */", "#comment"], answer: 2 },
    { question: "What is the default position value in CSS?", options: ["absolute", "relative", "fixed", "static"], answer: 3 },
    { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/*", "#", "<!-- -->"], answer: 0 },
    { question: "How do you create a function in JavaScript?", options: ["function:myFunction()", "function myFunction()", "create function myFunction()", "def myFunction()"], answer: 1 },
    { question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "execute myFunction", "run myFunction"], answer: 1 },
    { question: "How do you declare a JavaScript variable?", options: ["var carName", "variable carName", "v carName", "declare carName"], answer: 0 },
    { question: "Which operator is used to assign a value to a variable?", options: ["*", "=", "-", "+"], answer: 1 },
    { question: "What is the output of 2 + '2' in JavaScript?", options: ["22", "4", "NaN", "Error"], answer: 0 },
    { question: "How do you write an IF statement in JavaScript?", options: ["if (x > y)", "if x > y then", "if x > y:", "if (x > y) then"], answer: 0 },
    { question: "Which keyword is used to define a constant in JavaScript?", options: ["let", "var", "const", "static"], answer: 2 },
    { question: "What is the result of typeof null?", options: ["'object'", "'null'", "'undefined'", "'NaN'"], answer: 0 },
    { question: "How do you write a comment in JavaScript?", options: ["<!--comment-->", "/*comment*/", "//comment", "both 2 and 3"], answer: 3 },
    { question: "Which HTML element is used to play video files?", options: ["<media>", "<video>", "<movie>", "<player>"], answer: 1 },
    { question: "Which CSS property adds shadow to text?", options: ["font-shadow", "shadow", "text-shadow", "text-effect"], answer: 2 },
    { question: "What is the correct way to check if 'a' is NOT equal to 'b' in JavaScript?", options: ["if (a <> b)", "if (a != b)", "if (a !== b)", "both 2 and 3"], answer: 3 },
    { question: "How do you add a background image in CSS?", options: ["background-img", "background-image", "bg-image", "img-background"], answer: 1 },
    { question: "Which HTML tag is used for tables?", options: ["<table>", "<tab>", "<tr>", "<td>"], answer: 0 },
    { question: "Which event occurs when the user clicks an HTML element?", options: ["onmouseover", "onchange", "onclick", "onpress"], answer: 2 },
    { question: "What is the correct syntax for a for loop in JavaScript?", options: ["for(i <= 5; i++)", "for(i=0; i<=5)", "for(i=0; i<=5; i++)", "loop(i=0 to 5)"], answer: 2 },
    { question: "Which property is used to change the font size of an element in CSS?", options: ["font", "font-size", "text-size", "size"], answer: 1 },
    { question: "Which JavaScript method is used to write into an alert box?", options: ["msg()", "alert()", "prompt()", "message()"], answer: 1 },
    { question: "What is the correct HTML tag for the largest heading?", options: ["<head>", "<h6>", "<h1>", "<heading>"], answer: 2 },
    { question: "How do you add a comment in CSS?", options: ["/* comment */", "// comment", "<!-- comment -->", "# comment"], answer: 0 },
    { question: "Which method is used to round a number in JavaScript?", options: ["Math.round()", "Math.rnd()", "round()", "Math.floor()"], answer: 0 },
    { question: "How do you link an external CSS file in HTML?", options: ["<style src='style.css'>", "<link rel='stylesheet' href='style.css'>", "<css link='style.css'>", "<import css='style.css'>"], answer: 1 },
    { question: "Which HTML tag is used to define a list item?", options: ["<li>", "<ul>", "<ol>", "<list>"], answer: 0 },
    { question: "How do you write 'Hello World' in an alert box?", options: ["alert('Hello World');", "msg('Hello World');", "prompt('Hello World');", "console.log('Hello World');"], answer: 0 },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Management", "Document Order Model", "Display Object Method"], answer: 0 },
    { question: "How do you declare an array in JavaScript?", options: ["let arr = [];", "let arr = {};", "let arr = ()", "array = new Array[]"], answer: 0 },
    { question: "How do you apply a class to an element in CSS?", options: [".classname", "#classname", "classname{}", "apply.class"], answer: 0 },
    { question: "Which HTML tag is used to create a dropdown?", options: ["<select>", "<dropdown>", "<option>", "<input type='dropdown'>"], answer: 0 },
    { question: "What is the default display value of <div> in CSS?", options: ["inline", "block", "flex", "grid"], answer: 1 }
];

// Start Quiz
startBtn.onclick = () => {
    startScreen.classList.add("hide");
    rulesScreen.classList.remove("hide");
};

// Exit Quiz
exitBtn.onclick = () => {
    rulesScreen.classList.add("hide");
    startScreen.classList.remove("hide");
};

// Continue to Quiz
continueBtn.onclick = () => {
    rulesScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    shuffleQuestions();
    loadQuestion();
};

// Next Question
nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

// Restart Quiz
restartBtn.onclick = () => {
    emojiFeedback.classList.remove("bounce");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    score = 0;
    shuffleQuestions();
    loadQuestion();
};

// Home Button
homeBtn.onclick = () => {
    emojiFeedback.classList.remove("bounce");
    resultScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    score = 0;
};

// Shuffle Questions
function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
    currentQuestion = 0;
}

// Load Question
function loadQuestion() {
    clearInterval(timer);
    heartbeatSound.currentTime = 0;
    heartbeatSound.play();
    timeLeft = 15;
    timeDisplay.textContent = timeLeft;
    startTimer();

    const q = questions[currentQuestion];
    const questionSection = document.querySelector(".question-section");
    questionSection.style.opacity = 0;

    setTimeout(() => {
        questionText.textContent = q.question;
        optionsList.innerHTML = "";

        q.options.forEach((opt, index) => {
            const li = document.createElement("li");
            li.textContent = opt;
            li.onclick = () => checkAnswer(li, index, q.answer);
            optionsList.appendChild(li);
        });

        questionCounter.textContent = `${currentQuestion + 1} of ${questions.length} Questions`;
        progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
        questionSection.style.opacity = 1;
    }, 150);
}

// Check Answer
function checkAnswer(selected, index, correct) {
    const allOptions = optionsList.querySelectorAll("li");
    allOptions.forEach(opt => opt.onclick = null);

    heartbeatSound.pause();

    if (index === correct) {
        selected.classList.add("correct");
        selected.innerHTML += ' <i class="fas fa-check"></i>';
        score++;
        reliefSound.currentTime = 0;
        reliefSound.play();
        launchConfetti();
    } else {
        selected.classList.add("wrong");
        selected.innerHTML += ' <i class="fas fa-times"></i>';
        allOptions[correct].classList.add("correct");
        wrongSound.currentTime = 0;
        wrongSound.play();
    }
    clearInterval(timer);
}

// Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            nextBtn.click();
        }
    }, 1000);
}

// Show Result
function showResult() {
    heartbeatSound.pause();
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");
    finalScore.textContent = `You scored ${score} out of ${questions.length}`;

    if (score > 25) {
        emojiFeedback.textContent = "👍";
        thumbsUpSound.currentTime = 0;
        thumbsUpSound.play();
    } else {
        emojiFeedback.textContent = "😡";
        angrySound.currentTime = 0;
        angrySound.play();
    }
    emojiFeedback.classList.add("bounce");
}

// Confetti Animation
function launchConfetti() {
    const duration = 1000;
    const end = Date.now() + duration;
    (function frame() {
        const x = Math.random() * confettiCanvas.width;
        const y = Math.random() * confettiCanvas.height;
        const r = Math.random() * 4 + 1;
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        } else {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    })();
}

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
