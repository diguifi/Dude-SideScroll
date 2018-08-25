var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        function Player(game, x, y, speed, gravity) {
            var _this = _super.call(this, game, x, y, 'dude') || this;
            // attributes
            _this.playingOnDesktop = _this.game.device.desktop;
            _this.localGravity = gravity;
            _this.speedBonus = 50;
            _this.jumpBonus = 50;
            _this.speed = speed;
            _this.jumpStrength = gravity + (gravity * 0.4);
            // sprite size
            _this.size = 0.15;
            _this.scale.setTo(_this.size, _this.size);
            // sprite anchor
            _this.anchor.setTo(0.5, 0);
            // physics
            _this.game.physics.arcade.enableBody(_this);
            _this.body.collideWorldBounds = true;
            _this.body.gravity.y = gravity;
            _this.body.bounce.y = 0.2;
            _this.controller = new Diguifi.ControllerManager(_this, _this.game);
            game.add.existing(_this);
            return _this;
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.movingRight)
                this.moveRight();
            if (this.movingLeft)
                this.moveLeft();
            if (this.playingOnDesktop)
                this.controller.getKeyboardInput(this);
            if (this.jumping)
                if (this.body.blocked.down)
                    this.jumping = false;
        };
        Player.prototype.moveRight = function () {
            if (this.running)
                this.body.velocity.x = this.speed + this.speedBonus;
            else
                this.body.velocity.x = this.speed;
            if (this.scale.x == -this.size) {
                this.scale.x = this.size;
            }
        };
        Player.prototype.moveLeft = function () {
            if (this.running)
                this.body.velocity.x = -this.speed - this.speedBonus;
            else
                this.body.velocity.x = -this.speed;
            if (this.scale.x == this.size) {
                this.scale.x = -this.size;
            }
        };
        Player.prototype.jump = function () {
            if (!this.jumping) {
                if (this.running)
                    if (this.body.velocity.x != 0)
                        this.body.velocity.y = -this.jumpStrength - this.jumpBonus;
                    else
                        this.body.velocity.y = -this.jumpStrength;
                else
                    this.body.velocity.y = -this.jumpStrength;
                this.jumping = true;
                if (this.movingRight) {
                    this.scale.x = this.size;
                }
                else if (this.movingLeft) {
                    this.scale.x = -this.size;
                }
            }
        };
        Player.prototype.setMovingRight = function (value) {
            console.log(value);
            this.movingRight = value;
        };
        return Player;
    }(Phaser.Sprite));
    Diguifi.Player = Player;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=Player.js.map