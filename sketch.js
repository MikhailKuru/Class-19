var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup, invisclimber, invisclimberGroup;
var ghost, ghostImg;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {

  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;

  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.5

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisclimberGroup = new Group()
  invisclimberGroup = new Group()

}

 

function draw() {
  background(200);

  ghost.velocityY = 10

  if(keyDown(LEFT_ARROW)){
    ghost.x -= 5
  }

  if(keyDown(RIGHT_ARROW)){
    ghost.x += 5
  }

  if(keyDown('SPACE')){
    ghost.velocityY = -20
  }

  if(invisclimberGroup.isTouching(ghost)||ghost.y>550||ghost.y<50){
    gameState = 'end'
  }

  if(tower.y > 400){
      tower.y = 300
    }
  spawnDoors()
  drawSprites();

  if(gameState == 'end'){
    ghost.destroy()
    textSize(50)
    textFont('black')
    text('You Lost',200,300)
  }

}

function spawnDoors(){
  
  if(frameCount%180 == 0){
  door = createSprite(Math.round(random(100,500)),-100)
  doorsGroup.add(door)
  door.addImage("door",doorImg)
  door.velocityY = 3
  ghost.depth = door.depth
  // climber.depth = ghost.depth
  ghost.depth += 1

  climber = createSprite(door.x,door.y+70)
  climbersGroup.add(door)
  climber.addImage("climber",climberImg)
  climber.velocityY = 3

  invisclimber = createSprite(climber.x,climber.y+10,climber.width,3)
  invisclimberGroup.add(invisclimber)
  invisclimber.debug = true
  invisclimber.velocityY = 3 
  }

}