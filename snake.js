const game_board_border = 'red';
const game_bckground = 'white';
const snake_color = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    {x:200, y:200},
    {x:190, y:200},
    {x:180, y:200},
    {x:170, y:200},
    {x:160, y:200}
];

let dx=10;
let dy=0;
let score=0;
let food_x, food_y;
let changing_direction = false;

var snake_game = document.getElementById('snakegame');
var snake_game_ctx = snake_game.getContext('2d');

main();

gen_food();

document.addEventListener("keydown", change_direction);

function main(){

    if(game_over()){
        alert("GAME OVER");
        return;
    }
    changing_direction = false;
    setTimeout(function onTick(){
        clearCanvas();
        drawFood();
        move_snake();
        drawSnake();

        main();
    },100)
}

function restart_game(){
    dx=10;
    dy=0;
    clearCanvas();
    drawFood();
    move_snake();
    drawSnake();
    snake = [
        {x:200, y:200},
        {x:190, y:200},
        {x:180, y:200},
        {x:170, y:200},
        {x:160, y:200}
    ];
    main();
}

function clearCanvas(){
    snake_game_ctx.fillStyle = game_bckground;
    snake_game_ctx.strokeStyle = game_board_border;
    snake_game_ctx.fillRect(0,0,400, 400);
    snake_game_ctx.strokeRect(0,0,400,400);
}

function drawSnake(){
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart){
    snake_game_ctx.fillStyle = snake_color;
    snake_game_ctx.strokeStyle = snake_border;
    snake_game_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snake_game_ctx.strokeRect(snakePart.x, snakePart.y, 10,10);
}

function move_snake(){
    const head = {x:snake[0].x+dx, y:snake[0].y+dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if(has_eaten_food){
        score = score+10;
        document.getElementById('score').innerHTML=score;
        gen_food();
    }else{
        snake.pop();
    }
}

// vertical movement
//{x: snake[0].x+dx, y: snake[0].y}+dy;

function change_direction(event){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changing_direction) return;
      changing_direction = true;
    const keyPressed = event.keyCode;
    const goUp = dy === -10;
    const goDown = dy === 10;
    const goLeft = dx === -10;
    const goRight = dx === 10;

    if(keyPressed === LEFT_KEY && !goRight){
        dx = -10;
        dy = 0;
    } else if(keyPressed === UP_KEY && !goDown){
        dx = 0;
        dy = -10;
    } else if(keyPressed === RIGHT_KEY && !goLeft){
        dx = 10;
        dy = 0;
    }else if(keyPressed === DOWN_KEY && !goUp){
        dx = 0;
        dy = 10;
    }

   
}

function game_over(){
    for(let i=4;i<snake.length;i++){
        const isCollided = snake[i].x === snake[0].x && snake[i].y===snake[0].y;
        if(isCollided){
            return true;
        }
    }

    const hitLeftWall = snake[0].x<0;
    const hitRightWall = snake[0].x > 390;
    const hitTopWall = snake[0].y <0;
    const hitBottonWall = snake[0].y > 390;
    return hitBottonWall || hitTopWall || hitLeftWall || hitRightWall;
}

function random_food(min, max){
    return Math.round((Math.random() * (max-min)+min) / 10) * 10;
}

function gen_food(){
    food_x = random_food(0, 390);
    food_y = random_food(0, 390);

    snake.forEach(function food_eaten(part){
        const has_eaten = part.x == food_x && part.y == food_y;
        if(has_eaten) gen_food();
    });
}

function drawFood()
{
    snake_game_ctx.fillStyle = 'lightgreen';
    snake_game_ctx.strokestyle = 'darkgreen';
    snake_game_ctx.fillRect(food_x, food_y, 10, 10);
    snake_game_ctx.strokeRect(food_x, food_y, 10, 10);
}