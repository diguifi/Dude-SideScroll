import { Player } from '../elements/player/Player';
import { Hud } from '../managers/Hud';
import { Enemy } from '../elements/enemies/Enemy';
import { Bat } from '../elements/enemies/Bat';
import { Platform } from '../elements/objects/Platform';
import { Lever } from '../elements/objects/Lever';
import { Gate } from '../elements/objects/Gate';

export class LevelBase {
    public music: Phaser.Sound;
    public player: Player;
    public hud: Hud;
    public gems: any;
    public redGems: any;
    public bats: Bat[] = [];
    public enemies: Enemy[] = [];
    public platforms: Platform[] = [];
    public levers: Lever[] = [];
    public gate: Gate;
    public items: any[] = [];
    public enemySpeed = 100;
    public map: any;
    public walls: any;
    public back: any;
    public lastCameraPositionX: number;
    public paralax1: any;
    public paralax2: any;
    public paralax3: any;
    public paralax4: any;
    public paralax5: any;
    public misc: any;

    constructor() {
    }
}