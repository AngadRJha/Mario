//a note to the teacher(Jisha ma'am): press space key to jump 
//a race between you and time

var score = 0;

var song;

var PresetSong;

var restart, restartprint;

var gameoverSound;

var crashscore = 0;

var object;

var score1 = 0;

var thing;

var obs, obsprint;

var start, startprint;

var gamestate = "preset";

var boy, boyprint;

var cloud, cloudprint;

var backdrop, backdropprint;

var invisibleground;

function preload() {

  restartprint =
    loadImage("unnamed.png")

  boyprint =
  loadImage("Triangular Doc.png");

  backdropprint =
    loadImage("rVHPTQ.png");

  cloudprint =
    loadImage("images-2.png");

  startprint =
    loadImage("Untitled-2.png");

  obsprint =
    loadImage("obstacle.png")
  
  song=
    loadSound("01 - Super Mario Bros.mp3");
  gameoverSound=
    loadSound("16 - Game Over.mp3");
  PresetSong=
    loadSound("03 - Hurry - Super Mario Bros.mp3")
}

function setup() {

  createCanvas(700, 225)
  PresetSong.loop();
  backdrop = createSprite(200, 0, 400, 200);
  backdrop.x = backdrop.width / 2;
  backdrop.y = 100;
  backdrop.addImage(backdropprint);

  backdrop.scale = 2;
  backdrop.y = -115;

  boy = createSprite(75, 180, 20, 20);
  boy.addImage(boyprint);
  boy.scale = 0.34;
  //boy.debug=true
  boy.setCollider("rectangle", 0, 0, 200, 205);

  invisibleground = createSprite(100, 220, 202, 20)
  invisibleground.visible = false;

  start = createSprite(315, 50, 20, 20);
  start.addImage(startprint);
  start.scale = 0.5;

  object = createSprite(200, 5, 20, 20)

  restart = createSprite(350, 85, 20, 20);
  restart.addImage(restartprint);

  obstaclesGroup = createGroup();

  thingsGroup = createGroup();
 
}

function draw() {
  background(color(0, 255, 250));
  
  text(start, 100, 300);
  restart.visible = false;
   
  
  if (gamestate == "preset") {

    object.velocityX = -20
    object.visible = false;
    backdrop.velocityX = 0;
    boy.x = 70;
    start.visible = true;

    if (mouseIsPressed) {
      start.visible = false;
      gamestate = "start"
      PresetSong.stop();
      song.loop();
      gameoverSound.stop();
    }
    if (object.x < 0) {
      object.x = 200;
    }
  }

  if (backdrop.x < 0) {
    backdrop.x = backdrop.width / 2
  }

  if (gamestate == "start") {

   

    if (score1>0) {
      backdrop.velocityX = -(10 + score1/10);
      console.log(backdrop.velocityX)
    }
    
    if (object.x < 0) {
      object.x = 200;
      score1 = score1 + 1;
    }
    if (boy.y >= 170) {
      //console.log(boy.y);
      if (keyDown("space")) {
        boy.velocityY = -15
      }
    }
    obstacles();
    if (boy.isTouching(obstaclesGroup)) {
      gameoverSound.play();
      boy.visible = true;
      gamestate = "end";
    }
  }
  if (gamestate == "end") {
    song.stop();
    
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    backdrop.velocityX = 0;
    object.velocityX = 0;
    object.x = 200;
    restart.visible = true;
    if (mousePressedOver(restart)) {
      if (score1 > crashscore) {
        crashscore = score1;
      }
      obstaclesGroup.setLifetimeEach(0);
      gamestate = "preset";
      score1 = 0;

    }
  }


  boy.velocityY = boy.velocityY + 0.9
  boy.collide(invisibleground)
  boy.collide(obstaclesGroup);


  spawnClouds();
  text("score: " + score1, 10, 10)
  text("crash score: " + crashscore, 10, 25);
  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 50 === 0) {
    cloud = createSprite(780, 100, 40, 10);
    cloud.y = Math.round(random(80, 150));
    cloud.addImage(cloudprint);
    cloud.scale = 0.9;
    cloud.velocityX = -3;
    cloud.lifetime = 300;
    cloud.depth = boy.depth;
    boy.depth = boy.depth + 1
    start.depth = cloud.depth + 1;

  }
}

function obstacles() {
  if (frameCount % 60 === 0) {
    obs = createSprite(800, 150, 20, 20);
    obs.addImage(obsprint);
    obs.scale = 0.3;
    obs.collide(boy);
    obs.velocityX = -(10 + score1/10);
    obs.lifetime = 100
    obs.depth = boy.depth - 1;
    obstaclesGroup.add(obs);
    //obs.debug=true;
    console.log("Obs: "+obs.velocityX);
    obs.setCollider("rectangle", 0, 60, 300, 200)
  }
  //console.log(score1);
}