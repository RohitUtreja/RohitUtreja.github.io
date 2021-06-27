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
        alert("GAME OVER!!!   Your Score: "+score);
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
        document.getElementById('score').innerHTML="Your Score:"+score;
        gen_food();
    }else{
        snake.pop();
    }
}

// vertical movement
//{x: snake[0].x+dx, y: snake[0].y}+dy;

function changeArrowDirection(parameter){

    if (changing_direction) return;
      changing_direction = true;
    const goUp = dy === -10;
    const goDown = dy === 10;
    const goLeft = dx === -10;
    const goRight = dx === 10;
    if(parameter === 'LEFT'  && !goRight){
        dx = -10;
        dy = 0;
    } else if(parameter === 'UP' && !goDown){
        dx = 0;
        dy = -10;
    } else if(parameter === 'RIGHT' && !goLeft){
        dx = 10;
        dy = 0;
    }else if(parameter === 'DOWN' && !goUp){
        dx = 0;
        dy = 10;
    }
}
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

window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
