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
        function Player(game, x, y, speed, gravity) {
            var _this = _super.call(this, game, x, y, 'dude', 0) || this;
            // attributes
            _this.playingOnDesktop = _this.game.device.desktop;
            _this.localGravity = gravity;
            _this.speedBonus = 50;
            _this.jumpBonus = 50;
            _this.speed = speed;
            _this.jumpStrength = gravity + (gravity * 0.4);
            // sprite size
            _this.size = 1.8;
            _this.scale.setTo(_this.size, _this.size);
            // sprite anchor
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', [0, 1, 2, 3], 10, true);
            _this.animSpeeds = [8, 13];
            // physics
            _this.game.physics.arcade.enableBody(_this);
            _this.body.collideWorldBounds = false;
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
            else if (this.movingLeft)
                this.moveLeft();
            else
                this.animations.frame = 0;
            if (this.playingOnDesktop)
                this.controller.getKeyboardInput(this);
            if (this.jumping)
                if (this.body.blocked.down)
                    this.jumping = false;
        };
        Player.prototype.moveRight = function () {
            if (this.position.x < this.game.world.bounds.bottomRight.x) {
                if (this.running) {
                    this.animations.play('walk').speed = this.animSpeeds[1];
                    this.body.velocity.x = this.speed + this.speedBonus;
                }
                else {
                    this.animations.play('walk').speed = this.animSpeeds[0];
                    this.body.velocity.x = this.speed;
                }
                if (this.scale.x == -this.size) {
                    this.scale.x = this.size;
                }
            }
            else {
                this.position.x = this.game.world.bounds.bottomRight.x - 0.1;
            }
        };
        Player.prototype.moveLeft = function () {
            if (this.position.x > 4) {
                if (this.running) {
                    this.animations.play('walk').speed = this.animSpeeds[1];
                    this.body.velocity.x = -this.speed - this.speedBonus;
                }
                else {
                    this.animations.play('walk').speed = this.animSpeeds[0];
                    this.body.velocity.x = -this.speed;
                }
                if (this.scale.x == this.size) {
                    this.scale.x = -this.size;
                }
            }
            else {
                this.position.x = 4.1;
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
        return Player;
    }(Phaser.Sprite));
    Diguifi.Player = Player;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=Player.js.map