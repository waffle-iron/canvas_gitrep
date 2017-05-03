var URLfiguras = ['assets/gato/trian1.png', 'assets/gato/trian2.png', 'assets/gato/quad1.png', 'assets/gato/trian3.png', 'assets/gato/trian4.png', 'assets/gato/trian5.png', 'assets/gato/paralelo1.png'];
var  nomesFiguras = ['figura0', 'figura1', 'figura2', 'figura3', 'figura4', 'figura5', 'figura6'];
var figuras = new Array(URLfiguras.length);
var figurasCopy = new Array(URLfiguras.length);

var  anchorsetTo1 = [1.6, 0.6, 0.8, 1, 0, 0.3, -0.7];//Eixo x figuraEncaixe
var  anchorsetTo2 = [4, 4, 3.5, 2, 1.4, 1.3, 1.6];//Eixo y figuraEncaixe
var anchorX = [7, 7, 3.6, 5, 3.5, 2.6, 2.6]; //Eixo x figuraAEncaixar
var dimensaoSprite = [20, 100, 230, 340, 460, 585, 790]; //Eixo y figuraAEncaixar

var game = new Phaser.Game(window.innerWidth-15, window.innerHeight -20, Phaser.AUTO, 'tangran', {preload: preload, create: create});
    
function preload(){    
    for (var i = 0; i < figuras.length; i++){
        game.load.image(nomesFiguras[i], URLfiguras[i]);
    }
}
    
function create(){    
    
    for (var i = 0; i < figuras.length; i++){ 

     //figura encaixe
        game.physics.startSystem(Phaser.Physics.ARCADE);
        figuras[i] = game.add.sprite(game.world.centerX, game.world.height, nomesFiguras[i]);
        figuras[i].anchor.setTo(anchorsetTo1[i], anchorsetTo2[i]); //Disposição figuraEncaixe
        game.physics.arcade.enable(figuras[i]);
        figuras[i].tint= 0x00beff; //Cor figuraEncaixe

        //figura a encaixar  
        figurasCopy[i] = game.add.sprite(game.world.centerX, dimensaoSprite[i], figuras[i].key, figuras[i].frame); //DimensãoSprite
        figurasCopy[i].anchor.x = anchorX[i]; //Eixo x figuraAEncaixar
        game.physics.arcade.enable(figurasCopy[i]);
        figurasCopy[i].inputEnabled = true;
        figurasCopy[i].input.enableDrag();
        figurasCopy[i].originalPosition = figurasCopy[i].position.clone();
        figurasCopy[i].events.onDragStop.add(function(currentSprite){
          stopDrag(currentSprite, figuras[i]);
        }, this);  
        
    }
    
  }
  
function stopDrag(currentSprite, endSprite){
    if (!game.physics.arcade.overlap(currentSprite, endSprite, function() {
    currentSprite.input.draggable = false;
    currentSprite.position.copyFrom(endSprite.position); 
    currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
  })) { currentSprite.position.copyFrom(currentSprite.originalPosition);
  }
  }