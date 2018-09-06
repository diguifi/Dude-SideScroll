var Diguifi;
(function (Diguifi) {
    var Game = /** @class */ (function () {
        function Game() {
            this.game = new Phaser.Game(800, 400, Phaser.CANVAS, 'content', {
                preload: this.preload,
                create: this.create
            }, false, false, Phaser.Physics.Arcade);
            this.game.state.add('Preloader', Diguifi.Preloader, false);
            this.game.state.add('MainMenu', Diguifi.MainMenu, false);
            this.game.state.add('Level1', Diguifi.Level1, false);
        }
        Game.prototype.preload = function () {
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
            this.game.state.start('Preloader');
        };
        return Game;
    }());
    Diguifi.Game = Game;
})(Diguifi || (Diguifi = {}));
window.onload = function () {
    var game = new Diguifi.Game();
};
//# sourceMappingURL=Game.js.map