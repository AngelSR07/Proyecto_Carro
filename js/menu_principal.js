let btnPlay,
    sonidoMenuPrincipal;

let menu_principal = {
    preload: function () {
        game.load.image('fondoI', 'assets/img/paisaje.png');
        game.load.spritesheet('Boton Play', 'assets/img/boton_play.png', 177, 60);

        game.load.audio('menu_principal', ['assets/sonido/menu_principal.mp3']);
    },

    create: function () {
        game.add.tileSprite(0, 0, 290, 540, 'fondoI');

        /*
        *   game.world.centerX = Centro de la pantalla
        *   0 = Primera imagen del spriteSheet del boton
        *   1 = Segunda imagen del spriteSheet del boton
        */
        btnPlay = game.add.button(game.world.centerX, 290, 'Boton Play', this.clickMe, this, 1, 0);
        btnPlay.anchor.set(0.5);


        game.add.text(30, 40, " Carrera UTP ", { font: "     40px Times New Roman", fill: "#f8cb12", strokeThickness: "6" });
        game.add.text(20, 480, " Angel Shapiama Rivera ", { font: "     25px Times New Roman", fill: "#7DB1CA", strokeThickness: "6" });


        sonidoMenuPrincipal = game.add.audio('menu_principal');
        sonidoMenuPrincipal.loop = true;
        sonidoMenuPrincipal.volume = 0.5;

        sonidoMenuPrincipal.play();
    },

    update: function () {
        //ACTIVAR SONIDO
        if (game.sound.context.state === 'suspended') {
            game.sound.context.resume();
        }
    },


    clickMe: function () {
        sonidoMenuPrincipal.stop();

        game.state.start('Play');
    }
};
