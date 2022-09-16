let pasherConfig = {
    type: Phaser.AUTO,
    parent: 'bloque_juego',
    width: 290,
    height: 540,
};

let game = new Phaser.Game(pasherConfig);

game.state.add('Menu Principal', menu_principal);
game.state.add('Play', juego);
game.state.add('Game Over', game_over);
game.state.add('You win', win);

game.state.start('Menu Principal');