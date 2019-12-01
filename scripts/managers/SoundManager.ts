export class SoundManager {
    private game: Phaser.Game;
    public loaded: boolean = false;
    public gemcatch: Phaser.Sound;
    public redgemcatch: Phaser.Sound;
    public damage: Phaser.Sound;
    public enemydamage: Phaser.Sound;
    public fall: Phaser.Sound;
    public jump: Phaser.Sound;
    public clickin: Phaser.Sound;
    public clickout: Phaser.Sound;
    public leverpull: Phaser.Sound;
    public gateopen: Phaser.Sound;
    public gateclose: Phaser.Sound;
    public music: Phaser.Sound;
    public musiclvl3: Phaser.Sound;
    public musicdemofinal: Phaser.Sound;
    public musicMuted: boolean = false;
    public inGameVolume: number = 0.1;

    constructor(game: Phaser.Game) {
        this.game = game;

        this.gemcatch = this.game.add.audio('coincatch');
        this.redgemcatch = this.game.add.audio('redcoincatch');
        this.damage = this.game.add.audio('damage');
        this.enemydamage = this.game.add.audio('enemydamage');
        this.fall = this.game.add.audio('fall');
        this.jump = this.game.add.audio('jump');
        this.clickin = this.game.add.audio('clickin');
        this.clickout = this.game.add.audio('clickout');
        this.leverpull = this.game.add.audio('leverpull');
        this.gateopen = this.game.add.audio('gateopen');
        this.gateclose = this.game.add.audio('gateclose');
        this.music = this.game.add.audio('bgmusic');
        this.musiclvl3 = this.game.add.audio('bgmusiclvl3');
        this.musicdemofinal = this.game.add.audio('bgdemofinal');

        this.game.sound.setDecodedCallback([this.gemcatch, this.redgemcatch,
            this.damage, this.enemydamage, this.fall,
            this.jump, this.music], this.loadComplete, this);
    }

    public loadComplete() {
        this.music.loop = true;
        this.music.play();
        this.loaded = true;
    }
}