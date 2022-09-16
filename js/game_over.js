let fondoGO,
    sonidoGO;

let game_over = {
    preload: function () {
        game.load.spritesheet('Game_Over', 'assets/img/fondo_game_over.png', 290, 540);

        game.load.audio('game_over', ['assets/sonido/game_over.mp3']);
    },

    create: function () {
        fondoGO = game.add.tileSprite(0, 0, game.width, game.height, 'Game_Over');

        fondoGO.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], 5);

        game.add.text(20, 485, " Angel Shapiama Rivera ", { font: "     25px Times New Roman", fill: "#50B8EA" });

        sonidoGO = game.add.audio('game_over');
        sonidoGO.loop = true;
        sonidoGO.volume = 0.5;

        sonidoGO.play();
    },

    update: function () {
        fondoGO.animations.play('move');

        if (game.input.activePointer.isDown) {
            sonidoGO.stop();

            game.state.start('Play');
        }

        //ACTIVAR SONIDO
        if (game.sound.context.state === 'suspended') {
            game.sound.context.resume();
        }
    }
};
