import { SoundManager } from '../../managers/SoundManager';

export class Gate extends Phaser.Sprite {
    public game: Phaser.Game;
    public open: boolean;
    public activated: number;
    public activationFee: number;
    private lastStatus: boolean;
    private activationsLeft: number;
    private size: number;
    private soundManager: SoundManager;
    private activationFeeText: Phaser.BitmapText;

    constructor(game: Phaser.Game, x: number, y: number, activationFee: number, gravity: number, soundManager: SoundManager) {
        super(game, x, y, 'gate', 0);
        this.game = game;

        // properties
        this.open = false;
        this.lastStatus = false;
        this.activationFee = activationFee;
        this.activated = 0;
        this.activationsLeft = this.activationFee - this.activated;

        // sprite size
        this.size = 2;
        this.scale.setTo(this.size, this.size);

        // sprite anchor
        this.anchor.setTo(0.5, 0);

        // text
        this.activationFeeText = this.game.add.bitmapText(this.x, this.y + 10, 'carrier_command', this.activationsLeft.toString(), 12);
        this.activationFeeText.visible = false;

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(16, 44, 0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = gravity;
        this.body.bounce.y = 0;
        this.body.immovable = true;

        // sound
        this.soundManager = soundManager;

        game.add.existing(this);
    }

    public update() {
        this.activationsLeft = this.activationFee - this.activated;
        this.activationFeeText.setText(this.activationsLeft.toString());

        this.activationFeeText.position.x = this.x + 22;
        this.activationFeeText.position.y = this.y + 2;

        if (this.activated == this.activationFee) {
            this.openGate();
        }
            
        else {
            this.closeGate();
        }

        this.lastStatus = this.open;
    }

    public openGate() {
        this.open = true;
        this.visible = false;
        this.activationFeeText.visible = false;
        if (this.lastStatus != this.open)
            this.soundManager.gateopen.play();
    }

    public closeGate() {
        this.open = false;
        this.visible = true;
        this.activationFeeText.visible = true;
        if (this.lastStatus != this.open)
            this.soundManager.gateclose.play();
    }
}