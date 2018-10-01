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
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.enemies = [];
            _this.enemySpeed = 100;
            return _this;
        }
        Level1.prototype.create = function () {
            this.lastCameraPositionX = 0;
            this.map = this.game.add.tilemap('tileMap_level1');
            this.map.addTilesetImage('jungletileset', 'tiles_level1');
            this.map.setCollisionBetween(1, 2000, true, 'walls');
            this.walls = this.map.createLayer('walls');
            this.walls.setScale(2);
            this.walls.resizeWorld();
            this.paralax2 = this.game.add.tileSprite(0, this.game.world.height - 420, this.game.world.width, this.game.world.height, 'jungle_paralax2');
            this.paralax2.tileScale.x = 2;
            this.paralax2.tileScale.y = 2;
            this.paralax3 = this.game.add.tileSprite(0, this.game.world.height - 420, this.game.world.width, this.game.world.height, 'jungle_paralax3');
            this.paralax3.tileScale.x = 2;
            this.paralax3.tileScale.y = 2;
            this.paralax4 = this.game.add.tileSprite(0, this.game.world.height - 420, this.game.world.width, this.game.world.height, 'jungle_paralax4');
            this.paralax4.tileScale.x = 2;
            this.paralax4.tileScale.y = 2;
            this.paralax5 = this.game.add.tileSprite(0, this.game.world.height - 420, this.game.world.width, this.game.world.height, 'jungle_paralax5');
            this.paralax5.tileScale.x = 2;
            this.paralax5.tileScale.y = 2;
            this.paralax5.checkWorldBounds = true;
            this.game.world.bringToTop(this.walls);
            this.player = new Diguifi.Player(this.game, 6, 300, 150, this.game.physics.arcade.gravity.y);
            this.game.camera.follow(this.player);
            this.map.objects.enemies.forEach(function (data) {
                console.log(data);
                this.enemies.push(new Diguifi.Enemy(this.game, data.x * 2, data.y, this.game.physics.arcade.gravity.y, this.enemySpeed));
            }.bind(this));
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.walls);
            this.game.physics.arcade.collide(this.enemies, this.walls);
            this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyOverlap);
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if (this.game.camera.position.x != this.lastCameraPositionX) {
                    this.paralax4.tilePosition.x += this.player.speed / 1875;
                    this.paralax3.tilePosition.x += this.player.speed / 6000;
                    this.paralax2.tilePosition.x += this.player.speed / 30000;
                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if (this.game.camera.position.x != this.lastCameraPositionX) {
                    this.paralax4.tilePosition.x -= this.player.speed / 1875;
                    this.paralax3.tilePosition.x -= this.player.speed / 6000;
                    this.paralax2.tilePosition.x -= this.player.speed / 30000;
                }
            }
            this.lastCameraPositionX = this.game.camera.position.x;
            this.enemyWalk();
        };
        Level1.prototype.enemyOverlap = function (player, enemy) {
            if (player.body.touching.down) {
                if ((player.position.y) < (enemy.position.y - (enemy.height))) {
                    enemy.body.enable = false;
                    player.body.velocity.y = -80;
                    enemy.kill();
                }
                else {
                    player.position.x = 6;
                }
            }
            else {
                player.position.x = 6;
            }
        };
        Level1.prototype.enemyWalk = function () {
        };
        return Level1;
    }(Phaser.State));
    Diguifi.Level1 = Level1;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=Level1.js.map