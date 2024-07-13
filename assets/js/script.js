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

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

/** 
 * the main game 'loop' called when script is first loaded
 * and after the user's answer has been processed
*/
function runGame(gameType) {
   /* delete the answer */
   document.getElementById("answer-box").value = "";
   document.getElementById("answer-box").focus();

    /* randoms numbers */
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
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
        alert(`Great! You got it! The answer is: ${calculatedAnswer[0]}`);
        incrementScore();
    } else {
        alert(`Darn! Your answer is not correct :-(. The correct answer would have been: ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }
    
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
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "*") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    }else {
        alert(`unimplemeted operator: ${operator}`);
        throw `unimplemeted operator: ${operator} - Aborting!`;
    }
}
/**
 * gets the score incremented
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    /* make sure we don't have negative answers */
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "*";
}

function displayDivisionQuestion(operand1, operand2) {
    let divident = operand1 * operand2;

    if (divident === operand2) {
        document.getElementById("operand1").textContent = divident + operand2;

    } else if (divident > operand2) {
        document.getElementById("operand1").textContent = divident;

    } else {
        alert(`unexpected error: ${operand1}, ${operand2}`);
        throw `unexpected error: ${operand1}, ${operand2} - Aborting!`;
    }

    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
}