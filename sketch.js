var knife,knifeImage;
var sword,swordImage;

var PLAY = 1;
var END = 2;
var gameState = 1;

var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup;
var monster,monsterImage,enemyGroup;

var score,gameoverImage;

var cuttingSound,gameoverSound;

function preload() {
  //knifeImage = loadAnimation("knifeSwooshSound.mp3");
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  
  gameoverImage = loadImage("gameover.png")
  
  cuttingSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(400,400);
  //knife = createSprite(200,200);
  //knife.addAnimation("Knife", knifeImage);
  
  sword = createSprite(40,200,20,20);
  sword.addImage("Sword", swordImage);
  sword.scale = 0.7;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
}

function draw(){
  background("white");
  text("Score: " +score,20,350);
  fruits();
  Enemy();
  
  
  if (gameState===PLAY) {
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  }
  
  
  
  
  if (fruitGroup.isTouching(sword)) {
    fruitGroup.destroyEach();
    
    cuttingSound.play();
    score=score+2;
  }
  
  else{ if (enemyGroup.isTouching(sword)) {
    gameState = END;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
    sword.addImage("gameover",gameoverImage);
    gameoverSound.play();
    sword.x = 200;
    sword.y = 200;
    
  }
      }
  /*
  if (gameState===END) {
    sword.addImage("gameover",gameoverImage);
    sword.x = 200;
    sword.y = 200;
  }
  */
  
  
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400.200,20,20);
    fruit.scale=0.2
    
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    
    if (position===1) {
      fruit.x = 400;
      fruit.velocityX=-(7+(score/4));
    }
    else {
      if (position===2) {
        fruit.x = 0;
        fruit.velocityX= (7+(score/4));
      }
    }
    
    r=Math.round(random(1,4));
    if (r ==1) {
      fruit.addImage(fruit1);
      fruit.scale=0.2;
    } else if (r==2) {
      fruit.addImage(fruit2);
      fruit.scale=0.2;
    }else if (r==3) {
      fruit.addImage(fruit3);
      fruit.scale=0.2;
    }else {
      fruit.addImage(fruit4);
      fruit.scale=0.2;
    }
    
    fruit.y=Math.round(random(50,340));
    
    
    
    
    fruit.setlifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}
