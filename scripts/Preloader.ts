

export class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;
    ready: boolean = false;

    preload() {
        this.game.load.spritesheet('dude', 'assets/sprites/dude_spritesheet.png?v=1', 16, 25, 8);
        this.game.load.image('enemy1', 'assets/sprites/enemy.png?v=1');
        this.game.load.spritesheet('bat', 'assets/sprites/bat_spritesheet.png?v=1', 16, 16, 10);

        this.game.load.spritesheet('greygem', 'assets/sprites/itens/spr_coin_cin.png?v=1', 16, 16, 4);
        this.game.load.spritesheet('redgem', 'assets/sprites/itens/spr_coin_ver.png?v=1', 16, 16, 4);
        this.game.load.spritesheet('torch', 'assets/sprites/animated_torch.png?v=1', 8, 26, 9);
        this.game.load.spritesheet('shield', 'assets/sprites/shield.png?v=1', 16, 17, 6);
        this.game.load.spritesheet('platform', 'assets/sprites/platform.png?v=1', 32, 8, 2);
        this.game.load.spritesheet('lever', 'assets/sprites/lever.png', 16, 16, 2);
        this.game.load.image('heart', 'assets/sprites/itens/heart.png');
        this.game.load.image('gate', 'assets/sprites/gate.png');
        this.game.load.image('lumpofgrass', 'assets/sprites/lumpofgrass.png');

        this.game.load.image('logo', 'assets/images/logo.png');

        this.game.load.image('hud', 'assets/images/hud.png');
        this.game.load.image('heart2', 'assets/images/heart.png');
        
        this.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

        this.game.load.image('jungle_paralax5', 'assets/levels/jungle/plx-5.png?v=1');
        this.game.load.image('jungle_paralax4', 'assets/levels/jungle/plx-4.png?v=1');
        this.game.load.image('jungle_paralax3', 'assets/levels/jungle/plx-3.png?v=1');
        this.game.load.image('jungle_paralax2', 'assets/levels/jungle/plx-2.png?v=1');
        this.game.load.spritesheet('jungle_tileset', 'assets/levels/jungle/jungle_tileset.png', 16, 16);
        this.game.load.tilemap('tileMap_level1', 'assets/levels/jungle1.json?v=1', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('tileMap_level2', 'assets/levels/jungle2.json?v=1', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('tileMap_level3', 'assets/levels/jungle3.json?v=1', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('tileMap_level4', 'assets/levels/jungle4.json?v=1', null, Phaser.Tilemap.TILED_JSON);

        this.game.load.tilemap('cutscene1_tilemap', 'assets/cutscenes/cutscene1.json?v=1', null, Phaser.Tilemap.TILED_JSON);

        this.game.load.image('arrowkeys', 'assets/sprites/arrows.png');
        this.game.load.image('shift', 'assets/sprites/shift.png');

        this.game.load.spritesheet('buttonright', 'assets/buttons/btn_right.png', 96, 96);
        this.game.load.spritesheet('buttonleft', 'assets/buttons/btn_left.png', 96, 96);
        this.game.load.spritesheet('buttonfire', 'assets/buttons/btn_a.png', 96, 96);
        this.game.load.spritesheet('buttonjump', 'assets/buttons/btn_b.png', 96, 96);
        this.game.load.spritesheet('buttonglow', 'assets/buttons/btn_glow.png', 144, 144);
        this.game.load.spritesheet('buttonstart', 'assets/buttons/startbutton.png', 48, 16);
        this.game.load.spritesheet('buttonsound', 'assets/buttons/soundbutton.png', 16, 16);

        this.game.load.audio('coincatch', 'assets/sounds/sfx/coin-catch.mp3');
        this.game.load.audio('damage', 'assets/sounds/sfx/damage.mp3');
        this.game.load.audio('enemydamage', 'assets/sounds/sfx/enemy-damage.mp3');
        this.game.load.audio('fall', 'assets/sounds/sfx/fall.mp3');
        this.game.load.audio('jump', 'assets/sounds/sfx/jump.mp3');
        this.game.load.audio('clickin', 'assets/sounds/sfx/click-in.mp3');
        this.game.load.audio('clickout', 'assets/sounds/sfx/click-out.mp3');
        this.game.load.audio('leverpull', 'assets/sounds/sfx/lever-pull.mp3');
        this.game.load.audio('gateopen', 'assets/sounds/sfx/gate-open.mp3');
        this.game.load.audio('gateclose', 'assets/sounds/sfx/gate-close.mp3');
        this.game.load.audio('bgmusic', 'assets/sounds/music/bg.mp3');
    }

    create() {
        this.game.state.start('MainMenu');
    }
}
