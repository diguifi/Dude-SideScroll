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
            this.game.load.image('logo', 'assets/images/dude.png');
            this.game.load.image('dude', 'assets/sprites/dudeD0.png');
        };
        Game.prototype.create = function () {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            logo.scale.setTo(0.2, 0.2);
            this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
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