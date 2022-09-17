
let computerSelection; //Generate a random no from 1-3
let playerSelection = 0;

let playerPoints = 0;
let computerPoints = 0;

let playerConfirmation = false; //player did not confirm their choice
let nextRound = false;

const winningCombos = ["21","32","13"];
const elements = ["Water", "Leaf", "Fire"];

const choices = document.querySelectorAll('.human-img');
const computerChoices = document.querySelectorAll('.cpu-img');
const button = document.querySelector('#confirm');
const message = document.querySelector('.message');

const playerScore = document.querySelector('#hScore');
const computerScore = document.querySelector('#cScore');

updateScore();
updateMessage("Choose an element");




button.addEventListener('click', moveOn);
choices.forEach((choice) =>{
    choice.addEventListener('click', select);
});



function moveOn(){
    if (playerConfirmation == true){
        nextRound = true;
    }
    
    if (playerSelection != 0 && playerConfirmation == false){
        playerConfirmation = true;
        computerChoice();
        decideWinner();
        if (playerPoints != 5 || computerPoints != 5){
            console.log(playerPoints, computerPoints);
            updateButton(1);
        }
        
    }

    
    if (playerConfirmation == true && nextRound == true){
        reset();

    }
}


function select(choice){
    playerSelection = choice.target.getAttribute('id');
    
    if (playerConfirmation == false){
        choices.forEach((choice) =>{
            
            let compareChoice = choice.getAttribute('id');
            if (compareChoice == playerSelection){
                choice.classList.add('picked');
                assignNumber(compareChoice);
            }
            else{
                choice.classList.remove('picked');
            }

        });
    }
}

function assignNumber(currentChoice){
    if (currentChoice == 'one'){
        playerSelection = 1;
    }
    else if(currentChoice == 'two'){
        playerSelection = 2;
    }
    else if(currentChoice == 'three'){
        playerSelection = 3
    }
    else{
        console.log("something went wrong")
    }

}


function computerChoice(){
    computerSelection = Math.floor(Math.random() * 3) + 1;
    if (computerSelection == 1){
        let onec = document.querySelector('#one-c');
        onec.classList.add('picked');
    }
    else if(computerSelection ==2){
        let twoc = document.querySelector('#two-c');
        twoc.classList.add('picked');
    }
    else if(computerSelection == 3){
        let threec = document.querySelector('#three-c');
        threec.classList.add('picked');
    }

    
}

function decideWinner(){
    let combo = playerSelection.toString() +  computerSelection.toString();
    let roundMessage;
    if (winningCombos.includes(combo) == true){
        console.log("Player wins");
        playerPoints++;
        console.log(playerPoints, computerPoints);
        updateScore();
        roundMessage = elements[playerSelection-1] + " beats " + elements[computerSelection-1]+". Point goes to you!"
        updateMessage(roundMessage);
    }
    else if(playerSelection == computerSelection){
        console.log("Tie");
        console.log(playerPoints, computerPoints);
        updateMessage("It's a tie. No points awarded this round.");
    }
    else{
        console.log("Computer wins");
        computerPoints++;
        console.log(playerPoints, computerPoints);
        updateScore();
        
        roundMessage = elements[computerSelection-1] + " beats " + elements[playerSelection-1]+". Point goes to CPU!"
        updateMessage(roundMessage);           
    }
}


function updateScore(){
    playerScore.removeChild(playerScore.firstElementChild);
    computerScore.removeChild(computerScore.firstElementChild);

    const currentPlayerScore = document.createElement('div');
    const currentComputerScore = document.createElement('div');

    currentPlayerScore.textContent =playerPoints.toString();
    currentComputerScore.textContent =computerPoints.toString();

    playerScore.appendChild(currentPlayerScore);
    computerScore.appendChild(currentComputerScore);
}

function updateButton(optionNo){
    button.removeChild(button.firstElementChild);
    const newButton = document.createElement('div');
    if (optionNo == 1){
        newButton.textContent = "Next Round";
    }
    else if (optionNo == 2){
        newButton.textContent = "NEW GAME";
    }
    else{
        newButton.textContent = "Confirm Choice";
    }
    button.appendChild(newButton);

}

function updateMessage(roundMessage){
    message.removeChild(message.firstElementChild);
    const newMessage = document.createElement('div');
    newMessage.textContent = roundMessage;
    message.appendChild(newMessage);

}

function reset(){
    if (playerPoints == 5 || computerPoints == 5){
        button.removeEventListener('click', moveOn);
        button.addEventListener('click', ()=>{
            location.reload();
        });
        choices.forEach((choice)=>{
            choice.removeEventListener('click', select);
        });
        if (playerPoints>computerPoints){
            updateMessage("PLAYER WINS. CLICK BUTTON TO RESTART");
        }
        else{
            updateMessage("CPU WINS. CLICK BUTTON TO RESTART");
        }
        updateButton(2);

    }
    else{
        playerSelection = 0;
        playerConfirmation = false;
        nextRound = false;
        
        updateButton(3);
        updateMessage("Choose an element");
        
        choices.forEach((choice)=>{
            choice.classList.remove('picked');
        });
        computerChoices.forEach((choice)=>{
            choice.classList.remove('picked');
        });
    }
}