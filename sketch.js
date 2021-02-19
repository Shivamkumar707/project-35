var balloon,bgImg,balloonImg,balloonImg2;
var database,position;

function preload() {
  bgImg = loadImage("background.png");
  balloonImg = loadImage("balloon.png");
  balloonImg2 = loadAnimation("balloon.png","balloon2.png","balloon3.png");

}

function setup() {
  database = firebase.database();
  createCanvas(1500,700);  

  balloon = createSprite(280, 450, 50, 50);
  balloon.addImage("balloon",balloonImg);
  balloon.scale=0.6;

  var balloonPosition = database.ref('Balloon/position');
  balloonPosition.on("value", readPosition, showError);

}

function draw() {
  background(bgImg);
  
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
    balloon.addAnimation("balloon",balloonImg2);

  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
    balloon.addAnimation("balloon",balloonImg2);

  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.addAnimation("balloon",balloonImg2);
    balloon.scale-=0.01;

  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    balloon.addAnimation("balloon",balloonImg2);
    balloon.scale+=0.01;

  }
   
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

  drawSprites();
}

function writePosition(x,y){
  database.ref('Balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

