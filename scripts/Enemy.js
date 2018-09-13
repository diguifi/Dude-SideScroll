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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(game, x, y, gravity, speed) {
            var _this = _super.call(this, game, x, y, 'enemy1', 0) || this;
            // attributes
            _this.localGravity = 200;
            _this.speed = speed;
            // sprite size
            _this.size = 1.8;
            _this.scale.setTo(_this.size, _this.size);
            // sprite anchor
            _this.anchor.setTo(0.5, 0);
            // physics
            _this.game.physics.arcade.enableBody(_this);
            _this.body.collideWorldBounds = true;
            _this.body.gravity.y = gravity;
            // initialize movement
            _this.movingRight = true;
            game.add.existing(_this);
            return _this;
        }
        Enemy.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.movingRight)
                this.moveRight();
            else if (this.movingLeft)
                this.moveLeft();
            if (this.body.blocked.right) {
                this.movingRight = false;
                this.movingLeft = true;
            }
            if (this.body.blocked.left) {
                this.movingRight = true;
                this.movingLeft = false;
            }
        };
        Enemy.prototype.moveRight = function () {
            this.body.velocity.x = this.speed;
            if (this.scale.x == -this.size) {
                this.scale.x = this.size;
            }
        };
        Enemy.prototype.moveLeft = function () {
            this.body.velocity.x = -this.speed;
            if (this.scale.x == this.size) {
                this.scale.x = -this.size;
            }
        };
        return Enemy;
    }(Phaser.Sprite));
    Diguifi.Enemy = Enemy;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=Enemy.js.map