var highScorelistEl = document.getElementById('high-score-container');
var displayResult = document.getElementById('high-score-list');
//get items from local storage
var highScoreData = localStorage.getItem('highscores');
//make them array of objects
highScoreData = JSON.parse(highScoreData);
//loop arra and append it to ordered list in html 
for (var i = 0; i < highScoreData.length; i++) {
    var highScoreDisplayEl = document.createElement('li');
    highScoreDisplayEl.innerText = highScoreData[i].initials + ' - ' + highScoreData[i].score;
    displayResult.appendChild(highScoreDisplayEl);
}
 // create clear scores button functionality to clear local storage and innerHTML
var clearScore = function (event) {
    // get target element from event
    var targetEl = event.target;
    if (targetEl.matches('#clear-score')) {
        localStorage.clear('highscores');
        displayResult.innerText = '';
    }
};

highScorelistEl.addEventListener("click", clearScore);

