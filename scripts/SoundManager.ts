export class SoundManager {
    private game: Phaser.Game;
    public loaded: boolean = false;
    public gemcatch: Phaser.Sound;
    public damage: Phaser.Sound;
    public enemydamage: Phaser.Sound;
    public fall: Phaser.Sound;
    public jump: Phaser.Sound;
    public music: Phaser.Sound;
    public musicMuted: boolean = false;

    constructor(game: Phaser.Game) {
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

    public loadComplete() {
        this.music.loop = true;
        this.music.play();
        this.loaded = true;
    }
}