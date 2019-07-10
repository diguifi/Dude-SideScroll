import { SoundManager } from '../managers/SoundManager';
import { LevelBase } from './LevelBase';
import { Player } from '../elements/player/Player';
import { Enemy } from '../elements/enemies/Enemy';
import { Bat } from '../elements/enemies/Bat';
import { Shield } from '../elements/items/Shield';
import { Platform } from '../elements/objects/Platform';
import { Lever } from '../elements/objects/Lever';
import { Gate } from '../elements/objects/Gate';
import { Light } from '../elements/items/Light';
import { HangGlider } from '../elements/items/HangGlider';

export class LevelManager {
    public level: LevelBase;
    private game: Phaser.Game;
    private nextLevel: string;
    private soundManager: SoundManager;
    private playerRef: Player;

    constructor(game: Phaser.Game, level: LevelBase, nextLevel: string, soundManager: SoundManager) {
        this.game = game;
        this.level = level;
        this.nextLevel = nextLevel;
        this.level.lastCameraPositionX = 0;
        this.soundManager = soundManager;
    }

    public createBasicLevelStuff(jsonTilemap: string) {
        this.createMap(jsonTilemap);
        this.createParallax(430);
        this.game.world.bringToTop(this.level.back);
        this.game.world.bringToTop(this.level.walls);
        this.createGreenEnemies();
        this.createGems();
        this.createRedGems();
        this.createItems();
        this.createMisc();
    }

    public updateBasicLevelStuff(player: Player) {
        this.updatePlayer(player);
        this.updateRedGemsInteraction(player);
        this.updateGemsInteraction(player);
        this.updateEnemiesInteraction(player);
        this.updateItemsInteraction(player);
        this.updateMiscInteraction(player);
        this.updateParallax(player.speed);
    }

    public createMap(jsonTilemap: string) {
        this.level.map = this.game.add.tilemap(jsonTilemap);
        this.level.map.addTilesetImage('jungletileset', 'jungle_tileset');
        this.level.map.setCollisionBetween(1, 2000, true, 'walls');

        this.level.back = this.level.map.createLayer('back');
        this.level.back.setScale(2);

        this.level.walls = this.level.map.createLayer('walls');
        this.level.walls.setScale(2);
        this.level.walls.resizeWorld();
    }

    public createParallax(compensationHeight: number) {
        this.level.paralax2 = this.game.add.tileSprite(0,
            this.game.world.height - compensationHeight,
            this.game.world.width,
            this.game.world.height + 100,
            'jungle_paralax2'
        );
        this.level.paralax2.tileScale.x = 2;
        this.level.paralax2.tileScale.y = 2;
        this.level.paralax3 = this.game.add.tileSprite(0,
            this.game.world.height - compensationHeight - 5,
            this.game.world.width,
            this.game.world.height + 100,
            'jungle_paralax3'
        );
        this.level.paralax3.tileScale.x = 2;
        this.level.paralax3.tileScale.y = 2;
        this.level.paralax4 = this.game.add.tileSprite(0,
            this.game.world.height - compensationHeight - 20,
            this.game.world.width,
            this.game.world.height + 100,
            'jungle_paralax4'
        );
        this.level.paralax4.tileScale.x = 2;
        this.level.paralax4.tileScale.y = 2;
        this.level.paralax5 = this.game.add.tileSprite(0,
            this.game.world.height - compensationHeight - 30,
            this.game.world.width,
            this.game.world.height + 100,
            'jungle_paralax5'
        );
        this.level.paralax5.tileScale.x = 2;
        this.level.paralax5.tileScale.y = 2;
        this.level.paralax5.checkWorldBounds = true;
    }

    public createGreenEnemies() {
        this.level.map.objects.enemies.forEach((data: any) => {
            this.level.enemies.push(new Enemy(this.game, data.x * 2, data.y * 1.7, this.game.physics.arcade.gravity.y, this.level.enemySpeed));
        });
    }

    public createItems() {
        this.level.map.objects.items.forEach((data: any) => {
            if(data.name == 'shield') {
                this.level.items.push(new Shield(this.game, data.x * 2, data.y * 1.7, this.game.physics.arcade.gravity.y));
            }
            if(data.name == 'hangglider') {
                this.level.items.push(new HangGlider(this.game, data.x * 2, data.y * 1.5, this.game.physics.arcade.gravity.y));
            }
        });
    }

    public createLights() {
        this.level.map.objects.items.forEach((data: any) => {
            if(data.name == 'light') {
                this.level.items.push(new Light(this.game, data.x * 2, data.y * 1.7, this.game.physics.arcade.gravity.y));
            }
        });
    }

