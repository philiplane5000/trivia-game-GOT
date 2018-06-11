console.log('CONNECTED');

$(document).ready(function() {


//https://www.fromthegrapevine.com/quizzes/arts/quiz-trivia-game-of-thrones

let numOne = new QuestionGenerator("How did Daenerys Targaryen eventually hatch her dragon eggs?", "In a funeral pyre", "In a lightning storm", "In a fireplace", "In a frozen cave", "In a funeral pyre", "At the end of Season 1, Daenerys Targaryen placed her three dragon eggs on the funeral pyre of her late husband. She then walked into the flames and emerged from the ashes the next morning holding three newly hatched dragons.");
let numTwo = new QuestionGenerator("Which U.S. city was one of 8 international locations visited by the 2015 'Game of Thrones' Exhibition?", "Chicago", "New York City", "San Diego", "Boston", "San Diego", "The 2015 San Diego Comic-Con played host to the 'Game of Thrones' Exhibition in the U.S. Over the next 12 months, the exhibit also visited Spain, Israel, France, England, Germany and Sweden.");
let numThree = new QuestionGenerator("The phrase 'Valar Morghulis' or 'all men must die' is usually responded with:", "Valar Dohaeris or 'all men must serve'", "Valar Rohnas or 'all men must live'", "Valar GoGo or 'all men must dance'", "Valar Morgooglis or 'all must must dream'", "Valar Dohaeris or 'all men must serve'", "The Season 2 finale was named \"Valar Morghulis\" while the Season 3 premiere was named \"Valar Dohaeris.\" In 2014, the Brewery Ommegang created a beer called \"Valar Morghulis\", with each cork fire-branded with the response.");
let numFour = new QuestionGenerator("American actor Peter Dinklage, who plays Tyrion Lannister, also had a starring role in this fantasy franchise:", "Lord of the Rings", "Highlander", "The Chronicles of Narnia", "The Legend of Zelda", "The Chronicles of Narnia", "Dinklage played Trumpkin in the 2008 film \"The Chronicles of Narnia: Prince Caspian.\" He was not only the first person cast for the \"Game of Thrones\" series, but also the only person author George R.R. Martin wanted to play Tyrion.");
let numFive = new QuestionGenerator("What is the only thing that can put out volatile Wildfire?", "Sand", "Water", "Dragon's blood", "Sunlight", "Sand", "So unstable that even strong sunlight can set it ablaze, Wildfire is an extremely volatile substance that can only be extinguished with copious amounts of sand.");

let triviaArr = [numOne, numTwo, numThree, numFour, numFive];
let correctTally = 0;
let correctAnswersArr = [];
let incorrectTally = 0;
let incorrectAnswersArr = [];

let questionTimerRunning = false;
let moreInfoTimerRunning = false;
let intervalIdOne;
let intervalIdTwo;

let questionNum = 0;

//TIMER TO TRIGGER NEW PAGES WITHOUT USER INPUT: (THO USER WILL ALSO BE ABLE TO INFLUENCE EVENTS WITH KEY OR BUTTON PRESS)

let timer = {
    questionTimer: 30,
    moreInfoTimer: 10,

    reset: function() {
        timer.questionTimer = 30;
        timer.moreInfoTimer = 10;    
    },

    startQuestionTimer: function() {
        if (!questionTimerRunning) {
            intervalIdOne = setInterval(timer.questionTimerCountdown, 1000);
            questionTimerRunning = true;
        }
    },
    startMoreInfoTimer: function() {
        if (!moreInfoTimerRunning) {
            intervalIdTwo = setInterval(timer.moreInfoTimerCountdown, 1000);
            moreInfoTimerRunning = true;
        }
    },

    questionTimerCountdown: function() {
        if (!(timer.questionTimer <= 0)) {
            timer.questionTimer--;
            let timeLeft = timer.questionTimer;
            console.log(timeLeft);
            $('#time-remaining').text(`${timeLeft}`);
        } else {
            timer.stopQuestionTimer();
            renderMoreInfoPage(triviaArr, questionNum);
            (timer.startMoreInfoTimer());

        }
    },

    stopQuestionTimer: function() {
        clearInterval(intervalIdOne);
        questionTimerRunning = false;        
    },

    moreInfoTimerCountdown: function() {
        if(!(timer.moreInfoTimer <= 0)) {
            timer.moreInfoTimer--;
            let timeLeft = timer.moreInfoTimer;
            console.log(timeLeft);
            $('#time-remaining').text(`${timeLeft}`);
        } else {
            timer.stopMoreInfoTimer();
            timer.triggerNext();
        }
    },

    stopMoreInfoTimer: function() {
            clearInterval(intervalIdTwo);
            moreInfoTimerRunning = false;
    },

    triggerNext: function() {
        if(questionNum !== triviaArr.length-1){
        timer.reset();
        questionNum++;
        renderQuestionPage(triviaArr, questionNum);
        timer.startQuestionTimer();
        } else {
        renderEndGame();
        }
    }

}

function renderQuestionPage(triviaArr, questionNum) {

    $('.timer-row').removeClass('hidden');
   
    $('.question-row')
        .html(`
            <div class="col-4"><h4>${triviaArr[questionNum].ask()}</h4></div>
        `)

    $('.answer-row')
        .html(`
            <div class="col-4">
                <ul>
                    <li class="clickToGuess">${triviaArr[questionNum].optionA}</li>
                    <li class="clickToGuess">${triviaArr[questionNum].optionB}</li>
                    <li class="clickToGuess">${triviaArr[questionNum].optionC}</li>
                    <li class="clickToGuess">${triviaArr[questionNum].optionD}</li>
                <ul>
            </div>
        `)

    $('.clickToGuess').on('click', function(){
        if($(this).text() === triviaArr[questionNum].Answer) {
            alert('CORRECT!');
            correctTally++;

            let correctGuess = $(this).text();
            correctAnswersArr.push(correctGuess);
            console.log(correctAnswersArr);
        } else {
            alert('INCORRECT!');
            incorrectTally++;

            let incorrectGuess = $(this).text();
            incorrectAnswersArr.push(incorrectGuess);
            console.log(incorrectAnswersArr);

            }
        })
    
} /*END RENDER-QUESTION-PAGE()*/

function renderMoreInfoPage(triviaArr, questionNum) {
    $('.timer-row').toggleClass('hidden');

    $('.more-info').html(`
        <div class="col-6"><h3>MORE INFO:</h3></div>
    `)
    $('.more-info-row').html(`
    <div class="col-6"><h6>${triviaArr[questionNum].moreInfo}</h6></div>
    `)
}

function renderEndGame() {

    $('.title').html(`
    <h1>FINISH!</h1>
    `)

    $('.timer-row').addClass('hidden');

    $('.end-game').html(`
    <div class="col-5 border border-success"><h4>You answered ${correctTally} Correct</h4></div>
    <div class="col-5 border border-danger"><h4>You answered ${incorrectTally} Incorrectly</h4></div>
    `);

    $('.more-info-row').empty();
    $('.more-info-row').html(`
    <div class="col-5 border border-success"><h4>CONVERT CORRECTARRAY TO A LIST</h4></div>
    <div class="col-5 border border-danger"><h4>CONVERT INCORRECTARRAY TO A LIST</h4></div>
    `);

}

//QUESTION CONSTRUCTOR:
function QuestionGenerator(Question, optionA, optionB, optionC, optionD, Answer, moreInfo) {
    this.Question = Question;
    this.optionA = optionA;
    this.optionB = optionB;
    this.optionC = optionC;
    this.optionD = optionD;
    this.Answer = Answer;
    this.moreInfo = moreInfo;
    this.ask = function () {
        return this.Question;
    }
};

function startGame(){
    correctTally = 0;
    incorrectTally = 0;
    questionTimerRunning = false;
    moreInfoTimerRunning = false;
    intervalIdOne;
    intervalIdTwo;
    questionNum = 0;
    renderQuestionPage(triviaArr, questionNum);
    timer.startQuestionTimer();
}

// renderEndGame();
startGame();




}); /*end document.ready*/