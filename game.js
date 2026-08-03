// =========================
// Snake Deluxe v1.0
// Part 1 - Engine
// =========================

// Canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Grid
const CELL_SIZE = 20;
const GRID_SIZE = 30;

// Game
let score = 0;
let highScore = Number(localStorage.getItem("snakeHighScore")) || 0;

let paused = false;
let gameOver = false;

let level = 1;

// Snake
let snake = [
    {x:15, y:15},
    {x:14, y:15},
    {x:13, y:15}
];

let direction = "RIGHT";
let nextDirection = "RIGHT";

// Apple
let apple = {
    x:20,
    y:10
};

// Timer
let lastTime = 0;
let speed = 8; // frame/sec

//--------------------------------------------------

function randomApple(){

    while(true){

        let x = Math.floor(Math.random()*GRID_SIZE);
        let y = Math.floor(Math.random()*GRID_SIZE);

        let ok = true;

        for(let s of snake){

            if(s.x===x && s.y===y){

                ok=false;
                break;

            }

        }

        if(ok){

            apple={x,y};
            return;

        }

    }

}

//--------------------------------------------------

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowUp" && direction!=="DOWN")
        nextDirection="UP";

    if(e.key==="ArrowDown" && direction!=="UP")
        nextDirection="DOWN";

    if(e.key==="ArrowLeft" && direction!=="RIGHT")
        nextDirection="LEFT";

    if(e.key==="ArrowRight" && direction!=="LEFT")
        nextDirection="RIGHT";

});

//--------------------------------------------------

function update(){

    direction=nextDirection;

    let head={...snake[0]};

    switch(direction){

        case "UP":
            head.y--;
            break;

        case "DOWN":
            head.y++;
            break;

        case "LEFT":
            head.x--;
            break;

        case "RIGHT":
            head.x++;
            break;

    }

    snake.unshift(head);

    // Apple

    if(head.x===apple.x && head.y===apple.y){

        score++;

        document.getElementById("score").textContent =
        "Score: "+score;

        randomApple();

    }else{

        snake.pop();

    }

}
