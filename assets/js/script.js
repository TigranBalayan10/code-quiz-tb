var timerEl = document.getElementById('countdown');
var container = document.getElementById('main-container');

// startGame button
var startGameButtonHandler = function (event) {
    // get target element from event
    var targetEl = event.target;
    if (targetEl.matches('#btn-start')) {
        countdown();
        showQuestions();
    }
};

// showQuestions in container and remove welcome massege
var showQuestions = function (atIndex = 0) {
    // Set current question
    var currentQuestion = questions[atIndex];
    // clear container
    document.getElementById('main-container').innerHTML = '';
    // create new div for questions
    var questionEl = document.createElement('div');
    questionEl.className = 'question';
    var questionElH2 = document.createElement('h2');
    questionElH2.className = 'question-text';
    // append question to question element from array
    questionElH2.innerText = currentQuestion.question;
    questionEl.appendChild(questionElH2);
    // create a loop for answers
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        // create buttons for answers
        var answersEl = document.createElement('button');
        // add functionality to answer buttons
        answersEl.addEventListener('click', () => {
            // when no questions left in array return to highscore
            if (atIndex === questions.length - 1) {
                showHighscore();
                return;
            }
            // when clicked on answers continue to next question 
            var nextIndex = atIndex + 1;
            showQuestions(nextIndex);
            // add wrong or correct outside container
            var wrongCorrectEl = document.createElement('p');
            wrongCorrectEl.className = "wrong-correct";
            // add text at the bottom, when wrong-wrong, when correct-correct
            if (currentQuestion.answers[i].correct) {
                wrongCorrectEl.innerText = 'Correct!';
            } else {
                wrongCorrectEl.innerText = 'Wrong!';
            }
            // append appropriate text
            container.appendChild(wrongCorrectEl);
        });
        // next question text append to question element
        answersEl.innerText = currentQuestion.answers[i].text;
        answersEl.className = 'btn';
        questionEl.appendChild(answersEl);
    }
    // append questions and answers to main container
    container.appendChild(questionEl);
};

// create high score 
function showHighscore() {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
}

var timeLeft = 75;
var timeInterval;
function countdown() {
    timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 0
        if (timeLeft > 0) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = 'Time: ' + timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = 'Time: 0';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
        }
    }, 1000);
}
// array of objects for questions and answers
var questions = [
    {
        question:
            'The web development environment (JavaScript) offers which standard construct for data validation of the input entered by the user.',
        answers: [
            { text: 'Permit server-side', correct: false },
            { text: 'Controlled loop constructs', correct: true },
            { text: 'Client side Event', correct: false },
            { text: 'Server page access', correct: false },
        ],
    },
    {
        question: 'The script tag must be placed in __________',
        answers: [
            { text: 'After the body tag', correct: false },
            { text: 'the head tag', correct: false },
            { text: 'the title or head', correct: false },
            { text: 'the head or body', correct: true },
        ],
    },
];

container.addEventListener('click', startGameButtonHandler);