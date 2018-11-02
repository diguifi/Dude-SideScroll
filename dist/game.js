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
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                player.pressingUp = true;
                if (player.body.blocked.down)
                    player.jump();
            }
            else {
                player.pressingUp = false;
            }
            if (!this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                if (!player.body.blocked.down)
                    player.fall();
        };
        ControllerManager.prototype.getVirtualButtonsInput = function (player) {
            this.buttonjump = this.game.add.button(600, 310, 'buttonjump', null, this, 0, 1, 0, 1);
            this.buttonjump.fixedToCamera = true;
            this.buttonjump.events.onInputDown.add(function () { player.pressingUp = true; if (player.body.blocked.down)
                player.jump(); });
            this.buttonjump.events.onInputUp.add(function () { player.pressingUp = false; if (!player.body.blocked.down)
                player.fall(); });
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
            _this.body.setSize(23, 19, 0, 0);
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
            this.game.state.add('Level2', Diguifi.Level2, false);
            this.game.state.add('Level3', Diguifi.Level3, false);
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
            _this.hearts = [];
            _this.fixedToCamera = true;
            _this.player = player;
            _this.lives = player.lives;
            _this.fillLives();
            game.add.existing(_this);
            return _this;
        }
        Hud.prototype.update = function () {
            if (this.lives != this.player.lives) {
                this.lives = this.player.lives;
                this.fillLives();
            }
        };
        Hud.prototype.fillLives = function () {
            this.hearts.forEach(function (heart) {
                heart.destroy();
            });
            this.hearts = [];
            for (var i = 0; i < this.lives; i++)
                this.hearts.push(this.game.add.sprite(35 * i + 30, 23, 'heart2'));
            this.hearts.forEach(function (heart) {
                heart.fixedToCamera = true;
            });
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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level1.prototype.init = function (soundManager) {
            this.soundManager = soundManager;
        };
        Level1.prototype.create = function () {
            this.soundManager.music.volume = 0.1;
            this.levelBase = new Diguifi.LevelBase();
            this.levelManager = new Diguifi.LevelManager(this.game, this.levelBase, 'Level2', this.soundManager);
            // ---- level genesis
            this.levelManager.createBasicLevelStuff('tileMap_level1');
            // ---- tutorial sprites
            this.arrowKeysSprite = this.game.add.sprite(180, 265, 'arrowkeys');
            this.arrowKeysSprite.scale.setTo(3);
            this.arrowKeysSprite.alpha = 0;
            this.shiftSprite = this.game.add.sprite(1650, 265, 'shift');
            this.shiftSprite.scale.setTo(2.5);
            this.shiftSprite.alpha = 0;
            // ---- player
            this.player = new Diguifi.Player(this.game, 10, 300, 150, this.game.physics.arcade.gravity.y, 0, 3, this.soundManager);
            this.game.camera.follow(this.player);
            // ---- hud and game
            this.hud = new Diguifi.Hud(this.game, this.player);
            this.game.world.bringToTop(this.hud);
        };
        Level1.prototype.update = function () {
            if (this.player.lives < 0)
                this.game.state.start('MainMenu');
            if (this.player.x > this.arrowKeysSprite.x - 120 && this.player.x < this.arrowKeysSprite.x + 100)
                this.game.add.tween(this.arrowKeysSprite).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            else
                this.game.add.tween(this.arrowKeysSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            if (this.player.x > this.shiftSprite.x - 120 && this.player.x < this.shiftSprite.x + 150)
                this.game.add.tween(this.shiftSprite).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            else
                this.game.add.tween(this.shiftSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.physics.arcade.collide(this.player, this.levelBase.walls);
            this.levelManager.updateBasicLevelStuff(this.player);
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
    var Level2 = /** @class */ (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level2.prototype.init = function (player, soundManager, previousLevelBase, previousLevelManager) {
            this.lastPlayer = player;
            this.soundManager = soundManager;
            this.levelBase = previousLevelBase;
            player.destroy();
            previousLevelBase = null;
            previousLevelManager = null;
        };
        Level2.prototype.create = function () {
            this.levelManager = new Diguifi.LevelManager(this.game, this.levelBase, 'Level3', this.soundManager);
            // ---- level genesis
            this.levelManager.createBasicLevelStuff('tileMap_level2');
            // ---- player
            this.player = new Diguifi.Player(this.game, 10, 300, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.lives, this.soundManager);
            this.game.camera.follow(this.player);
            // ---- hud and game
            this.hud = new Diguifi.Hud(this.game, this.player);
            this.game.world.bringToTop(this.hud);
        };
        Level2.prototype.update = function () {
            if (this.player.lives < 0)
                this.game.state.start('MainMenu');
            this.game.physics.arcade.collide(this.player, this.levelBase.walls);
            this.levelManager.updateBasicLevelStuff(this.player);
        };
        Level2.prototype.render = function () {
            this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
        };
        return Level2;
    }(Phaser.State));
    Diguifi.Level2 = Level2;
})(Diguifi || (Diguifi = {}));
var Diguifi;
(function (Diguifi) {
    var Level3 = /** @class */ (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level3.prototype.init = function (player, soundManager, previousLevelBase, previousLevelManager) {
            this.lastPlayer = player;
            this.soundManager = soundManager;
            this.levelBase = previousLevelBase;
            player.destroy();
            previousLevelBase = null;
            previousLevelManager = null;
        };
        Level3.prototype.create = function () {
            this.levelManager = new Diguifi.LevelManager(this.game, this.levelBase, 'Level4', this.soundManager);
            // ---- level genesis
            this.levelManager.createBasicLevelStuff('tileMap_level3');
            // ---- Torch
            this.torches = [new Diguifi.Torch(this.game, 200, 250)];
            // ---- player
            this.player = new Diguifi.Player(this.game, 80, 50, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.lives, this.soundManager);
            this.game.camera.follow(this.player);
            // ---- hud and game
            this.hud = new Diguifi.Hud(this.game, this.player);
            this.game.world.bringToTop(this.hud);
        };
        Level3.prototype.update = function () {
            if (this.player.lives < 0)
                this.game.state.start('MainMenu');
            this.game.physics.arcade.collide(this.player, this.levelBase.walls);
            this.levelManager.updateBasicLevelStuff(this.player);
        };
        Level3.prototype.render = function () {
            this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
        };
        return Level3;
    }(Phaser.State));
    Diguifi.Level3 = Level3;
})(Diguifi || (Diguifi = {}));
var Diguifi;
(function (Diguifi) {
    var LevelBase = /** @class */ (function () {
        function LevelBase() {
            this.enemies = [];
            this.enemySpeed = 100;
        }
        return LevelBase;
    }());
    Diguifi.LevelBase = LevelBase;
})(Diguifi || (Diguifi = {}));
var Diguifi;
(function (Diguifi) {
    var LevelManager = /** @class */ (function () {
        function LevelManager(game, level, nextLevel, soundManager) {
            this.game = game;
            this.level = level;
            this.nextLevel = nextLevel;
            this.level.lastCameraPositionX = 0;
            this.soundManager = soundManager;
        }
        LevelManager.prototype.createBasicLevelStuff = function (jsonTilemap) {
            this.createMap(jsonTilemap);
            this.createParallax();
            this.game.world.bringToTop(this.level.back);
            this.game.world.bringToTop(this.level.walls);
            this.createGreenEnemies();
            this.createGems();
            this.createRedGems();
        };
        LevelManager.prototype.updateBasicLevelStuff = function (player) {
            this.updateRedGemsInteraction(player);
            this.updateGemsInteraction(player);
            this.updateEnemiesInteraction(player);
            this.updateParallax(player.speed);
        };
        LevelManager.prototype.createMap = function (jsonTilemap) {
            this.level.map = this.game.add.tilemap(jsonTilemap);
            this.level.map.addTilesetImage('jungletileset', 'jungle_tileset');
            this.level.map.setCollisionBetween(1, 2000, true, 'walls');
            this.level.back = this.level.map.createLayer('back');
            this.level.back.setScale(2);
            this.level.walls = this.level.map.createLayer('walls');
            this.level.walls.setScale(2);
            this.level.walls.resizeWorld();
        };
        LevelManager.prototype.createParallax = function () {
            this.level.paralax2 = this.game.add.tileSprite(0, this.game.world.height - 430, this.game.world.width, this.game.world.height + 100, 'jungle_paralax2');
            this.level.paralax2.tileScale.x = 2;
            this.level.paralax2.tileScale.y = 2;
            this.level.paralax3 = this.game.add.tileSprite(0, this.game.world.height - 435, this.game.world.width, this.game.world.height + 100, 'jungle_paralax3');
            this.level.paralax3.tileScale.x = 2;
            this.level.paralax3.tileScale.y = 2;
            this.level.paralax4 = this.game.add.tileSprite(0, this.game.world.height - 450, this.game.world.width, this.game.world.height + 100, 'jungle_paralax4');
            this.level.paralax4.tileScale.x = 2;
            this.level.paralax4.tileScale.y = 2;
            this.level.paralax5 = this.game.add.tileSprite(0, this.game.world.height - 460, this.game.world.width, this.game.world.height + 100, 'jungle_paralax5');
            this.level.paralax5.tileScale.x = 2;
            this.level.paralax5.tileScale.y = 2;
            this.level.paralax5.checkWorldBounds = true;
        };
        LevelManager.prototype.createGreenEnemies = function () {
            this.level.map.objects.enemies.forEach(function (data) {
                this.level.enemies.push(new Diguifi.Enemy(this.game, data.x * 2, data.y * 1.7, this.game.physics.arcade.gravity.y, this.level.enemySpeed));
            }.bind(this));
        };
        LevelManager.prototype.createGems = function () {
            this.level.gems = this.game.add.physicsGroup();
            this.level.map.createFromObjects('gems', 'gem1', 'greygem', 0, true, false, this.level.gems);
            this.level.gems.forEach(function (gem) {
                gem = this.gemSetup(gem);
            }.bind(this));
        };
        LevelManager.prototype.createRedGems = function () {
            this.level.redGems = this.game.add.physicsGroup();
            this.level.map.createFromObjects('redgems', 'redgem', 'redgem', 0, true, false, this.level.redGems);
            this.level.redGems.forEach(function (gem) {
                gem = this.gemSetup(gem);
            }.bind(this));
        };
        LevelManager.prototype.updateParallax = function (playerSpeed) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if (this.game.camera.position.x != this.level.lastCameraPositionX) {
                    this.level.paralax4.tilePosition.x += playerSpeed / 1875;
                    this.level.paralax3.tilePosition.x += playerSpeed / 6000;
                    this.level.paralax2.tilePosition.x += playerSpeed / 30000;
                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if (this.game.camera.position.x != this.level.lastCameraPositionX) {
                    this.level.paralax4.tilePosition.x -= playerSpeed / 1875;
                    this.level.paralax3.tilePosition.x -= playerSpeed / 6000;
                    this.level.paralax2.tilePosition.x -= playerSpeed / 30000;
                }
            }
            this.level.lastCameraPositionX = this.game.camera.position.x;
        };
        LevelManager.prototype.updateEnemiesInteraction = function (player) {
            this.game.physics.arcade.collide(this.level.enemies, this.level.walls);
            this.game.physics.arcade.overlap(player, this.level.enemies, this.enemyOverlap.bind(this));
        };
        LevelManager.prototype.updateGemsInteraction = function (player) {
            this.game.physics.arcade.collide(this.level.gems, this.level.walls);
            this.game.physics.arcade.overlap(player, this.level.gems, this.gemsCollect.bind(this), null, this);
        };
        LevelManager.prototype.updateRedGemsInteraction = function (player) {
            this.game.physics.arcade.collide(this.level.redGems, this.level.walls);
            this.game.physics.arcade.overlap(player, this.level.redGems, this.goNextLevel.bind(this), null, this);
        };
        LevelManager.prototype.enemyOverlap = function (player, enemy) {
            if (player.body.touching.down) {
                if ((player.position.y) < (enemy.position.y - (enemy.height - 5))) {
                    this.soundManager.enemydamage.play();
                    enemy.body.enable = false;
                    player.jumping = false;
                    if (player.pressingUp)
                        player.body.velocity.y = -player.jumpStrength - player.jumpBonus - 2;
                    else
                        player.body.velocity.y = -player.jumpStrength / 2;
                    enemy.destroy();
                }
                else {
                    player.playerDamage();
                }
            }
            else {
                player.playerDamage();
            }
        };
        LevelManager.prototype.gemSetup = function (gem) {
            gem.x = gem.x * 2;
            gem.y = gem.y * 1.7;
            gem.scale.setTo(1.8, 2);
            gem.body.immovable = true;
            gem.body.bounce.y = 0.3;
            gem.animations.add('shine', [0, 1, 2, 3], 8, true);
            gem.animations.play('shine');
            return gem;
        };
        LevelManager.prototype.gemsCollect = function (player, gem) {
            this.soundManager.gemcatch.play();
            player.gems++;
            gem.destroy();
        };
        LevelManager.prototype.goNextLevel = function (player) {
            this.soundManager.gemcatch.play();
            this.level.enemies.forEach(function (enemy) {
                enemy.destroy();
            });
            this.game.state.start(this.nextLevel, true, false, player, this.soundManager, this.level, this);
        };
        return LevelManager;
    }());
    Diguifi.LevelManager = LevelManager;
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
            this.soundManager = new Diguifi.SoundManager(this.game);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false, this.soundManager);
        };
        return MainMenu;
    }(Phaser.State));
    Diguifi.MainMenu = MainMenu;
})(Diguifi || (Diguifi = {}));
var Diguifi;
(function (Diguifi) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, speed, gravity, gems, lives, soundManager) {
            var _this = _super.call(this, game, x, y, 'dude', 0) || this;
            _this.gems = gems;
            _this.lives = lives;
            // attributes
            _this.playingOnDesktop = _this.game.device.desktop;
            _this.localGravity = gravity;
            _this.speedBonus = 50;
            _this.jumpBonus = 50;
            _this.speed = speed;
            _this.jumpStrength = gravity + (gravity * 0.4);
            _this.jumping = false;
            _this.pressingUp = false;
            // sprite size
            _this.size = 1.8;
            _this.scale.setTo(_this.size, _this.size);
            // sprite anchor
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', [0, 1, 2, 3], 10, true);
            _this.animSpeeds = [8, 13];
            // physics
            _this.game.physics.arcade.enableBody(_this);
            _this.body.setSize(16, 21, 0, 0);
            _this.body.collideWorldBounds = false;
            _this.body.gravity.y = gravity;
            _this.body.bounce.y = 0.2;
            // controls
            _this.controller = new Diguifi.ControllerManager(_this, _this.game);
            // sound
            _this.soundManager = soundManager;
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
            if (this.jumping) {
                if (this.body.blocked.down) {
                    this.soundManager.fall.volume = 0.3;
                    this.soundManager.fall.play();
                    this.jumping = false;
                }
            }
            if (this.y > 450)
                this.playerDamage();
        };
        Player.prototype.playerDamage = function () {
            this.soundManager.damage.play();
            this.lives--;
            this.position.x = 10;
            this.position.y = 300;
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
                this.soundManager.jump.play();
                this.jumping = true;
                this.body.blocked.down = false;
                if (this.movingRight) {
                    this.scale.x = this.size;
                }
                else if (this.movingLeft) {
                    this.scale.x = -this.size;
                }
            }
        };
        Player.prototype.fall = function () {
            if (this.jumping) {
                if (this.body.velocity.y < 0)
                    this.body.velocity.y = -this.body.velocity.y / 4;
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
            this.game.load.spritesheet('redgem', 'assets/sprites/itens/spr_coin_ver.png?v=1', 16, 16, 4);
            this.game.load.spritesheet('torch', 'assets/sprites/animated_torch.png?v=1', 8, 26, 9);
            this.game.load.image('heart', 'assets/sprites/itens/heart.png');
            this.game.load.image('titlepage', 'assets/images/back.png');
            this.game.load.image('logo', 'assets/images/logo.png');
            this.game.load.image('hud', 'assets/images/hud.png');
            this.game.load.image('heart2', 'assets/images/heart.png');
            this.game.load.image('jungle_paralax5', 'assets/levels/jungle/plx-5.png?v=1');
            this.game.load.image('jungle_paralax4', 'assets/levels/jungle/plx-4.png?v=1');
            this.game.load.image('jungle_paralax3', 'assets/levels/jungle/plx-3.png?v=1');
            this.game.load.image('jungle_paralax2', 'assets/levels/jungle/plx-2.png?v=1');
            this.game.load.spritesheet('jungle_tileset', 'assets/levels/jungle/jungle_tileset.png', 16, 16);
            this.game.load.tilemap('tileMap_level1', 'assets/levels/jungle1.json?v=1', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('tileMap_level2', 'assets/levels/jungle2.json?v=1', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('tileMap_level3', 'assets/levels/jungle3.json?v=1', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('arrowkeys', 'assets/sprites/arrows.png');
            this.game.load.image('shift', 'assets/sprites/shift.png');
            this.game.load.spritesheet('buttonvertical', 'assets/buttons/button-vertical.png', 64, 64);
            this.game.load.spritesheet('buttonhorizontal', 'assets/buttons/button-horizontal.png', 96, 64);
            this.game.load.spritesheet('buttondiagonal', 'assets/buttons/button-diagonal.png', 64, 64);
            this.game.load.spritesheet('buttonfire', 'assets/buttons/button-round-a.png', 96, 96);
            this.game.load.spritesheet('buttonjump', 'assets/buttons/button-round-b.png', 96, 96);
            this.game.load.audio('coincatch', 'assets/sounds/sfx/coin-catch.mp3');
            this.game.load.audio('damage', 'assets/sounds/sfx/damage.mp3');
            this.game.load.audio('enemydamage', 'assets/sounds/sfx/enemy-damage.mp3');
            this.game.load.audio('fall', 'assets/sounds/sfx/fall.mp3');
            this.game.load.audio('jump', 'assets/sounds/sfx/jump.mp3');
            this.game.load.audio('bgmusic', 'assets/sounds/music/bg.mp3');
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    Diguifi.Preloader = Preloader;
})(Diguifi || (Diguifi = {}));
var Diguifi;
(function (Diguifi) {
    var SoundManager = /** @class */ (function () {
        function SoundManager(game) {
            this.loaded = false;
            this.game = game;
            this.gemcatch = this.game.add.audio('coincatch');
            this.damage = this.game.add.audio('damage');
            this.enemydamage = this.game.add.audio('enemydamage');
            this.fall = this.game.add.audio('fall');
            this.jump = this.game.add.audio('jump');
            this.music = this.game.add.audio('bgmusic');
            this.game.sound.setDecodedCallback([this.gemcatch, this.damage,
                this.enemydamage, this.fall,
                this.jump, this.music], this.loadComplete, this);
        }
        SoundManager.prototype.loadComplete = function () {
            this.music.loop = true;
            this.music.play();
            this.loaded = true;
        };
        return SoundManager;
    }());
    Diguifi.SoundManager = SoundManager;
})(Diguifi || (Diguifi = {}));
var Diguifi;
(function (Diguifi) {
    var Torch = /** @class */ (function (_super) {
        __extends(Torch, _super);
        function Torch(game, x, y) {
            var _this = _super.call(this, game, x, y, 'torch', 0) || this;
            _this.lightSize = 8;
            _this.tweenCycle = 0;
            _this.game = game;
            // testeeeeeeeeeee
            _this.shadowTexture = _this.game.add.bitmapData(_this.game.width + 100, _this.game.height + 100);
            _this.lightSprite = _this.game.add.image(_this.game.camera.x, _this.game.camera.y, _this.shadowTexture);
            _this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
            // --------------
            // sprite size
            _this.size = 2.5;
            _this.scale.setTo(_this.size, _this.size);
            // animation
            _this.frame = 3;
            _this.animations.add('fire', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
            _this.animations.play('fire');
            // sprite anchor
            _this.anchor.setTo(0.5, 0);
            game.add.existing(_this);
            return _this;
        }
        Torch.prototype.update = function () {
            this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
            this.updateShadowTexture();
        };
        Torch.prototype.updateShadowTexture = function () {
            this.shadowTexture.clear();
            this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10, 0.75)';
            this.shadowTexture.context.fillRect(-25, -25, this.game.width + 100, this.game.height + 100);
            var radius = 150 + this.game.rnd.integerInRange(1, 20), torchX = this.x - this.game.camera.x, torchY = this.y - this.game.camera.y;
            var gradient = this.shadowTexture.context.createRadialGradient(torchX, torchY, 100 * 0.75, torchX, torchY, radius);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
            this.shadowTexture.context.beginPath();
            this.shadowTexture.context.fillStyle = gradient;
            this.shadowTexture.context.arc(torchX, torchY, radius, 0, Math.PI * 2, false);
            this.shadowTexture.context.fill();
            this.shadowTexture.dirty = true;
        };
        return Torch;
    }(Phaser.Sprite));
    Diguifi.Torch = Torch;
})(Diguifi || (Diguifi = {}));
//# sourceMappingURL=game.js.map