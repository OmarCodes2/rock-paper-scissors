let playerSelection; 
let computerSelection;

let playerWin;
let winnerMessage;

let playerCount = 0;
let computerCount = 0;

const choices = ["Rock", "Paper", "Scissors"];
//                 1        2        3

function roundMessage(){
    console.log("You chose " + choices[parseInt(playerSelection)-1] + " and the Computer chose " + choices[computerSelection-1] + ". " + winnerMessage);
}

while(true){

    playerSelection = prompt("Please choose a number from 1-3.");
    computerSelection =  Math.floor(Math.random() * 3) + 1;

    if (parseInt(playerSelection) == 1 && computerSelection == 3 ){
        playerWin = true;
        winnerMessage = "You win!";
        roundMessage;
        playerCount++;
    } else if (parseInt(playerSelection) == 3 && computerSelection == 1){
        playerWin = false;
        winnerMessage = "Computer wins!";
        roundMessage();
        computerCount++;
    } else if (parseInt(playerSelection) > computerSelection){
        playerWin = true;
        winnerMessage = "You win!";
        roundMessage();
        playerCount++;
    } else if (parseInt(playerSelection) == computerSelection){
        playerWin = false;
        winnerMessage = "It's a tie!";
        roundMessage();
    } else{
        playerWin = false;
        winnerMessage = "Computer wins!";
        roundMessage();
        computerCount++;
    }
    if (computerCount == 5 || playerCount == 5 ){
        console.log(computerCount + " and " + playerCount);
        break;
    }
}

if(playerWin == true){
    console.log("Player takes all!")
} else{
    console.log("Computer takes all!")
}
