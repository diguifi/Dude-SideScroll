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
/// <reference path="../engine/phaser.d.ts" />
var SimpleGame = /** @class */ (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('logo', 'assets/images/dude.png');
    };
    SimpleGame.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);
        this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
var Diguifi;
(function (Diguifi) {
    var ControllerManager = /** @class */ (function () {
        function ControllerManager(player, game) {
            this.game = game;
            if (!this.game.device.desktop)
                this.getVirtualButtonsInput(player);
        }
        ControllerManager.prototype.getKeyboardInput = function (player) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
                player.running = true;
            else
                player.running = false;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
                player.movingLeft = true;
            else
                player.movingLeft = false;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
                player.movingRight = true;
            else
                player.movingRight = false;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                if (player.body.blocked.down)
                    player.jump();
        };
        ControllerManager.prototype.getVirtualButtonsInput = function (player) {
            this.buttonjump = this.game.add.button(600, 310, 'buttonjump', null, this, 0, 1, 0, 1);
            this.buttonjump.fixedToCamera = true;
            this.buttonjump.events.onInputDown.add(function () { if (player.body.blocked.down)
                player.jump(); });
            this.buttonjump.events.onInputUp.add(function () { false; });
            this.buttonfire = this.game.add.button(700, 310, 'buttonfire', null, this, 0, 1, 0, 1);
            this.buttonfire.fixedToCamera = true;
            this.buttonfire.events.onInputDown.add(function () { player.running = !player.running; });
            this.buttonleft = this.game.add.button(0, 310, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            this.buttonleft.fixedToCamera = true;
            this.buttonleft.events.onInputDown.add(function () { player.movingLeft = true; });
            this.buttonleft.events.onInputUp.add(function () { player.movingLeft = false; });
            this.buttonright = this.game.add.button(160, 310, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            this.buttonright.fixedToCamera = true;
            this.buttonright.events.onInputDown.add(function () { player.movingRight = true; });
            this.buttonright.events.onInputUp.add(function () { player.movingRight = false; });
        };
        return ControllerManager;
    }());
    Diguifi.ControllerManager = ControllerManager;
})(Diguifi || (Diguifi = {}));
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
            this.game.time.advancedTiming = true;
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
            this.game.stage.backgroundColor = "#aedecb";
            this.game.state.start('Preloader');
        };
        return Game;
    }());
    Diguifi.Game = Game;
})(Diguifi || (Diguifi = {}));
window.onload = function () {
    var game = new Diguifi.Game();
};
var Diguifi;
(function (Diguifi) {
    var Hud = /** @class */ (function (_super) {
        __extends(Hud, _super);
        function Hud(game, player) {
            var _this = _super.call(this, game, 0, 0, 'hud', 0) || this;
            _this.fixedToCamera = true;
            _this.player = player;
            game.add.existing(_this);
            return _this;
        }
        Hud.prototype.update = function () {
        };
        Hud.prototype.render = function () {
            this.game.debug.text("This is debug text", 200, 200);
            this.game.debug.geom(new Phaser.Rectangle(100, 100, 100, 100), 'rgba(255,0,0,1)');
            console.log("is it working?");
        };
        return Hud;
    }(Phaser.Sprite));
    Diguifi.Hud = Hud;
})(Diguifi || (Diguifi = {}));
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
            this.back = this.map.createLayer('back');
            this.back.setScale(2);
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
            this.game.world.bringToTop(this.back);
            this.game.world.bringToTop(this.walls);
            this.player = new Diguifi.Player(this.game, 6, 300, 150, this.game.physics.arcade.gravity.y);
            this.game.camera.follow(this.player);
            this.map.objects.enemies.forEach(function (data) {
                this.enemies.push(new Diguifi.Enemy(this.game, data.x * 2, data.y, this.game.physics.arcade.gravity.y, this.enemySpeed));
            }.bind(this));
            this.gems = this.game.add.physicsGroup();
            this.map.createFromObjects('gems', 'gem1', 'greygem', 0, true, false, this.gems);
            this.gems.forEach(function (gem) {
                gem = this.gemSetup(gem);
            }.bind(this));
            this.hud = new Diguifi.Hud(this.game, this.player);
            this.game.world.bringToTop(this.hud);
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.walls);
            this.game.physics.arcade.collide(this.enemies, this.walls);
            this.game.physics.arcade.collide(this.gems, this.walls);
            this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyOverlap);
            this.game.physics.arcade.overlap(this.player, this.gems, this.gemsCollect, null, this);
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
        Level1.prototype.gemSetup = function (gem) {
            gem.x = gem.x * 2;
            gem.scale.setTo(1.8);
            gem.body.immovable = true;
            gem.body.bounce.y = 0.3;
            gem.animations.add('shine', [0, 1, 2, 3], 8, true);
            gem.animations.play('shine');
            return gem;
        };
        Level1.prototype.gemsCollect = function (player, gem) {
            player.gems++;
            gem.kill();
        };
        Level1.prototype.render = function () {
            this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
        };
        return Level1;
    }(Phaser.State));
    Diguifi.Level1 = Level1;
})(Diguifi || (Diguifi = {}));
var Diguifi;
(function (Diguifi) {
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.logo).to({ y: 120 }, 1000, Phaser.Easing.Elastic.Out, true, 2000);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Diguifi.MainMenu = MainMenu;
})(Diguifi || (Diguifi = {}));
var Diguifi;
(function (Diguifi) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, speed, gravity) {
            var _this = _super.call(this, game, x, y, 'dude', 0) || this;
            _this.gems = 0;
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
var Diguifi;
(function (Diguifi) {
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ready = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.game.load.spritesheet('dude', 'assets/sprites/dude_spritesheet.png?v=1', 16, 25, 4);
            this.game.load.image('enemy1', 'assets/sprites/enemy.png?v=1');
            this.game.load.spritesheet('greygem', 'assets/sprites/itens/spr_coin_cin.png?v=1', 16, 16, 4);
            this.game.load.image('titlepage', 'assets/images/back.png');
            this.game.load.image('logo', 'assets/images/logo.png');
            this.game.load.image('hud', 'assets/images/hud.png');
            this.game.load.image('jungle_paralax5', 'assets/levels/jungle/plx-5.png');
            this.game.load.image('jungle_paralax4', 'assets/levels/jungle/plx-4.png');
            this.game.load.image('jungle_paralax3', 'assets/levels/jungle/plx-3.png');
            this.game.load.image('jungle_paralax2', 'assets/levels/jungle/plx-2.png');
            this.game.load.spritesheet('tiles_level1', 'assets/levels/jungle/jungle_tileset.png', 16, 16);
            this.game.load.tilemap('tileMap_level1', 'assets/levels/jungle1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.spritesheet('buttonvertical', 'assets/buttons/button-vertical.png', 64, 64);
            this.game.load.spritesheet('buttonhorizontal', 'assets/buttons/button-horizontal.png', 96, 64);
            this.game.load.spritesheet('buttondiagonal', 'assets/buttons/button-diagonal.png', 64, 64);
            this.game.load.spritesheet('buttonfire', 'assets/buttons/button-round-a.png', 96, 96);
            this.game.load.spritesheet('buttonjump', 'assets/buttons/button-round-b.png', 96, 96);
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    Diguifi.Preloader = Preloader;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=game.js.map