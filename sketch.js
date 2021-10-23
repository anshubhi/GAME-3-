
var fish,fishI,backI,ground;
var bg , playButton, playButtonImage;
var foeI ,  sharkI, seaH, fishGR
var obstacleG;
var score;
var gameState = "start";
var coinI, coin;
var heart1,heart2,heart3;
var heartI;
var coinG;
var restart , restartImg;

function preload()
{
fishI = loadImage("fish.png");
backI = loadImage("sea.jpg");
foeI = loadImage("foe.png");
sharkI = loadImage("shark.png");
seaH = loadImage("seaH.png")
fishGR = loadImage("fishG.png")
heartI = loadImage("heartI.png");
playButtonImage = loadImage("play button.png");
coinI = loadImage("coin sprite.png");
restartImg = loadImage("restart.png");

	
}

function setup() {
	createCanvas(1000,1000 );


	

	//Create the Bodies Here.


	bg = createSprite(500,500,1000,1000)
bg.addImage(backI,"bac")
bg.scale = 3

playButton = createSprite(500, 500, 20, 20);
  playButton.addImage(playButtonImage,"playB");
  playButton.scale = 0.3;

  restart = createSprite(500,500,20,20);
  restart.addImage(restartImg,"re");
  restart.visible = false;
  restart.scale = 0.3;

fish = createSprite(200,800,20,20);
fish.addImage(fishI,"fiI");
fish.scale = 0.1;
fish.visible = false


ground = createSprite(500,950,2000,20)
ground.visible = false;

obstacleG = new Group();
coinG = new Group();
	score = 0;
  
}


function draw() {
 
  
  background("black");
  

  if(gameState === "start"){
    start();

    bg.velocityX = -6;

    if (bg.x < 100){
      bg.x = bg.width/2
      
      }

    if (mousePressedOver(playButton)) {
      gameState = "play";
    }

  }


  if(gameState === "play"){
    play();
    
    bg.velocityX = -6;

    if (bg.x < 100){
      bg.x = bg.width/2;
      
      }

      if(keyWentDown ('UP')&& fish.y>400){
        fish.y = fish.y-20
      }
      
      if(keyWentDown ('DOWN')&& fish.y<900){
      fish.y = fish.y+10;
    }

    if(fish.isTouching(coinG)){
      score = score + 2;
    }
spawncoin();
      spawnObstacles()

      if(fish.isTouching(obstacleG)){
        gameState = "end";
      }

  }

  if(gameState === "end"){

   background.velocityX = 0;
   bg.velocityX = -6;

   if (bg.x < 100){
     bg.x = 500
     
     }
restart.visible = true;
   coinG.setVelocityXEach(0)
   obstacleG.setVelocityXEach(0)
if(mousePressedOver(restart)){
  gameState ="start";
}
  }
 

  



  
  drawSprites();

  textSize(20)
  stroke("red")
  fill("black")
  text("SCORE: "+score,800,100)
 
}




function spawnObstacles(){
  if (frameCount % 60 === 0){

    var xpos,ypos;
    ypos=Math.round(random(300,800));
    var obstacle = createSprite(1000,ypos,10,40);
    obstacle.velocityX = -6;
    
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(seaH);
               break;
       case 2: obstacle.addImage(foeI);
               break;
       case 3: obstacle.addImage(fishGR);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.1;
     obstacle.lifetime = 130;
     obstacleG.add(obstacle)
    
    
  }
}

function start(){
playButton.visible = true;
restart.visible = false;
}

function play(){
  playButton.visible = false;
  fish.visible = true;
  restart.visible = false;
}


function spawncoin(){
  if (frameCount % 100 === 0) {
    coin = createSprite(1000, Math.round(random(300, fish.y)), 20, 20);
    coin.addImage(coinI,"co");
    coin.velocityX = -6;
    coin.scale = 0.2;
    coin.lifetime = 120;
    coin.debug = true;
    
    coinG.add(coin);
  }  
}