    public createBats(player: Player) {
        this.playerRef = player;
        this.level.map.objects.bats.forEach((data: any) => {
            this.level.bats.push(new Bat(this.game, data.x * 2, data.y * 1.5, this.game.physics.arcade.gravity.y, 125, this.playerRef));
        });
    }

    public createGems() {
        this.level.gems = this.game.add.physicsGroup();
        this.level.map.createFromObjects('gems', 'gem1', 'greygem', 0, true, false, this.level.gems);

        this.level.gems.forEach((gem: any) => {
            gem = this.gemSetup(gem);
        });
    }

    public createRedGems() {
        this.level.redGems = this.game.add.physicsGroup();
        this.level.map.createFromObjects('redgems', 'redgem', 'redgem', 0, true, false, this.level.redGems);

        this.level.redGems.forEach((gem: any) => {
            gem = this.gemSetup(gem);
        });
    }

    public createMisc() {
        this.level.misc = this.game.add.physicsGroup();
        this.level.map.createFromObjects('misc', 'lumpofgrass', 'lumpofgrass', 0, true, false, this.level.misc);

        this.level.misc.forEach((misc: any) => {
            if(misc.name == 'lumpofgrass') {
                misc = this.miscSetup(misc);
            }
        });

        this.level.map.objects.misc.forEach((data: any) => {
            if(data.name == 'platform') {
                this.level.platforms.push(new Platform(this.game, data.x * 2, data.y * 1.9, this.game.physics.arcade.gravity.y, this.soundManager));
            }
            if(data.name == 'lever') {
                this.level.levers.push(new Lever(this.game, data.x * 2.01, data.y * 1.9, this.game.physics.arcade.gravity.y, this.soundManager));
            }
        });

        var totalActivables = this.level.levers.length + this.level.platforms.length;

        this.level.map.objects.misc.forEach((data: any) => {
            if(data.name == 'gate') {
                this.level.gate = new Gate(this.game, data.x * 2, data.y * 1.45, totalActivables, this.game.physics.arcade.gravity.y, this.soundManager);
            }
        });
    }

    public updatePlayer(player: Player) {
        this.game.physics.arcade.collide(player, this.level.walls);
        if (player.position.x + 0.1 >= this.game.world.bounds.bottomRight.x)
            this.goNextLevel(player);
    }

    public updateParallax(playerSpeed: number) {
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
    }

    public updateEnemiesInteraction(player: Player) {
        this.game.physics.arcade.collide(this.level.enemies, this.level.walls);
        this.game.physics.arcade.overlap(player, this.level.enemies, this.enemyOverlap.bind(this));
    }

    public updateItemsInteraction(player: Player) {
        this.game.physics.arcade.collide(this.level.items, this.level.walls);
        this.game.physics.arcade.overlap(player, this.level.items, this.getItem.bind(this));
    }

    public updateGateInteraction(player: Player) {
        this.game.physics.arcade.collide(this.level.gate, this.level.walls);
        this.game.physics.arcade.collide(this.level.gate, this.level.enemies, this.enemyGateCollide.bind(this));
        if (this.level.gate.visible) {
            this.game.physics.arcade.collide(player, this.level.gate);
        }
            
        var actives = 0;
        this.level.platforms.forEach(platform => {
            if (platform.active)
                actives++;
        });
        this.level.levers.forEach(lever => {
            if (lever.active)
                actives++;
        });
        this.level.gate.activated = actives;
    }

    public updateMiscInteraction(player: Player) {
        this.game.physics.arcade.collide(this.level.misc, this.level.walls);
        this.game.physics.arcade.collide(player, this.level.misc, this.miscOverlap.bind(this));

        var activables = this.level.platforms.length > 0 || this.level.levers.length > 0;

        if (this.level.platforms.length > 0) {
            this.game.physics.arcade.collide(this.level.platforms, this.level.walls);
            this.game.physics.arcade.overlap(player, this.level.platforms, this.platformOverlap.bind(this));
            this.game.physics.arcade.overlap(this.level.platforms, this.level.misc, this.platformOverlap.bind(this));
        }

        if (this.level.levers.length > 0) {
            this.game.physics.arcade.collide(this.level.levers, this.level.walls);
            this.game.physics.arcade.overlap(player, this.level.levers, this.leverOverlap.bind(this));
        }

        if (activables && this.level.gate)
            this.updateGateInteraction(player);

        this.level.misc.forEach((misc: any) => {
            if (misc.body.touching.none) {
                if (!misc.inCamera) {
                    misc.x = misc.spawnX;
                    misc.y = misc.spawnY;
                }
            }
        });
    }

