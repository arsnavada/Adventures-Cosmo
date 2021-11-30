var player,plrupanime, plrdownanime, misslegroup, missleanime, missle, edges, enemy1group, enemy2group, enemy3group;
var enemy4group, enemy5group, eny1, eny2, eny3, eny4, eny5, enyimg, bg, plrlife="100", plrdedanime, end, endimg;
var score=5,laser,level2,level2Img,homeImg,home;

function preload() {
  plrgtanime=loadAnimation("assets/plright.gif");
  missleanime=loadAnimation("assets/missile.gif");
  bg=loadImage("assets/NQHESK.jpg"); 
  plrdedanime=loadImage("assets/plrded2.png");  
  endimg=loadImage("assets/finish .png");     
  enyimg=loadImage("assets/enemy.png");    
  laser=loadSound("assets/laser.mp4");   
  level2Img=loadImage("assets/level2.png");    
  homeImg=loadImage("assets/home.png")
                                                
}
function setup() {
    createCanvas(windowWidth,windowHeight);
    player=createSprite(150,height/2,50,50);
    player.addAnimation("plr",plrgtanime);

    level2 = createSprite(650,140);
    level2.addImage(level2Img);
    level2.scale = 0.175;

    home =createSprite(player.x,player.y-300);
    home.addImage(homeImg)
    home.scale = 0.4;

    // player.debug=true;
    player.scale=1.3;
    player.setCollider("rectangle",0,12,150,120);
    misslegroup=new Group();    
    
    enemy1group=new Group();
    enemy2group=new Group();
    enemy3group=new Group();
    enemy4group=new Group();

    var reload=createButton('Refresh Game');
    reload.position(50,40);
    reload.style("background","transparent")
    reload.style("border","transparent")
     reload.style("color","transparent")
    reload.mousePressed(()=>{
      location.replace("index.html") ;
    });
}
function draw() {
    background(bg);
    // camera.x=player.x;
    // camera.y=player.y;
    player.velocityX=0;
    player.velocityY=0;
    player.depth++
    edges=createEdgeSprites();

    player.collide(edges);

    if(keyDown("up")||keyDown("w")){
         player.velocityY=-15;
      }
      if(keyDown("down")||keyDown("s")){
        player.velocityY=15;       
     }
     if(keyWentDown("space")){
       missle=createSprite(player.x,player.y,50,50);
       missle.velocityX=25;
       misslegroup.add(missle);
       missle.addAnimation("missile",missleanime);
       missle.scale=0.3;
       laser.play();
     }

     if (frameCount % 75 === 0){
         eny1=createSprite(2000,100,50,50);
         eny1.velocityX=-20;
         eny1.addImage("eny", enyimg);
         eny1.scale=0.5
         enemy1group.add(eny1);
         eny1.y = Math.round(random(100,740));
    }
    if (frameCount % 120 === 0){
      eny2=createSprite(2000,100,50,50);
      eny2.velocityX=-20;
      eny2.addImage("eny", enyimg);
      eny2.scale=0.5;
      enemy2group.add(eny2);
      eny2.y = Math.round(random(100,740));
 }
     if (frameCount % 200 === 0){
        eny3=createSprite(2000,100,50,50);
        eny3.velocityX=-20;
        eny3.addImage("eny", enyimg);
        eny3.scale=0.5
        enemy3group.add(eny3);
        eny3.y = Math.round(random(100,740));
}
if (frameCount>2500){
  finish();
}
    if (misslegroup.isTouching(enemy1group)) {
      enemy1group.destroyEach();
      missle.destroy();
      score=score+1;
    }
    else if(misslegroup.isTouching(enemy2group)){
      enemy2group.destroyEach();
      missle.destroy();
      score=score+1;
    }
    else if (misslegroup.isTouching(enemy3group)) {
      enemy3group.destroyEach();
      missle.destroy();
      score=score+1;
    }
if (player.isTouching(enemy1group)) {
  plrlife=plrlife-20;
  enemy1group.destroyEach();
}
if (player.isTouching(enemy2group)) {
  plrlife=plrlife-20;
  enemy2group.destroyEach();
}
if (player.isTouching(enemy3group)) {
  plrlife=plrlife-20;
  enemy3group.destroyEach();
}

    
    if (plrlife===0) {
      ded();  
    }
    drawSprites();
    // console.log(score);
    stroke("white")
    textSize(24);
    fill("yellow");
    text("HEALTH "+plrlife,width/2-120,220);    
    text("Score "+score,width/2-90,250)
}

function ded(){
  player.addAnimation("plr",plrdedanime);
  player.velocityX =0;
  player.velocityY =0;
  plrlife=0;
  enemy1group.destroyEach(); 
  enemy2group.destroyEach();
  enemy3group.destroyEach();
  player.x=width/2;
  player.y=height/2;
  level2.visible = false;
}
function finish() {
  end=createSprite(width/2,height/2,50,50);
  end.addImage("end", endimg);
  enemy1group.destroyEach(); 
  enemy2group.destroyEach();
  enemy3group.destroyEach();
  player.destroy();
  misslegroup.destroyEach();
}