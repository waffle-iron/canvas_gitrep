'use strict'

var anchorsetTo1 = [1.594, 0.615, 0.8, 1, 0, 0.288, -0.705];//Eixo x figuraEncaixe
var anchorsetTo2 = [4.028, 4.028, 3.514, 1.98, 1.4, 1.29, 1.58];//Eixo y figuraEncaixe
var anchorX = [7, 7, 3.6, 5, 3.5, 2.6, 2.6]; //Eixo x figuraAEncaixar
var dimensaoSprite = [20, 100, 230, 340, 460, 485, 0]; //Eixo y figuraAEncaixar

var anchorsetTo1 = [1.6, 0.6, 0.8, 1, 0, 0.3, -0.7];//Eixo x figuraEncaixe
var anchorsetTo2 = [4, 4, 3.5, 2, 1.4, 1.3, 1.6];//Eixo y figuraEncaixe
var anchorX = [-7.6, 7, -3.6, 5, -3.5, 2.6, 2.6]; //Eixo x figuraAEncaixar
var dimensaoSprite = [20, 140, 200, 290, 340, 440, 10]; //Eixo y figuraAEncaixar

var tangran, interval, tempo, diferencaX, diferencaY, margemDeErroEncaixe = 5;

function tangramItem(figureId, url) {
	this.figureName = "figura" + figureId,
		this.url = "assets/gato/" + url + ".png";
	this.status = false,
		this.object = {},
		this.objectForm = {}
}

function setTangran() {
	tangran = [
		new tangramItem('0', "trian1"),
		new tangramItem('1', "trian2"),
		new tangramItem('2', "quad1"),
		new tangramItem('3', "trian3"),
		new tangramItem('4', "trian4"),
		new tangramItem('5', "trian5"),
		new tangramItem('6', "paralelo1"),
	];
};

setTangran();

var game = new Phaser.Game(window.innerWidth - 15, window.innerHeight - 20, Phaser.AUTO, 'tangran', { preload: preload, create: create });

function preload() {
	game.stage.backgroundColor = "#e0e4f1";
	tangran.forEach(function (item) {
		game.load.image(item.figureName, item.url);
	});
}

function create() {
	tangran.forEach(function (item, i) {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		item.object = game.add.sprite(game.world.centerX, game.world.height, item.figureName);
		item.object.anchor.setTo(anchorsetTo1[i], anchorsetTo2[i]); //Disposição figuraEncaixe
		game.physics.arcade.enable(item.object);
		item.object.tint = 0x00beff; //Cor figuraEncaixe
	});

	tangran.forEach(function (item, i) {
		item.objectForm = game.add.sprite(game.world.centerX, dimensaoSprite[i], item.object.key, item.object.frame); //DimensãoSprite
		item.objectForm.anchor.x = anchorX[i]; //Eixo x figuraAEncaixar
		game.physics.arcade.enable(item.objectForm);
		item.objectForm.inputEnabled = true;
		item.objectForm.input.enableDrag();
		item.objectForm.tint = Phaser.Color.getRandomColor(50, 255, 255);
		item.objectForm.input.enableSnap(15, 15, false, true);
		item.objectForm.events.onDragStop.add(function (currentSprite) {
			var currentItem = tangran.filter(function (element) { return element.figureName === currentSprite.key }).shift();
			stopDrag(currentSprite, currentItem.object, tangran.indexOf(currentItem));
		}, this);
	});

}

function win() {
	var youWon = true
	tangran.forEach(function (item) {
		if (item.status === false) {
			youWon = false;
		}
	});
	return youWon;
}

function stopDrag(currentSprite, endSprite, itemTangramIndex) {
	if (!slapItem(currentSprite, endSprite)){
		tangran[itemTangramIndex].status = false;
	} else {
		tangran[itemTangramIndex].status = true;
		if (win()) {

			document.getElementsByClassName("win-wrapper")[0].classList.remove("hide-element");
			document.getElementById("timer").innerHTML(tempo);
		}
	}
}

function slapItem(currentSprite, endSprite) {
	diferencaX = currentSprite.body.x - endSprite.body.x;
	diferencaY = endSprite.body.y - currentSprite.body.y;

	if (diferencaX < 0) {
		diferencaX = diferencaX * -1;
	}
	if (diferencaY < 0) {
		diferencaY = diferencaY * -1;
	}

	if (diferencaX <= margemDeErroEncaixe && diferencaY <= margemDeErroEncaixe) {
		currentSprite.position.copyFrom(endSprite.position); // Copia posição do molde 
		currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); //Seta aonde dar um Stop
		//currentSprite.input.draggable = false;
		return true;
	} else {
		currentSprite.position.copyFrom(currentSprite.position); // Copia para posição na qual já está
		return false;
	}
}

function timer() {
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	if (interval !== undefined) {
		clearInterval(interval);
	}
	interval = setInterval(function () {
		tempo = (start.getMinutes() < 10 ? '0' : '') + start.getMinutes() + " : " + (start.getSeconds() < 10 ? '0' : '') + start.getSeconds();
		start.setSeconds(start.getSeconds() + 1);
		document.querySelector('.teste').innerHTML = '<p>' + tempo + '</p>';
	}, 1000);
};

timer();

function reset() {
	timer();
	//setTangran();
};

Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security 