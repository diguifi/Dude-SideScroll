var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Diguifi;
(function (Diguifi) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, 'dude') || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            game.add.existing(_this);
            return _this;
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
        };
        return Player;
    }(Phaser.Sprite));
    Diguifi.Player = Player;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=Player.js.map