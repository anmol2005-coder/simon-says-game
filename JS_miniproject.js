let gameSeq =  [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let highestScore = 0;
let h3 = document.querySelector("h3");
h3.innerHTML = `<i>Highest Score : ${highestScore}</i>`;

let h2 = document.querySelector("h2");


document.body.addEventListener("click",startGame);   //mobile
document.addEventListener("keypress",startGame);  //laptop

function startGame(){
      if(started == false){
        console.log("game is started");
        started = true;
        levelUp();
    }
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}



function levelUp(){ 
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    //choose random button

    let randIndx = Math.floor(Math.random() * 4);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randIndx);
    // console.log(randColor);
    // console.log(randBtn);
    
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}



function checkAns(idx){ 
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(level > highestScore){
            highestScore = level;
            h3.innerHTML = `<i>Highest Score : ${highestScore}</i>`;
        }
        h2.innerHTML = `game over! Your score was <b>${level}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        reset();
    }
}


function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

