// DRAW CANVAS
const canvas=document.getElementById("myGame");
const context=canvas.getContext("2d");

// DRAW RECTANGLE FUNCTION
function drawrectangle(x,y,w,h,color){
    context.fillStyle=color;// to specify colour
    context.fillRect(x,y,w,h);// to specify coordinates and dimensions 
}



/* computer paddle*/
const com={
    x: canvas.width/2 - 50/2,
    y:10,
    width:50,
    height:10,
    color:"white",
    score:0,

}




/* player paddle*/
const user={
    x: canvas.width/2 - 50/2,
    y:canvas.height-20,
    width:50,
    height:10,
    color:"yellow",
    score:0,

}



// CENTRE LINE
function centreline(){

    context.beginPath();
    context.setLineDash([10]);
    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.strokeStyle="white";
    context.stroke();
}


// CREATE BALL

function drawcirle(x,y,r,color){
    context.beginPath()
    context.fillStyle=color
    context.arc(x,y,r,0,Math.PI*2,false)

    context.closePath()
    context.fill()

    
}

const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    color:"red",
    radius:10,
    speed:1,
    velocityX:5,
    velocityY:5,
}



// SCORES
function drawtext(text,x,y,color){
    context.fillStyle=color
    context.font="32px josefin sans"
    context.fillText(text,x,y)
}




// CREATING RENDER FUNCTION
function render(){
    // MAKE CANVAS
    drawrectangle(0,0,400,600,"black");

    // computer paadle
    drawrectangle(com.x,com.y,com.width,com.height,com.color);

    // player paddle
    drawrectangle(user.x,user.y,user.width,user.height,user.color);

    // centre line
    centreline();

    // create ball
    drawcirle(ball.x,ball.y,ball.radius,ball.color);

    // create ball
    drawtext(com.score,20,canvas.height/2 -30,"white") // COMP score

    drawtext(user.score,20,canvas.height/2 +50,"white") //USER SCORE
}

// collision detector 
// b-ball
// p- peddle of either player or computer depend upong Y axis of ball
function coolision(b,p)
{
    b.top=b.y-b.radius;
    b.bottom=b.y+b.radius;
    b.left=b.x-b.radius;
    b.right=b.x+b.radius;

    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+p.width;

    return p.right>b.left && p.left<b.right && b.bottom>p.top && b.top<p.bottom;


}


// control user paddle
canvas.addEventListener("mousemove",movepeddle);
function movepeddle(e){
    let rect=canvas.getBoundingClientRect();
    user.x=e.clientX - rect.left - user.width/2;
}

// RESET BALL
function resetball(){
    ball.x=canvas.width/2;
    ball.y=canvas.height/2;

    ball.speed=1;

    ball.velocityY=-ball.velocityY;
}

function gameover(){
    // HIDE CANVAS
    canvas.style.display="none";
    const can=document.getElementById("can");
    can.style.display="none";


    // GAME OVER
    const result=document.getElementById("result");
    
    result.style.display="block";


}

// UPDATE 
function update(){
    ball.x+=ball.velocityX * ball.speed ;
    ball.y+=ball.velocityY * ball.speed;

    // computer paddle
    let computerlevel=0.1;
    com.x+= (ball.x -( com.x + com.width/2 ) )+computerlevel;
    if(ball.speed>2){
        com.x+=ball.x+10;
    }

    // reflect
    if(ball.x+ball.radius>canvas.width || ball.x-ball.radius<0){
        ball.velocityX=-ball.velocityX;
    }

    // collision

    let p=(ball.y<canvas.height/2) ? com : user ; // checking for paddle on basis of postion of ball w.r.t canvas height

    if(coolision(ball,p)){
        ball.velocityY=-ball.velocityY;
        ball.speed+=0.1;
    }

    // points 
    if(ball.y-ball.radius<0){
        user.score++
        resetball()
    }
    else if(ball.y + ball.radius> canvas.height){
        com.score++
        resetball()
    }

    // GAME OVER

    if(user.score>=4 || com.score>=4){
        gameover();
        clearInterval(loop);
        
    }

}

// start the game
function start(){
    update();
    render();
}

//loop
const loop=setInterval(start,1000/50);


