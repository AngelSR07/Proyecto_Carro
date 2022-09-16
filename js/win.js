let fondoWin,
    sonidoWin,

    espacio;

let win = {
    preload: function () {
        game.load.image('fondoW', 'assets/img/fondo_win.jpg');
        game.load.spritesheet('mensaje', 'assets/img/mensaje_return.png', 320, 15);

        game.load.audio('You win', ['assets/sonido/music_win.mp3']);
    },

    create: function () {
        game.add.tileSprite(0, 0, 290, 540, 'fondoW');
        game.add.sprite(28, 400, 'mensaje');

        game.add.text(20, 40, " Angel Shapiama Rivera ", { font: "     25px Times New Roman", fill: "#FFF" });

        espacio = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        sonidoWin = game.add.audio('You win');
        sonidoWin.loop = true;
        sonidoWin.volume = 0.5;

        sonidoWin.play();
    },

    update: function () {
        if (espacio.isDown) {
            sonidoWin.stop();
            game.state.start('Play');
        }

        //ACTIVAR SONIDO
        if (game.sound.context.state === 'suspended') {
            game.sound.context.resume();
        }
    }
};
