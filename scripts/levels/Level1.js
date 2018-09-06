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
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.enemySpeed = 100;
            return _this;
        }
        Level1.prototype.create = function () {
            this.map = this.game.add.tilemap('tileMap_level1');
            this.map.addTilesetImage('tiles', 'tiles_level1');
            this.map.setCollisionBetween(3, 12, true, 'solid');
            this.map.createLayer('background');
            this.layer = this.map.createLayer('solid');
            this.layer.setScale(2);
            this.layer.resizeWorld();
            this.player = new Diguifi.Player(this.game, 5, 284, 150, this.game.physics.arcade.gravity.y);
            this.game.camera.follow(this.player);
            this.enemies = [new Diguifi.Enemy(this.game, 700, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Diguifi.Enemy(this.game, 1000, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Diguifi.Enemy(this.game, 1500, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Diguifi.Enemy(this.game, 2000, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Diguifi.Enemy(this.game, 2500, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Diguifi.Enemy(this.game, 3000, 370, this.game.physics.arcade.gravity.y, this.enemySpeed)];
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.enemies, this.layer);
            this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyOverlap);
        };
        Level1.prototype.enemyOverlap = function (player, enemy) {
            if (player.body.touching.down) {
                enemy.body.enable = false;
                player.body.velocity.y = -80;
                enemy.kill();
            }
            else {
                player.body.enable = false;
                player.kill();
            }
        };
        return Level1;
    }(Phaser.State));
    Diguifi.Level1 = Level1;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=Level1.js.map