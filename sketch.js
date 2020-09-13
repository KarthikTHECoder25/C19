var trex, trexV, ground, groundV, cloudV, CloudsGroup, ObstaclesGroup, o1,o2,o3,o4,o5,o6, count, PLAY, END, gameState, trexC, restart, gameOver, restart1, gameOver1, highScore



function preload(){
  trexV = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundV = loadImage("ground2.png");
  cloudV = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  trexC = loadImage("trex_collided.png");
  restart1 = loadImage("restart.png");
  gameOver1 = loadImage("gameOver.png");
}


function setup() {
  
  createCanvas(600, 200);
  
  trex = createSprite(50,170,10,10);
  trex.addAnimation("trexAnimation", trexV);
  trex.addAnimation("trexA2", trexC);
  trex.scale = 0.50;
  
  //set collision radius for the trex
  trex.setCollider("circle",0,0,30);
  
  //trex.debug = true
  
  ground = createSprite(50,180,10,10);
  ground.addImage(groundV);
  ground.x = ground.width/2;
  
  //move the ground
  ground.velocityX = -(6);
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
    //place gameOver and restart icon on the screen
  gameOver = createSprite(300,100);
  restart = createSprite(300,70);
  gameOver.addImage(gameOver1);
  gameOver.scale = 0.5;
  restart.addImage(restart1);
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
  //set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);
  
  //highscore
  highScore = 0;
  
  //score
  count = 0;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
}

function draw() {
  background("white");
  
  if(gameState === PLAY){
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 156){
      trex.velocityY = -12;
    } 

    //add gravity
    trex.velocityY = trex.velocityY + 0.8;

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    //scoring
    count = Math.round(count+getFrameRate()/63);

    spawnClouds();

    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
    
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velocity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trexA2", trexC);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    if(highScore < count){
      highScore = count
    }
  }
  
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
    //display score
  text("Score: "+ count, 500,25);
  
  if(highScore > 0){
  //display highscore
  text("HI: "+ highScore, 400,25);
  }
  
  //stop trex from falling down
  trex.collide(ground);
  
   //console.log(trex.y);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("trexAnimation", trexV);
  
  count = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(615,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudV);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 205;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(615,165,10,40);
    obstacle.velocityX = - (6);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
        case 1: obstacle.addImage(o1); break;
        case 2: obstacle.addImage(o2); break;
        case 3: obstacle.addImage(o3); break;
        case 4: obstacle.addImage(o4); break;
        case 5: obstacle.addImage(o5); break;
        case 6: obstacle.addImage(o6); break;
        default: break;
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 615/6;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}