var Diguifi;
(function (Diguifi) {
    var Game = /** @class */ (function () {
        function Game() {
            this.game = new Phaser.Game(800, 400, Phaser.CANVAS, 'content', {
                preload: this.preload,
                create: this.create
            }, false, false, Phaser.Physics.Arcade);
            this.game.state.add('Level1', Diguifi.Level1, false);
        }
        Game.prototype.preload = function () {
            this.game.load.spritesheet('dude', 'assets/sprites/dude_spritesheet.png?v=1', 16, 25, 4);
            this.game.load.image('enemy1', 'assets/sprites/enemy.png?v=1');
            this.game.load.spritesheet('tiles_level1', 'assets/levels/level1tiles.png', 16, 16);
            this.game.load.tilemap('tileMap_level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.spritesheet('buttonvertical', 'assets/buttons/button-vertical.png', 64, 64);
            this.game.load.spritesheet('buttonhorizontal', 'assets/buttons/button-horizontal.png', 96, 64);
            this.game.load.spritesheet('buttondiagonal', 'assets/buttons/button-diagonal.png', 64, 64);
            this.game.load.spritesheet('buttonfire', 'assets/buttons/button-round-a.png', 96, 96);
            this.game.load.spritesheet('buttonjump', 'assets/buttons/button-round-b.png', 96, 96);
        };
        Game.prototype.create = function () {
            this.game.time.desiredFps = 60;
            this.game.renderer.renderSession.roundPixels = true;
            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            }
            else {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 200;
            this.game.stage.backgroundColor = "#4286f4";
            this.game.state.start('Level1');
        };
        return Game;
    }());
    Diguifi.Game = Game;
})(Diguifi || (Diguifi = {}));
window.onload = function () {
    var game = new Diguifi.Game();
};
//# sourceMappingURL=Game.js.map