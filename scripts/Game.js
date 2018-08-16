var Diguifi;
(function (Diguifi) {
    var Game = /** @class */ (function () {
        function Game() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create
            }, false, true, Phaser.Physics.Arcade);
        }
        Game.prototype.preload = function () {
            this.game.load.image('dude', 'assets/sprites/dudeD0.png');
        };
        Game.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 200;
            this.game.stage.backgroundColor = "#a9f0ff";
            this.player = new Diguifi.Player(this.game, 130, 284);
        };
        return Game;
    }());
    Diguifi.Game = Game;
})(Diguifi || (Diguifi = {}));
window.onload = function () {
    var game = new Diguifi.Game();
};
//# sourceMappingURL=Game.js.map