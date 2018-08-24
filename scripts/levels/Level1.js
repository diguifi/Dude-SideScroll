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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level1.prototype.create = function () {
            this.map = this.game.add.tilemap('tileMap_level1');
            this.map.addTilesetImage('tiles', 'tiles_level1');
            this.map.setCollisionBetween(3, 12, true, 'solid');
            this.map.createLayer('background');
            this.layer = this.map.createLayer('solid');
            this.layer.setScale(2);
            this.layer.resizeWorld();
            this.player = new Diguifi.Player(this.game, 5, 284, 150, 200);
            this.game.camera.follow(this.player);
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.layer);
        };
        Level1.prototype.placeButtons = function (player) {
            this.buttonjump = this.game.add.button(600, 310, 'buttonjump', null, this, 0, 1, 0, 1);
            this.buttonjump.fixedToCamera = true;
            this.buttonjump.events.onInputDown.add(function () { player.jump(); });
            this.buttonjump.events.onInputUp.add(function () { false; });
            this.buttonfire = this.game.add.button(700, 310, 'buttonfire', null, this, 0, 1, 0, 1);
            this.buttonfire.fixedToCamera = true;
            this.buttonfire.events.onInputDown.add(function () { player.running = true; });
            this.buttonfire.events.onInputUp.add(function () { player.running = false; });
            this.buttonleft = this.game.add.button(0, 310, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            this.buttonleft.fixedToCamera = true;
            this.buttonleft.events.onInputDown.add(function () { player.movingLeft = true; });
            this.buttonleft.events.onInputUp.add(function () { player.movingLeft = false; });
            this.buttonright = this.game.add.button(160, 310, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            this.buttonright.fixedToCamera = true;
            this.buttonright.events.onInputDown.add(function () { player.movingRight = true; });
            this.buttonright.events.onInputUp.add(function () { player.movingRight = false; });
        };
        return Level1;
    }(Phaser.State));
    Diguifi.Level1 = Level1;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=Level1.js.map