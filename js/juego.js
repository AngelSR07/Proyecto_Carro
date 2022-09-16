/*========================================================
========================= VARIABLES ======================
==========================================================*/

let fondo,
    carro,
    cursores,

    enemigos,
    timer,

    position,
    enemigo,

    gasolinas,
    timerGasolinas,
    gasolina,

    points,
    txtPoints,

    life,
    txtLife,

    level,
    txtLevel,

    flagOptionText,

    sonidoFondo,
    sonidoVida,
    sonidoColision;

/*========================================================
==========================================================*/



let juego = {
    /*========================================================
    ================= CONFIGURACIÓN DEL JUEGO ================
    ==========================================================*/

    preload: function () {
        game.load.image('bg', 'assets/img/bg.png');
        game.load.image('carro', 'assets/img/carro.png');
        game.load.image('carroMalo', 'assets/img/carroMalo.png');
        game.load.image('gasolina', 'assets/img/gas.png');

        game.load.audio('sonido_fondo', ['assets/sonido/musica_fondo.mp3']);
        game.load.audio('sonido_gasolina', ['assets/sonido/vida.mp3']);
        game.load.audio('colision', ['assets/sonido/colision_nave.wav']);

        game.forceSingleUpdate = true;
    },


    create: function () {
        fondo = game.add.tileSprite(0, 0, 290, 540, 'bg');

        this.sondio();

        this.points();
        this.life();

        this.player(1);
        this.carEnemy(1);
        this.barril(1);

        this.changeLevel(1);

        cursores = game.input.keyboard.createCursorKeys();
        //ACTIVAR SONIDO
        if (game.sound.context.state === 'suspended') {
            game.sound.context.resume();
        }
    },


    update: function () {
        fondo.tilePosition.y += 3;

        this.player(2);
        this.carEnemy(2);
        this.barril(2);

        this.changeLevel(2);
    },

    /*========================================================
    ==========================================================*/





    /*========================================================
    ======================= PLAYER - CAR =====================
    ==========================================================*/

    player: function (flagPlayer) {

        if (flagPlayer == 1) {
            //CREATE
            carro = game.add.sprite(game.width / 2, 496, 'carro');
            carro.anchor.setTo(0.5);
            game.physics.arcade.enable(carro, true);

        } else if (flagPlayer == 2) {
            //UPDATE
            if (cursores.right.isDown && carro.position.x < 245) {
                carro.position.x += 5;

            } else if (cursores.left.isDown && carro.position.x > 45) {
                carro.position.x -= 5;

            }

            //Vida del jugador
            txtLife.text = life;
            if (life == 0) {
                sonidoFondo.stop();
                sonidoVida.stop();
                sonidoColision.stop();

                game.state.start('Game Over');
            }

            if (points == 20) {
                sonidoFondo.stop();
                sonidoVida.stop();
                sonidoColision.stop();


                game.state.start('You win');
            }

        } else {
            console.log('No se encontro algún estado para los enemigos');
        }

    },

    /*========================================================
    ==========================================================*/





    /*========================================================
    ======================== OBSTACULO =======================
    ==========================================================*/

    carEnemy: function (flagCarEnemy) {

        if (flagCarEnemy == 1) {
            //CREATE
            enemigos = game.add.group();
            game.physics.arcade.enable(enemigos, true);
            enemigos.enableBody = true;
            enemigos.createMultiple(20, 'carroMalo');
            enemigos.setAll('anchor.x', 0.5);
            enemigos.setAll('anchor.y', 0.5);
            enemigos.setAll('outOfBoundsKill', true);
            enemigos.setAll('checkWorldBounds', true);

            timer = game.time.events.loop(1500, this.createCarroMalo, this);

        } else if (flagCarEnemy == 2) {
            //UPDATE
            flagOptionText = 1;
            game.physics.arcade.overlap(carro, enemigos, this.colisionPlayer, null, this);

        } else {
            console.log('No se encontro algún estado para los enemigos');
        }

    },


    createCarroMalo: function () {
        position = Math.floor(Math.random() * 3) + 1;
        enemigo = enemigos.getFirstDead();

        enemigo.physicsBodyType = Phaser.Physics.ARCADE;
        enemigo.reset(position * 73, 0);
        enemigo.anchor.setTo(0.5);

        if (points <= 5) {
            enemigo.body.velocity.y = 200;

        } else if (points <= 10) {
            enemigo.body.velocity.y = 400;

        } else {
            enemigo.body.velocity.y = 600;
        }
    },


    barril: function (flagBarril) {

        if (flagBarril == 1) {
            //CREATE
            gasolinas = game.add.group();
            game.physics.arcade.enable(gasolinas, true);
            gasolinas.enableBody = true;
            gasolinas.createMultiple(20, 'gasolina');
            gasolinas.setAll('anchor.x', 0.5);
            gasolinas.setAll('anchor.y', 0.5);
            gasolinas.setAll('outOfBoundsKill', true);
            gasolinas.setAll('checkWorldBounds', true);

            timerGasolinas = game.time.events.loop(2000, this.createGasolina, this);

        } else if (flagBarril == 2) {
            //UPDATE
            flagOptionText = 2;
            game.physics.arcade.overlap(carro, gasolinas, this.colisionPlayer, null, this);

            txtPoints.text = points;

        } else {
            console.log('No se encontro algún estado para los enemigos');
        }

    },


    createGasolina: function () {
        position = Math.floor(Math.random() * 3) + 1;
        gasolina = gasolinas.getFirstDead();

        gasolina.physicsBodyType = Phaser.Physics.ARCADE;
        gasolina.reset(position * 73, enemigo.width + 20);
        gasolina.body.velocity.y = 200;
        gasolina.anchor.setTo(0.5);
    },


    colisionPlayer: function (playerCharacter, alien) {
        if (flagOptionText == 1) {
            life--;     //COLISION CON COCHE ENEMIGO
            sonidoColision.play();

        } else if (flagOptionText == 2) {
            points++;   //COLISION CON BARRIL
            sonidoVida.play();

        } else {
            console.log('No se produce colisión con el barril o coche enemigo');
        }

        alien.kill();
    },

    /*========================================================
    ==========================================================*/




    /*========================================================
    ========================= TEXTO ==========================
    ==========================================================*/

    points: function () {
        points = 0;

        game.add.text(40, 20, " Puntos: ", { font: "bold 18px Arial", fill: "#000" });
        txtPoints = game.add.text(120, 20, " 0 ", { font: "bold 18px Arial", fill: "#000" });
    },

    life: function () {
        life = 3;

        game.add.text(165, 20, " Vidas: ", { font: "bold 18px Arial", fill: "#000" });
        txtLife = game.add.text(230, 20, " 0 ", { font: "bold 18px Arial", fill: "#000" });
    },

    /*========================================================
    ==========================================================*/





    /*========================================================
    =================== CAMBIO DE NIVEL ======================
    ==========================================================*/

    changeLevel: function (flagLevel) {

        if (flagLevel == 1) {
            //CREATE
            level = juego.add.text(80, 200, " Nivel ", { font: "bold 32px Arial", fill: "#000" });
            txtLevel = juego.add.text(180, 200, " 0 ", { font: "bold 32px Arial", fill: "#000" });
            txtLevel.text = 1;

            level.visible = true;
            txtLevel.visible = true;

            setTimeout(() => {
                level.visible = false;
                txtLevel.visible = false;
            }, 2000);


        } else if (flagLevel == 2) {
            //UPDATE
            if (points == 6) {
                txtLevel.text = 2;

                level.visible = true;
                txtLevel.visible = true;

            } else if (points == 11) {
                txtLevel.text = 3;

                level.visible = true;
                txtLevel.visible = true;
            }

            setTimeout(() => {
                level.visible = false;
                txtLevel.visible = false;
            }, 2000);
        }
    },
    /*========================================================
    ==========================================================*/





    /*========================================================
    ======================== SONIDO ==========================
    ==========================================================*/
    sondio: function () {
        sonidoFondo = game.add.audio('sonido_fondo');
        sonidoFondo.loop = true;
        sonidoFondo.volume = 0.5;

        sonidoVida = juego.add.audio('sonido_gasolina');
        sonidoVida.volume = 1;

        sonidoColision = juego.add.audio('colision');
        sonidoColision.volume = 0.7;

        sonidoFondo.play();
    }
    /*========================================================
    ==========================================================*/
};