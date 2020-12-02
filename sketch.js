var PLAY=1
var END=0
var gameState=PLAY
var monkey , monkey_running
var Banana ,bananaImage, Obstacle, obstacleImage
var BananaGroup, ObstacleGroup
var score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300)
  
  monkey=createSprite(50,260,1,1)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
  
  ground=createSprite(300,290,1200,20)
  
  BananaGroup= new Group()
  ObstacleGroup= new Group()
  
  monkey.setCollider("rectangle",0,0)
 
}


function draw() {
  background('white')
  
  ground.velocityX=-3
  
  if(ground.x<0){
    ground.x=ground.width/2
  } 
  
  if (gameState===PLAY){

  if(keyDown('space')){
    monkey.velocityY=-6;
  }
  
  monkey.velocityY=monkey.velocityY+0.5
  
  spawnBanana()
  spawnObstacles()
    text("score:"+score,20,10)
  
  if(BananaGroup.isTouching(monkey)){
    BananaGroup.destroyEach()
    score=score+1
  }
    
  if(ObstacleGroup.isTouching(monkey)){
    gameState=END
  }
    
  }
  
  else if (gameState===END) {
    Obstacle.velocityX=0
    monkey.velocityY=0
    ObstacleGroup.setLifetimeEach(-1)
    BananaGroup.setLifetimeEach(-1)  
    ObstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    stroke('black')
    textSize(20)
    fill('red')
    textSize(40)
    text("Press R to restart",200,100)
    if(keyDown('r')){
      reset()
    }   
  }

  monkey.collide(ground)
  drawSprites()
}

function reset(){
  gameState = PLAY; 
  ObstacleGroup.destroyEach();
  BananaGroup.destroyEach();
}

function spawnBanana(){
  if(frameCount%150===0){
    Banana=createSprite(570,30,1,1)
    Banana.addImage(bananaImage)
    Banana.velocityX=-6
    Banana.scale=0.1
    Banana.y=Math.round(random(120,200))
    Banana.lifetime=100
    BananaGroup.add(Banana)
  }
}

function spawnObstacles(){
  if(frameCount%80===0){
    Obstacle=createSprite(570,260,1,1)
    Obstacle.addImage(obstacleImage)
    Obstacle.velocityX=-6
    Obstacle.scale=0.1
    Obstacle.lifetime=100
    ObstacleGroup.add(Obstacle)
  }
}






