﻿module Diguifi {

    export class Level2 extends Phaser.State {

        music: Phaser.Sound;
        player: Player;
        lastPlayer: Player;
        hud: Hud;
        gems;
        redGems;
        enemies: Enemy[] = [];
        enemySpeed = 100;
        map;
        walls;
        back;
        lastCameraPositionX;
        paralax1;
        paralax2;
        paralax3;
        paralax4;
        paralax5;

        init (player) {
            this.lastPlayer = player;
        }

        create() {
            this.lastCameraPositionX = 0;

            // ---- map and layers

            this.map = this.game.add.tilemap('tileMap_level2');
            this.map.addTilesetImage('jungletileset', 'jungle_tileset');
            this.map.setCollisionBetween(1, 400, true, 'walls');

            this.back = this.map.createLayer('back');
            this.back.setScale(2);

            this.walls = this.map.createLayer('walls');
            this.walls.setScale(2);
            this.walls.resizeWorld();

            // ---- paralax

            this.paralax2 = this.game.add.tileSprite(0,
                this.game.world.height - 430,
                this.game.world.width,
                this.game.world.height + 100,
                'jungle_paralax2'
            );
            this.paralax2.tileScale.x = 2;
            this.paralax2.tileScale.y = 2;
            this.paralax3 = this.game.add.tileSprite(0,
                this.game.world.height - 435,
                this.game.world.width,
                this.game.world.height + 100,
                'jungle_paralax3'
            );
            this.paralax3.tileScale.x = 2;
            this.paralax3.tileScale.y = 2;
            this.paralax4 = this.game.add.tileSprite(0,
                this.game.world.height - 450,
                this.game.world.width,
                this.game.world.height + 100,
                'jungle_paralax4'
            );
            this.paralax4.tileScale.x = 2;
            this.paralax4.tileScale.y = 2;
            this.paralax5 = this.game.add.tileSprite(0,
                this.game.world.height - 460,
                this.game.world.width,
                this.game.world.height + 100,
                'jungle_paralax5'
            );
            this.paralax5.tileScale.x = 2;
            this.paralax5.tileScale.y = 2;
            this.paralax5.checkWorldBounds = true;

            this.game.world.bringToTop(this.back);
            this.game.world.bringToTop(this.walls);

            // ---- player
            this.player = new Diguifi.Player(this.game, 10, 300, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.lives);
            this.game.camera.follow(this.player);

            // ---- enemies

            this.map.objects.enemies.forEach(function (data) {
                this.enemies.push(new Enemy(this.game, data.x * 2, data.y * 1.7, this.game.physics.arcade.gravity.y, this.enemySpeed));
            }.bind(this));

            // ---- gems

            this.gems = this.game.add.physicsGroup();
            this.map.createFromObjects('gems', 'gem1', 'greygem', 0, true, false, this.gems);

            this.gems.forEach(function (gem) {
                gem = this.gemSetup(gem);
            }.bind(this));

            // ---- red gem

            this.redGems = this.game.add.physicsGroup();
            this.map.createFromObjects('redgems', 'redgem', 'redgem', 0, true, false, this.redGems);

            this.redGems.forEach(function (gem) {
                gem = this.gemSetup(gem);
            }.bind(this));

            // ---- hud and game

            this.hud = new Hud(this.game, this.player);
            this.game.world.bringToTop(this.hud);
        }

        update() {
            if (this.player.lives < 0)
                this.game.state.start('MainMenu');

            if (this.player.y > 450)
                this.killPlayer();

            this.game.physics.arcade.collide(this.player, this.walls);
            this.game.physics.arcade.collide(this.enemies, this.walls);
            this.game.physics.arcade.collide(this.gems, this.walls);
            this.game.physics.arcade.collide(this.redGems, this.walls);
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
        }

        enemyOverlap(player, enemy) {
            if (player.body.touching.down) {
                if ((player.position.y) < (enemy.position.y - (enemy.height - 5))) {
                    enemy.body.enable = false;
                    player.body.velocity.y = -80;
                    enemy.kill();
                }
                else {
                    player.lives--;
                    player.position.x = 15;
                    player.position.y = 300;
                }

            } else {
                player.lives--;
                player.position.x = 15;
                player.position.y = 300;
            }
        }

        killPlayer() {
            this.player.lives--;
            this.player.position.x = 15;
            this.player.position.y = 300;
        }

        gemSetup(gem) {
            gem.x = gem.x * 2;
            gem.y = gem.y * 1.7;
            gem.scale.setTo(1.8, 2);
            gem.body.immovable = true;
            gem.body.bounce.y = 0.3;
            gem.animations.add('shine', [0, 1, 2, 3], 8, true);
            gem.animations.play('shine');

            return gem;
        }

        gemsCollect(player, gem) {
            player.gems++;
            gem.kill();
        }

        render() {
            this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
        }

    }

} 