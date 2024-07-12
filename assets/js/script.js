/* wait for DOM to finish loading */
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons){
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }    
        })    
    }

    runGame("addition");
})

/** 
 * the main game 'loop' called when script is first loaded
 * and after the user's answer has been processed
*/
function runGame(gameType) {
    /* randoms numbers */
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        throw `unknown game type: ${gameType} - Aborting!`;
    }
}

/**
 * checks if the answer is correct
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();

    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right!! :-) ");
    } else {
        alert(`Awww..your answer: ${userAnswer}. The correct Answer is: ${calculatedAnswer[0]}`);
    }
    document.getElementById("answer-box").value = "";
    
    runGame(calculatedAnswer[1]);
}

/**
 * get operands from the DOM and calculate answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else {
        alert(`unimplemeted operator: ${operator}`);
        throw `unimplemeted operator: ${operator} - Aborting!`;
    }
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestions() {

}