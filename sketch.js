var PLAY = 1;
var END = 0;
var gameState = PLAY;
var flamingo, fImg;
//var FGimg, FgGroup;
var backP, backImg;
var rock, leopard, obstacleGroup;
var balloonGroup;
var rockImg, leopardImg;
var score = 0;
var restart, restartI, oops, oopsI;
var ground;

function preload(){
  fImg = loadImage("download.png");
  backImg = loadImage("jungle Img.jpg");
  rockImg = loadImage("rock.png");
  bombImg = loadImage("bomb.png");
  balloonImg = loadImage("balloon.png");
  //FGimg = loadImage("floatingG.png");
  restartI = loadImage("replayB.png");
  oopsI = loadImage("oops.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  //backP = createSprite(displayWidth-800,displayHeight-500);
  //backP.addImage("back", backImg);
  //backP.scale = 8;
  //backP.x = backP.width /2;
  //backP.velocityX = -2;
  //ground = createSprite(displayWidth-500,displayHeight-300,1000,10);
  //ground.shapeColor = "brown";

  //1280,100
  flamingo = createSprite(windowWidth/20,windowHeight/1,10,10);
  flamingo.addImage("fl", fImg);
  flamingo.scale = 1.5;

  //690
  restart = createSprite(windowWidth/2,windowHeight/1.2,10,10);
  restart.addImage("re", restartI);
  restart.scale = 0.3;
  restart.visible = false;

  oops = createSprite(windowWidth/2, windowHeight/4, 10, 10);
  oops.addImage("op", oopsI);
  oops.scale = 1.5;
  oops.visible = false;

  obstacleGroup = new Group();
  balloonGroup = new Group();
  //FgGroup = new Group();

  edges = createEdgeSprites();
}

function draw(){
  background(backImg);

  drawSprites();

  if(gameState === PLAY){

    //if(FgGroup.isTouching(flamingo)){
      //flamingo.velocityY = 0;
    //}

    flamingo.visible = true;

    //if(FgGroup.isTouching(flamingo)){
      //flamingo.collide(FgGroup);
    //}

    //backP.velocityX = -2;

    if(balloonGroup.isTouching(flamingo)){
      score = score + 1;
    }

    //if (backP.x < 200){
      //backP.x = backP.width/2;
    //}

    //232.2 
    if(keyDown('space') && flamingo.y >= windowHeight-72){
      flamingo.velocityY = -20;
    }
   
    flamingo.velocityY = flamingo.velocityY + 0.6;

    flamingo.collide(edges[3]);
    obstacleGroup.collide(edges[3]);

    if(balloonGroup.isTouching(flamingo)){
      balloonGroup.destroyEach();
    }

    textSize(40);
    fill("white");
    textStyle(BOLD);
    text("SCORE : " + score , windowWidth/1.3, windowHeight/9);

    if(obstacleGroup.isTouching(flamingo)){
      gameState = END;
    }
  }
  else if(gameState === END){

    flamingo.velocityY = 0;

    flamingo.visible = false;

    obstacleGroup.setLifetimeEach(0);
    balloonGroup.setLifetimeEach(0);
    //FgGroup.setLifetimeEach(0);

    obstacleGroup.setVelocityXEach(0);
    balloonGroup.setVelocityXEach(0);
    //FgGroup.setVelocityXEach(0);

    //backP.velocityX = 0;

    oops.visible = true;
    restart.visible = true;

    textSize(50);
    textStyle(BOLD);
    fill("yellow");
    text("Final Score : " + score, windowWidth/2.5,windowHeight/1.7);

    //console.log(gameState);
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  obstacle();
  balloons();
  //floatingGround();
//657,
  console.log(balloonGroup.y);
}


function reset(){
  gameState = PLAY;

  oops.visible = false;
  restart.visible = false;

  obstacleGroup.destroyEach();
  balloonGroup.destroyEach();
  //FgGroup.destroyEach();

  score = 0;
}

function obstacle(){

  //0.5 it came with the 6th balloon
  //1 it came with the 6th balloon
  //2 it came with the 6th balloon
  //World.frameCount % windowWidth/2 === 1
  if (World.frameCount % 300 === 0){
    var rand = Math.round(random(1,2));
    obstacles = createSprite(windowWidth/1,windowHeight/1.1,10,10);
        switch(rand){
            case 1: obstacles.addImage(rockImg);
            break;
            case 2: obstacles.addImage(bombImg);
            break;
            default: break;
        }
    obstacles.scale = 0.7;
    obstacles.velocityX = -5;
    
    obstacles.lifetime = windowWidth;
    
    obstacleGroup.add(obstacles);
  }
}

function balloons(){

    if (World.frameCount % 420 === 0) {
      var balloon = createSprite(windowWidth/1,windowHeight/1.1,10,10);
      balloon.y = random(237,240);
      balloon.addImage("balloonz", balloonImg);
      balloon.scale = 0.7;
      balloon.velocityX = -3;
      
      balloon.lifetime = windowWidth;
      
      balloon.depth = flamingo.depth;
      flamingo.depth = flamingo.depth + 1;
      
      balloonGroup.add(balloon);

    }
  }

//function floatingGround(){

  //if (World.frameCount % 250 === 0) {
    //var FG = createSprite(630,280,10,4);
    //FG.y = random(200,250);
    //FG.scale = random(0.2,0.6);
    //FG.addImage("FGz", FGimg);
    //FG.scale = 0.2;
    //FG.velocityX = -3;
    
    //FG.lifetime = 400;
    
    //FgGroup.add(FG);
  //}
//}
