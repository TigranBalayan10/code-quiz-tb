var timerEl = document.getElementById('countdown');
var container = document.getElementById('main-container');
container.className = 'container';

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
    var currentQuestion = questions[atIndex];
    // clear container
    container.innerHTML = '';
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
        answersEl.className = 'btn';
        // add functionality to answer buttons
        answersEl.addEventListener('click', function () {
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
            wrongCorrectEl.className = 'wrong-correct';
            // add text at the bottom, when wrong-wrong, when correct-correct
            if (currentQuestion.answers[i].correct) {
                wrongCorrectEl.innerText = 'Correct!';
            } else {
                timeLeft -= 10;
                if (timeLeft <= 0) {
                    timeLeft = 0;
                    showHighscore();
                }
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

var score;
// create high score
var showHighscore = function () {
    score = timeLeft;
    container.innerHTML = '';

    var highScoreEl = document.createElement('div');
    highScoreEl.className = 'high-score-done';
    var highScoreH2 = document.createElement('h2');
    highScoreH2.innerText = 'All Done!';
    var highScoreNum = document.createElement('p');
    highScoreNum.innerText = 'Your final score is  ' + score;
    var highScoreForm = document.createElement('form');
    var highScoreLabelEl = document.createElement('label');
    highScoreLabelEl.innerText = 'Enter Initials: ';
    var highScoreInputEl = document.createElement('input');
    highScoreInputEl.type = 'text';
    highScoreInputEl.value = '';
    var highScoreSubmitEl = document.createElement('a');
    highScoreSubmitEl.innerText = 'Submit';
    highScoreSubmitEl.className = 'high-score-submit';
    highScoreSubmitEl.setAttribute('id', 'submit-button');
    highScoreSubmitEl.setAttribute('href', './high-score.html');
    highScoreSubmitEl.addEventListener('click', (event) => {
        // check if the initials are not valid
        if (!isValidInput(highScoreInputEl.value)) {
            event.preventDefault();
            highScoreInputEl.value = '';
            alert('Please input valid initials');
            return;
        }

        var currentScoreObject = {
            score: score,
            initials: highScoreInputEl.value
        };

        var currentHighscores = localStorage.getItem('highscores');
        if (currentHighscores) {
            var currentHighscoresArray = JSON.parse(currentHighscores);
            currentHighscoresArray.push(currentScoreObject);
            localStorage.setItem(
                'highscores',
                JSON.stringify(currentHighscoresArray)
            );
        } else {
            var toAdd = [currentScoreObject];
            localStorage.setItem('highscores', JSON.stringify(toAdd));
        }
    });

    container.appendChild(highScoreEl);
    highScoreEl.appendChild(highScoreH2);
    highScoreEl.appendChild(highScoreNum);
    highScoreEl.appendChild(highScoreForm);
    highScoreForm.appendChild(highScoreLabelEl);
    highScoreForm.appendChild(highScoreInputEl);
    highScoreForm.appendChild(highScoreSubmitEl);
};


function isValidInput() {
    var highScoreValue = highScoreInputEl.value
    if (highScoreValue.match('YY')) {
        showHighscore();
        return true;
    }
};

var timeLeft = 75;
function countdown() {
    timerEl.textContent = 'Time: ' + timeLeft;
    var timeInterval = setInterval(function () {
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
            showHighscore();
        }
    }, 1000);
}
// array of objects for questions and answers
var questions = [
    {
        question:
            'The web development environment (JavaScript) offers which standard construct for data validation of the input entered by the user.',
        answers: [
            { text: '1. Permit server-side', correct: false },
            { text: '2. Controlled loop constructs', correct: true },
            { text: '3. Client side Event', correct: false },
            { text: '4. Server page access', correct: false },
        ],
    },
    {
        question: 'The script tag must be placed in __________',
        answers: [
            { text: '1. After the body tag', correct: false },
            { text: '2. the head tag', correct: false },
            { text: '3. the title or head', correct: false },
            { text: '4. the head or body', correct: true },
        ],
    },
    {
        question:
            '______ tag is an extension to HTML that can enclose any number of JavaScript statements.',
        answers: [
            { text: '1. <SCRIPT>', correct: true },
            { text: '2. <BODY>', correct: false },
            { text: '3. <HEAD>', correct: false },
            { text: '4. <TITLE>', correct: false },
        ],
    },
    {
        question: 'Which of the following is not considered a JavaScript operator?',
        answers: [
            { text: '1. new', correct: false },
            { text: '2. this', correct: true },
            { text: '3. delete', correct: false },
            { text: '4. typeof', correct: false },
        ],
    },
    {
        question:
            'Using _______ statement is how you test for a specific condition.',
        answers: [
            { text: '1. Select', correct: false },
            { text: '2. If', correct: true },
            { text: '3. Switch', correct: false },
            { text: '4. For', correct: false },
        ],
    },
    {
        question:
            'The _______ method of an Array object adds and/or removes elements from an array.',
        answers: [
            { text: '1. Reverse', correct: false },
            { text: '2. Shift', correct: false },
            { text: '3. Slice', correct: true },
            { text: '4. Splice', correct: false },
        ],
    },
    {
        question: 'JavaScript entities start with _______ and end with _________.',
        answers: [
            { text: '1. Semicolon, colon', correct: false },
            { text: '2. Semicolon, Ampersand', correct: false },
            { text: '3. Ampersand, colon', correct: false },
            { text: '4. Ampersand, semicolon', correct: true },
        ],
    },
    {
        question:
            '<script type="text/javascript"> x=4+"4" document.write(x) </script>. Output------?',
        answers: [
            { text: '1. 44', correct: true },
            { text: '2. 8', correct: false },
            { text: '3. 4', correct: false },
            { text: '4. Error output', correct: false },
        ],
    },
    {
        question: 'Which of the following is the structure of an if statement?',
        answers: [
            {
                text: '1. if (conditional expression is true) thenexecute this codeend if',
                correct: false,
            },
            {
                text: '2. if (conditional expression is true)execute this codeend if',
                correct: false,
            },
            {
                text: '3. if (conditional expression is true)   {then execute this code>->}',
                correct: true,
            },
            {
                text: '4. if (conditional expression is true) then {execute this code}',
                correct: false,
            },
        ],
    },
    {
        question:
            'What is the correct syntax for referring to an external script called " abc.js"?',
        answers: [
            { text: '1. <script href=" abc.js">', correct: false },
            { text: '2. <script name=" abc.js">', correct: false },
            { text: '3. <script src=" abc.js">', correct: true },
            { text: '4. None of the above', correct: false },
        ],
    },
];

container.addEventListener('click', startGameButtonHandler);