    public updateBatsInteraction(player: Player) {
        this.game.physics.arcade.collide(this.level.bats, this.level.walls);
        this.game.physics.arcade.overlap(player, this.level.bats, this.enemyOverlap.bind(this));
    }

    public updateGemsInteraction(player: Player) {
        this.game.physics.arcade.collide(this.level.gems, this.level.walls);
        this.game.physics.arcade.overlap(player, this.level.gems, this.gemsCollect.bind(this), null, this);
    }

    public updateRedGemsInteraction(player: Player) {
        this.game.physics.arcade.collide(this.level.redGems, this.level.walls);
        this.game.physics.arcade.overlap(player, this.level.redGems, this.redGemsCollect.bind(this), null, this);
    }

    private enemyOverlap(player: Player, enemy: any) {
        if (player.body.touching.down) {
            if ((player.position.y) < (enemy.position.y - (enemy.height - 5))) {
                this.soundManager.enemydamage.play();
                enemy.body.enable = false;
                player.jumping = false;
                if (player.pressingUp) {
                    player.body.velocity.y = -player.jumpStrength - player.jumpBonus - 2;
                }
                else {
                    player.body.velocity.y = -player.jumpStrength/2;
                }
                enemy.destroy();
            }
            else {
                if (!player.hasShield)
                    player.playerDamage(this.soundManager);
            }

        } else {
            if (!player.hasShield)
                player.playerDamage(this.soundManager);
        }
    }

    private enemyGateCollide(gate: Gate, enemy: any) {
        if (enemy.movingRight) {
            enemy.movingRight = false;
            enemy.movingLeft = true;
        }
        else {
            enemy.movingRight = true;
            enemy.movingLeft = false;
        }
    }

    private miscOverlap(player: Player, misc: any) {
        if ((player.position.y) < (misc.position.y - (misc.height - 28)))
            player.body.blocked.down = true;
    }

    private platformOverlap(misc: any, platform: Platform) {
        misc.body.touching.none = false;
        platform.body.touching.none = false;
    }

    private leverOverlap(player: Player, lever: Lever) {
        lever.body.touching.none = false;
        lever.toggle();
    }

    private getItem(player: Player, item: any) {
        if(item.name == 'shield') {
            player.hasShield = true;
        }
        if(item.name == 'light') {
            player.lightRadius = player.defaultMaxLightRadius;
        }
        if(item.name == 'hangglider') {
            player.hangGliderReference = item;
            player.hasHangGlider = true;
        }

        if (!item.respawns) {
            item.destroy();
        }
    }

    private gemSetup(gem: any) {
        gem.x = gem.x * 2;
        gem.y = gem.y * 1.7;
        gem.scale.setTo(1.8, 2);
        gem.body.immovable = true;
        gem.body.bounce.y = 0.3;
        gem.animations.add('shine', [0, 1, 2, 3], 8, true);
        gem.animations.play('shine');

        return gem;
    }

    private miscSetup(misc: any) {
        if(misc.name == 'lumpofgrass') {
            misc.x = misc.x * 2;
            misc.y = misc.y * 1.7;
            misc.spawnX = misc.x;
            misc.spawnY = misc.y;
            misc.scale.setTo(2, 2);
            misc.body.immovable = false;
            misc.body.bounce.y = 0;
            misc.body.drag.x = 200;
            misc.body.drag.y = -200;
            misc.body.setSize(32, 30, 0, 0);
        }
        
        return misc;
    }

    private gemsCollect(player: Player, gem: any) {
        this.soundManager.gemcatch.play();
        player.gems++;
        gem.destroy();
    }

    private redGemsCollect(player: Player, gem: any) {
        this.soundManager.gemcatch.play();
        player.redGems++;
        gem.destroy();
    }

    private setGarbage() {
        this.level.enemies.splice(0);
        this.level.map = null;
        this.level.walls = null;
        this.level.paralax1 = null;
        this.level.paralax2 = null;
        this.level.paralax3 = null;
        this.level.paralax4 = null;
        this.level.paralax5 = null;
    }

    private goNextLevel(player: Player) {
        this.level.enemies.forEach((enemy) => {
            enemy.destroy();
        });
        this.setGarbage();
        
        this.game.state.start(this.nextLevel, true, false, player, this.soundManager, this.level, this);
    }
}