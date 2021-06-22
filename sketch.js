
var monkey,monkey_run,monkey_stop;
  var banana ,banana_img;
  var obstacle,obstacle_img;
  var orange, orange_img;



var foodGroup,obsGroup,orangeGroup;


var survivalTime,score,chances;


var START=1;
var PLAY=2;
var END=0;
var gameState=START;


function preload()
{
  
  monkey_run =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  

  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("obstacle.png");
 
  


}



function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
 
  monkey=createSprite(60,height-75,10,10);    
  monkey.addAnimation("run",monkey_run);

  monkey.scale=0.110;

  monkey.setCollider("rectangle",0,0,550,340);
  

  ground=createSprite(width/2,height-42,1200,8);
 
  

  foodGroup=new Group();
  obsGroup=new Group();
  orangeGroup=new Group();
  
  
  survivalTime=10;
  
  
  score=0;
  

  chances=3;
  
  
  text("game over!!")
  gameOver=createSprite(250,250,10,10)
 
  gameOver.scale=1.5;
  
}


function draw()
{
  //To assign the background
  background("white");
  
  if(gameState===START)
  {
 
   gameOver.visible=false;
   
  
   monkey.visible=false;
   ground.visible=false;

  
   if(keyDown("space"))
   {
     gameState=PLAY;
   }
   
  }
  else if(gameState===PLAY)
  {
    
    monkey.visible=false;
    ground.visible=false;
    ground.visible=true;
    monkey.visible=true;
    
    //To increase the ground speed with increasement in score
    ground.velocityX=-(4+score/10);
    
    
    //To make the monkey jump to surmount obstacles
    if(keyDown("space")&&monkey.y>320)
    { 
      //To assign upward velocity to monkey
      monkey.velocityY=-11;
   
    }
    
    //To make monkey long jump to collect oranges
    else if(keyDown("UP_ARROW")&&monkey.y>320)
    {
      //To make monkey move up
      monkey.velocityY=-16.5;
      survivalTime=survivalTime-1;
      
    } 
    
    //To add gravity 
    monkey.velocityY=monkey.velocityY+0.5;
    
    //To increase the score when monkey touches banana
    if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score=score+2;
      survivalTime=survivalTime+5;
    }
    
    //To add bonus to score when monkey touches oranges
    if(monkey.isTouching(orangeGroup))
    {
      orangeGroup.destroyEach();
      score=score+5;
      survivalTime=survivalTime+10;
    } 
    
    
    //To decrease survival time with frame rate
    if(frameCount%100===0)
    {
      survivalTime=survivalTime-1;
    }
    
    //To detect and decrease the chanes when monkey touches any       obstacles
    if(monkey.isTouching(obsGroup))
    {
      chances=chances-1;
      obsGroup.destroyEach();
    }
    
    //To play a beep sound in multiple of 20 i.e.20,40,60,80
    if(score>0&&score%20===0)
    {
      //Adding beep sound 
      checkPointSound.play();
    }
    
    //To call other functions in draw function for execution
    obstacles();
    food();
    bonusFood();
  }
  else if(gameState===END)
  {
    //To make restart & game Over invisible
    gameOver.visible=true;
    restart.visible=true;
    
    //Destroying objects and setting up their velocity 0 when the     game ends
    ground.velocityX=0
    foodGroup.setVelocityEach(0);
    foodGroup.destroyEach();
    orangeGroup.setVelocityEach(0);
    orangeGroup.destroyEach();
    obsGroup.setVelocityEach(0);
    obsGroup.destroyEach();
  }
  
  if(ground.x<0)
  {
    //To give infinite scrolling effect to ground
    ground.x=ground.width/2;
  }

  //To make monkey collide with the ground
  monkey.collide(ground);
  
  //End state condition
  if(chances===0||survivalTime===0)
  {
    gameState=END;
  }
  
  
  
  //To draw the sprites
  drawSprites();
  
  //Displaying scoring & losing system
  fill("black");
  textSize(18);
  text("Score Board: "+score,20,35);
  text("Survival Time: "+survivalTime,450,35);
  text("Chances: "+chances,250,35);
  
  
}


function obstacles()
{
  //To make obstacles appear at interval of 130 frames
  if(frameCount%170===0)
  {
  //To create obstacle sprite
  obstacle=createSprite(width,height-70,10,10);
  //To add image to banana
  obstacle.addImage(obstacle_img);
  //Scaling to adjust banana
  obstacle.scale=0.15;
  //To assign velocity to banana
  obstacle.velocityX=-(4+score/15);
  //To assign lifetime to banana to avoid memory leaks
  obstacle.lifetime=width/obstacle.velocity;
  //Adding obstacles to obsgroup
  obsGroup.add(obstacle);
  }
}

function food()
{
  //To make banana appear at interval of 150 frames
  if(frameCount%150===0)
  {
    //To create banana sprite
    banana=createSprite(600,Math.round(random(120,270)),10,10);
    //To add image to banana
    banana.addImage(banana_img);
    //To assign velocity to banana
    banana.velocityX=-(3.5+score/10);
    //Scaling to adjust image
    banana.scale=0.1;
    //To assign lifetime to banana
    banana.lifetime=width/banana.velocity;
    //Add banana to foodgroup
    foodGroup.add(banana);
  }
  
}

function bonusFood()
{}
  
  
function reset()
{
  //Initial 
  gameState=PLAY;
  score=0;
  chances=3;
  survivalTime=10;
  
}

