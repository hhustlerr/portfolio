let boxes = document.querySelectorAll(".btn");
let restbtn = document.querySelector(".reset");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector(".reset");

let turn0 = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

for(let i=0; i<boxes.length ; i++){
    boxes[i].addEventListener("click", () => {
        console.log("box was clicked");
        if(turn0){
            boxes[i].innerText = "X";
            turn0 = false;
        }else{
            boxes[i].innerText = "O";
            turn0 = true;
        }
        boxes[i].disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            drawGame();
        }
    });
}

const disable = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enable = () => {
    for(let box of boxes){
        box.disabled = false;
    }
}

const showWinner = (winner) => {
    msg.innerHTML=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disable();
}
    
const checkWinner = () => {
    for(pattern of winPatterns){
        let pos0val = boxes[pattern[0]].innerText;
        let pos1val = boxes[pattern[1]].innerText;
        let pos2val = boxes[pattern[2]].innerText;


        // first we'll check empty condition
        if(pos0val != "" && pos1val != "" && pos2val != ""){
            if(pos0val === pos1val && pos1val === pos2val){
                showWinner(pos0val);
            }
        }
    };
};
const resetGame = () => {
    for (let box of boxes) {
        box.innerText = "";
        box.style.pointerEvents = 'auto';
    }
    // msg.innerHTML = "WINNER";
    msgContainer.classList.add("hide");
    msg.innerHTML="";
    enable();
    count = 0;
    // turn0 = true;
}

// draw game
const drawGame =() => {
    msg.innerHTML = "Game was a draw";
    disable();
    msgContainer.classList.remove("hide");
}

// New game
const newGame = () => {
    resetGame();
    msgContainer.classList.add("hide");
};

// Adding event listeners to reset buttons
let resetButtons = document.querySelectorAll(".reset");
resetButtons[0].addEventListener("click", resetGame);
resetButtons[1].addEventListener("click", newGame);