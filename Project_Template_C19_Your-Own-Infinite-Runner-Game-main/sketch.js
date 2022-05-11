var pista,olaf, flor, flocos, cenoura, sol,end,arrow,bow
var pistaImg, olafImg, florImg,flocosImg,cenouraImg, solImg,endImg ,arrowImg,bowImg
var treasureCollection = 0;
var solGroup,florGroup,flocosGroup,cenouraGroup,arrowGroup

var PLAY = 1;
var END = 0;
var gameState = 1;
var velocity = 5;


function preload() {
    pistaImg = loadImage("Road.png");
    olafImg = loadImage("olaf.png");
    florImg = loadImage("flor.png");
    flocosImg = loadImage("flocos.png");
    cenouraImg = loadImage("cenoura.png");
    solImg = loadImage("sol.png");
    endImg = loadAnimation("fimdeJogo.png");
    arrowImg = loadImage("arrow0.png");
    bowImg = loadImage("bow0.png");

}

function setup() {

    createCanvas(windowWidth, windowHeight);

    pista = createSprite(width / 2, 200);
    pista.addImage(pistaImg);
    pista.velocityY = 7;

    olaf = createSprite(width / 2, height - 102, 20, 20);
    olaf.addImage(olafImg);
    olaf.scale = 0.2;

    // criando arco para atirar a flecha
  bow = createSprite(width / 2, height - 102, 20, 20);
  bow.addImage(bowImg);
  bow.scale = 1;

   end = createSprite(300,300,300,300);
   end.scale = 0.5;
   end.addAnimation("A",endImg);
   end.x = width / 2;
   end.y = height / 2;
   end.visible = false;


    florGroup = new Group();
    flocosGroup = new Group();
    solGroup = new Group();
    cenouraGroup = new Group();
    arrowGroup = new Group();


}

function draw() {
    if (gameState === PLAY) {
        background(0);
        olaf.x = World.mouseX;
        bow.x = World.mouseX + 45;

        edges = createEdgeSprites();
        olaf.collide(edges);

        if (World.frameCount % 100 == 0) {
            velocity += 1;
        }

        if (pista.y > height) {
            pista.y = height / 22;
        }

        if (keyDown("space")) {
            createArrow();
        }

        createFlor();
        createFlocos();
        createCenoura();
        createSol();
        
         if (arrowGroup.isTouching(florGroup)) {
            florGroup.destroyEach();
            arrowGroup.destroyEach();
            treasureCollection = treasureCollection + 150;
        }
          if (arrowGroup.isTouching(flocosGroup)) {
            flocosGroup.destroyEach();
            arrowGroup.destroyEach();
            treasureCollection = treasureCollection + 100;
          }
        
          else if (arrowGroup.isTouching(cenouraGroup)) {
            cenouraGroup.destroyEach();
            arrowGroup.destroyEach();
            treasureCollection = treasureCollection + 60;
          }

          if (arrowGroup.isTouching(solGroup)){
            gameState = END;

            end.visible = true;
           
            florGroup.destroyEach();
            cenouraGroup.destroyEach();
            flocosGroup.destroyEach();
            solGroup.destroyEach();
            olaf.destroy();
            bow.destroy();
            arrowGroup.destroyEach();

            florGroup.setVelocityYEach(0);
            cenouraGroup.setVelocityYEach(0);
            flocosGroup.setVelocityYEach(0);
            solGroup.setVelocityYEach(0);
          }

        

        if (florGroup.isTouching(olaf)) {
            florGroup.destroyEach();
            treasureCollection = treasureCollection + 40;
        }
        else if (flocosGroup.isTouching(olaf)) {
            flocosGroup.destroyEach();
            treasureCollection = treasureCollection + 20;
        }
        else if (cenouraGroup.isTouching(olaf)) {
            cenouraGroup.destroyEach();
            treasureCollection = treasureCollection + 10;
        }
        if (solGroup.isTouching(olaf)) {
            gameState = END;

            end.visible = true;


            florGroup.destroyEach();
            cenouraGroup.destroyEach();
            flocosGroup.destroyEach();
            solGroup.destroyEach();
            olaf.destroy();
            bow.destroy();
            arrowGroup.destroyEach();

            florGroup.setVelocityYEach(0);
            cenouraGroup.setVelocityYEach(0);
            flocosGroup.setVelocityYEach(0);
            solGroup.setVelocityYEach(0);

        }

        
        background(50);
        drawSprites();
        textSize(20);
        fill(255);

        text("Tesouro: " + treasureCollection, width - 150, 30);



    }


}

function createFlor() {
    if (World.frameCount % 150 == 0) {
        var flor = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        flor.addImage(florImg);
        flor.scale = 0.12;
        flor.velocityY = velocity;
        flor.lifetime = 200;
        florGroup.add(flor);
    }
}

function createFlocos() {
    if (World.frameCount % 100 == 0) {
        var flocos = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        flocos.addImage(flocosImg);
        flocos.scale = 0.12;
        flocos.velocityY = velocity;
        flocos.lifetime = 200;
        flocosGroup.add(flocos);

    }

}

function createCenoura() {
    if (World.frameCount % 120 == 0) {
        var cenoura = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        cenoura.addImage(cenouraImg);
        cenoura.scale = 0.12;
        cenoura.velocityY = velocity;
        cenoura.lifetime = 200;
        cenouraGroup.add(cenoura);

    }
}

function createSol() {
    if (World.frameCount % 80 == 0) {
        var sol = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        sol.addImage(solImg);
        sol.scale = 0.1;
        sol.velocityY = velocity;
        sol.lifetime = 200;
        solGroup.add(sol);

    }
}

function createArrow(){
    var arrow = createSprite(width / 2, height - 102, 20, 20);
    arrow.addImage(arrowImg);
    //arrow.x = ;
    arrow.x = bow.x;
    arrow.velocityY = -4;
    arrow.lifetime = 200;
    arrow.scale = 0.3;
    arrowGroup.add(arrow);

}