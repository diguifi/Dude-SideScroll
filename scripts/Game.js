var Diguifi;
(function (Diguifi) {
    var Game = /** @class */ (function () {
        function Game() {
            this.game = new Phaser.Game(800, 400, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create
            }, false, true, Phaser.Physics.Arcade);
            this.game.state.add('Level1', Diguifi.Level1, false);
        }
        Game.prototype.preload = function () {
            this.game.load.image('dude', 'assets/sprites/dudeD0.png?v=1');
            this.game.load.image('level1', 'assets/levels/level1.png?v=1');
        };
        Game.prototype.create = function () {
            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            }
            else {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 200;
            this.game.stage.backgroundColor = "#a9f0ff";
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