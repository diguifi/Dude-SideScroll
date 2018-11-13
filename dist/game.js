!function(e){var t={};function s(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(i,a,function(t){return e[t]}.bind(null,a));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="dist",s(s.s=3)}([function(e,t,s){var i,a;i=[s,t,s(8)],void 0===(a=function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Player=class extends Phaser.Sprite{constructor(e,t,i,a,h,l,o,n){super(e,t,i,"dude",0),this.gems=l,this.lives=o,this.spawnX=t,this.spawnY=i,this.playingOnDesktop=this.game.device.desktop,this.localGravity=h,this.speedBonus=50,this.jumpBonus=50,this.speed=a,this.jumpStrength=h+.4*h,this.jumping=!1,this.pressingUp=!1,this.size=1.8,this.scale.setTo(this.size,this.size),this.anchor.setTo(.5,0),this.animations.add("walk",[0,1,2,3],10,!0),this.animSpeeds=[8,13],this.game.physics.arcade.enableBody(this),this.body.setSize(16,21,0,0),this.body.collideWorldBounds=!1,this.body.gravity.y=h,this.body.bounce.y=.2,this.controller=new s.ControllerManager(this,this.game),this.soundManager=n,e.add.existing(this)}update(){this.body.velocity.x=0,this.movingRight?this.moveRight():this.movingLeft?this.moveLeft():this.animations.frame=0,this.playingOnDesktop&&this.controller.getKeyboardInput(this),this.jumping&&this.body.blocked.down&&(this.soundManager.fall.volume=.3,this.soundManager.fall.play(),this.jumping=!1),this.y>450&&this.playerDamage()}playerDamage(){this.soundManager.damage.play(),this.lives--,this.position.x=this.spawnX,this.position.y=this.spawnY}moveRight(){this.position.x<this.game.world.bounds.bottomRight.x?(this.running?(this.animations.play("walk").speed=this.animSpeeds[1],this.body.velocity.x=this.speed+this.speedBonus):(this.animations.play("walk").speed=this.animSpeeds[0],this.body.velocity.x=this.speed),this.scale.x==-this.size&&(this.scale.x=this.size)):this.position.x=this.game.world.bounds.bottomRight.x-.1}moveLeft(){this.position.x>4?(this.running?(this.animations.play("walk").speed=this.animSpeeds[1],this.body.velocity.x=-this.speed-this.speedBonus):(this.animations.play("walk").speed=this.animSpeeds[0],this.body.velocity.x=-this.speed),this.scale.x==this.size&&(this.scale.x=-this.size)):this.position.x=4.1}jump(){this.jumping||(this.running&&0!=this.body.velocity.x?this.body.velocity.y=-this.jumpStrength-this.jumpBonus:this.body.velocity.y=-this.jumpStrength,this.soundManager.jump.play(),this.jumping=!0,this.body.blocked.down=!1,this.movingRight?this.scale.x=this.size:this.movingLeft&&(this.scale.x=-this.size))}fall(){this.jumping&&this.body.velocity.y<0&&(this.body.velocity.y=-this.body.velocity.y/4)}}}.apply(t,i))||(e.exports=a)},function(e,t,s){var i,a;i=[s,t,s(9),s(10)],void 0===(a=function(e,t,s,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.LevelManager=class{constructor(e,t,s,i){this.game=e,this.level=t,this.nextLevel=s,this.level.lastCameraPositionX=0,this.soundManager=i}createBasicLevelStuff(e){this.createMap(e),this.createParallax(),this.game.world.bringToTop(this.level.back),this.game.world.bringToTop(this.level.walls),this.createGreenEnemies(),this.createGems(),this.createRedGems()}updateBasicLevelStuff(e){this.updateRedGemsInteraction(e),this.updateGemsInteraction(e),this.updateEnemiesInteraction(e),this.updateParallax(e.speed)}createMap(e){this.level.map=this.game.add.tilemap(e),this.level.map.addTilesetImage("jungletileset","jungle_tileset"),this.level.map.setCollisionBetween(1,2e3,!0,"walls"),this.level.back=this.level.map.createLayer("back"),this.level.back.setScale(2),this.level.walls=this.level.map.createLayer("walls"),this.level.walls.setScale(2),this.level.walls.resizeWorld()}createParallax(){this.level.paralax2=this.game.add.tileSprite(0,this.game.world.height-430,this.game.world.width,this.game.world.height+100,"jungle_paralax2"),this.level.paralax2.tileScale.x=2,this.level.paralax2.tileScale.y=2,this.level.paralax3=this.game.add.tileSprite(0,this.game.world.height-435,this.game.world.width,this.game.world.height+100,"jungle_paralax3"),this.level.paralax3.tileScale.x=2,this.level.paralax3.tileScale.y=2,this.level.paralax4=this.game.add.tileSprite(0,this.game.world.height-450,this.game.world.width,this.game.world.height+100,"jungle_paralax4"),this.level.paralax4.tileScale.x=2,this.level.paralax4.tileScale.y=2,this.level.paralax5=this.game.add.tileSprite(0,this.game.world.height-460,this.game.world.width,this.game.world.height+100,"jungle_paralax5"),this.level.paralax5.tileScale.x=2,this.level.paralax5.tileScale.y=2,this.level.paralax5.checkWorldBounds=!0}createGreenEnemies(){this.level.map.objects.enemies.forEach(function(e){this.level.enemies.push(new s.Enemy(this.game,2*e.x,1.7*e.y,this.game.physics.arcade.gravity.y,this.level.enemySpeed))}.bind(this))}createBats(e){this.playerRef=e,this.level.map.objects.bats.forEach(function(e){this.level.bats.push(new i.Bat(this.game,2*e.x,1.5*e.y,this.game.physics.arcade.gravity.y,125,this.playerRef))}.bind(this))}createGems(){this.level.gems=this.game.add.physicsGroup(),this.level.map.createFromObjects("gems","gem1","greygem",0,!0,!1,this.level.gems),this.level.gems.forEach(function(e){e=this.gemSetup(e)}.bind(this))}createRedGems(){this.level.redGems=this.game.add.physicsGroup(),this.level.map.createFromObjects("redgems","redgem","redgem",0,!0,!1,this.level.redGems),this.level.redGems.forEach(function(e){e=this.gemSetup(e)}.bind(this))}updateParallax(e){this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)&&this.game.camera.position.x!=this.level.lastCameraPositionX&&(this.level.paralax4.tilePosition.x+=e/1875,this.level.paralax3.tilePosition.x+=e/6e3,this.level.paralax2.tilePosition.x+=e/3e4),this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)&&this.game.camera.position.x!=this.level.lastCameraPositionX&&(this.level.paralax4.tilePosition.x-=e/1875,this.level.paralax3.tilePosition.x-=e/6e3,this.level.paralax2.tilePosition.x-=e/3e4),this.level.lastCameraPositionX=this.game.camera.position.x}updateEnemiesInteraction(e){this.game.physics.arcade.collide(this.level.enemies,this.level.walls),this.game.physics.arcade.overlap(e,this.level.enemies,this.enemyOverlap.bind(this))}updateBatsInteraction(e){this.game.physics.arcade.collide(this.level.bats,this.level.walls),this.game.physics.arcade.overlap(e,this.level.bats,this.enemyOverlap.bind(this))}updateGemsInteraction(e){this.game.physics.arcade.collide(this.level.gems,this.level.walls),this.game.physics.arcade.overlap(e,this.level.gems,this.gemsCollect.bind(this),null,this)}updateRedGemsInteraction(e){this.game.physics.arcade.collide(this.level.redGems,this.level.walls),this.game.physics.arcade.overlap(e,this.level.redGems,this.goNextLevel.bind(this),null,this)}enemyOverlap(e,t){e.body.touching.down&&e.position.y<t.position.y-(t.height-5)?(this.soundManager.enemydamage.play(),t.body.enable=!1,e.jumping=!1,e.pressingUp?e.body.velocity.y=-e.jumpStrength-e.jumpBonus-2:e.body.velocity.y=-e.jumpStrength/2,t.destroy()):e.playerDamage()}gemSetup(e){return e.x=2*e.x,e.y=1.7*e.y,e.scale.setTo(1.8,2),e.body.immovable=!0,e.body.bounce.y=.3,e.animations.add("shine",[0,1,2,3],8,!0),e.animations.play("shine"),e}gemsCollect(e,t){this.soundManager.gemcatch.play(),e.gems++,t.destroy()}goNextLevel(e){this.soundManager.gemcatch.play(),this.level.enemies.forEach(function(e){e.destroy()}),this.game.state.start(this.nextLevel,!0,!1,e,this.soundManager,this.level,this)}}}.apply(t,i))||(e.exports=a)},function(e,t,s){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Hud=class extends Phaser.Sprite{constructor(e,t){super(e,0,0,"hud",0),this.hearts=[],this.fixedToCamera=!0,this.player=t,this.lives=t.lives,this.fillLives(),e.add.existing(this)}update(){this.lives!=this.player.lives&&(this.lives=this.player.lives,this.fillLives())}fillLives(){this.hearts.forEach(function(e){e.destroy()}),this.hearts=[];for(var e=0;e<this.lives;e++)this.hearts.push(this.game.add.sprite(35*e+30,23,"heart2"));this.hearts.forEach(function(e){e.fixedToCamera=!0})}}}.apply(t,[s,t]))||(e.exports=i)},function(e,t,s){var i,a;i=[s,t,s(4),s(5),s(7),s(12),s(13)],void 0===(a=function(e,t,s,i,a,h,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class o{constructor(){this.game=new Phaser.Game(800,400,Phaser.CANVAS,"content",{preload:this.preload,create:this.create},!1,!1,Phaser.Physics.Arcade),this.game.state.add("Preloader",s.Preloader,!1),this.game.state.add("MainMenu",i.MainMenu,!1),this.game.state.add("Level1",a.Level1,!1),this.game.state.add("Level2",h.Level2,!1),this.game.state.add("Level3",l.Level3,!1)}preload(){this.game.time.advancedTiming=!0}create(){this.game.time.desiredFps=60,this.game.renderer.renderSession.roundPixels=!0,this.game.device.desktop?this.game.scale.pageAlignHorizontally=!0:this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.game.physics.startSystem(Phaser.Physics.ARCADE),this.game.physics.arcade.gravity.y=200,this.game.stage.backgroundColor="#aedecb",this.game.state.start("Preloader")}}t.Game=o,window.onload=(()=>{new o})}.apply(t,i))||(e.exports=a)},function(e,t,s){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Preloader=class extends Phaser.State{constructor(){super(...arguments),this.ready=!1}preload(){this.game.load.spritesheet("dude","assets/sprites/dude_spritesheet.png?v=1",16,25,4),this.game.load.image("enemy1","assets/sprites/enemy.png?v=1"),this.game.load.spritesheet("bat","assets/sprites/bat_spritesheet.png?v=1",16,16,10),this.game.load.spritesheet("greygem","assets/sprites/itens/spr_coin_cin.png?v=1",16,16,4),this.game.load.spritesheet("redgem","assets/sprites/itens/spr_coin_ver.png?v=1",16,16,4),this.game.load.spritesheet("torch","assets/sprites/animated_torch.png?v=1",8,26,9),this.game.load.image("heart","assets/sprites/itens/heart.png"),this.game.load.image("titlepage","assets/images/back.png"),this.game.load.image("logo","assets/images/logo.png"),this.game.load.image("hud","assets/images/hud.png"),this.game.load.image("heart2","assets/images/heart.png"),this.game.load.image("jungle_paralax5","assets/levels/jungle/plx-5.png?v=1"),this.game.load.image("jungle_paralax4","assets/levels/jungle/plx-4.png?v=1"),this.game.load.image("jungle_paralax3","assets/levels/jungle/plx-3.png?v=1"),this.game.load.image("jungle_paralax2","assets/levels/jungle/plx-2.png?v=1"),this.game.load.spritesheet("jungle_tileset","assets/levels/jungle/jungle_tileset.png",16,16),this.game.load.tilemap("tileMap_level1","assets/levels/jungle1.json?v=1",null,Phaser.Tilemap.TILED_JSON),this.game.load.tilemap("tileMap_level2","assets/levels/jungle2.json?v=1",null,Phaser.Tilemap.TILED_JSON),this.game.load.tilemap("tileMap_level3","assets/levels/jungle3.json?v=1",null,Phaser.Tilemap.TILED_JSON),this.game.load.image("arrowkeys","assets/sprites/arrows.png"),this.game.load.image("shift","assets/sprites/shift.png"),this.game.load.spritesheet("buttonvertical","assets/buttons/button-vertical.png",64,64),this.game.load.spritesheet("buttonhorizontal","assets/buttons/button-horizontal.png",96,64),this.game.load.spritesheet("buttondiagonal","assets/buttons/button-diagonal.png",64,64),this.game.load.spritesheet("buttonfire","assets/buttons/button-round-a.png",96,96),this.game.load.spritesheet("buttonjump","assets/buttons/button-round-b.png",96,96),this.game.load.audio("coincatch","assets/sounds/sfx/coin-catch.mp3"),this.game.load.audio("damage","assets/sounds/sfx/damage.mp3"),this.game.load.audio("enemydamage","assets/sounds/sfx/enemy-damage.mp3"),this.game.load.audio("fall","assets/sounds/sfx/fall.mp3"),this.game.load.audio("jump","assets/sounds/sfx/jump.mp3"),this.game.load.audio("bgmusic","assets/sounds/music/bg.mp3")}create(){this.game.state.start("MainMenu")}}}.apply(t,[s,t]))||(e.exports=i)},function(e,t,s){var i,a;i=[s,t,s(6)],void 0===(a=function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.MainMenu=class extends Phaser.State{create(){this.background=this.add.sprite(0,0,"titlepage"),this.background.alpha=0,this.logo=this.add.sprite(this.world.centerX,-300,"logo"),this.logo.anchor.setTo(.5,.5),this.add.tween(this.logo).to({y:120},1e3,Phaser.Easing.Elastic.Out,!0,2e3),this.add.tween(this.background).to({alpha:1},2e3,Phaser.Easing.Bounce.InOut,!0),this.input.onDown.addOnce(this.fadeOut,this),this.soundManager=new s.SoundManager(this.game)}fadeOut(){this.add.tween(this.background).to({alpha:0},2e3,Phaser.Easing.Linear.None,!0),this.add.tween(this.logo).to({y:800},2e3,Phaser.Easing.Linear.None,!0).onComplete.add(this.startGame,this)}startGame(){this.game.state.start("Level1",!0,!1,this.soundManager)}}}.apply(t,i))||(e.exports=a)},function(e,t,s){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SoundManager=class{constructor(e){this.loaded=!1,this.game=e,this.gemcatch=this.game.add.audio("coincatch"),this.damage=this.game.add.audio("damage"),this.enemydamage=this.game.add.audio("enemydamage"),this.fall=this.game.add.audio("fall"),this.jump=this.game.add.audio("jump"),this.music=this.game.add.audio("bgmusic"),this.game.sound.setDecodedCallback([this.gemcatch,this.damage,this.enemydamage,this.fall,this.jump,this.music],this.loadComplete,this)}loadComplete(){this.music.loop=!0,this.music.play(),this.loaded=!0}}}.apply(t,[s,t]))||(e.exports=i)},function(e,t,s){var i,a;i=[s,t,s(0),s(1),s(11),s(2)],void 0===(a=function(e,t,s,i,a,h){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Level1=class extends Phaser.State{init(e){this.soundManager=e}create(){this.soundManager.music.volume=.1,this.levelBase=new a.LevelBase,this.levelManager=new i.LevelManager(this.game,this.levelBase,"Level2",this.soundManager),this.levelManager.createBasicLevelStuff("tileMap_level1"),this.arrowKeysSprite=this.game.add.sprite(180,265,"arrowkeys"),this.arrowKeysSprite.scale.setTo(3),this.arrowKeysSprite.alpha=0,this.shiftSprite=this.game.add.sprite(1650,265,"shift"),this.shiftSprite.scale.setTo(2.5),this.shiftSprite.alpha=0,this.player=new s.Player(this.game,10,300,150,this.game.physics.arcade.gravity.y,0,3,this.soundManager),this.game.camera.follow(this.player),this.hud=new h.Hud(this.game,this.player),this.game.world.bringToTop(this.hud)}update(){this.player.lives<0&&this.game.state.start("MainMenu"),this.game.device.desktop?this.showDesktopButtons():this.showMobileButtons(),this.game.physics.arcade.collide(this.player,this.levelBase.walls),this.levelManager.updateBasicLevelStuff(this.player)}showDesktopButtons(){this.checkProximityFirstTutorial()?this.game.add.tween(this.arrowKeysSprite).to({alpha:1},300,Phaser.Easing.Linear.None,!0,0,0,!0):this.game.add.tween(this.arrowKeysSprite).to({alpha:0},300,Phaser.Easing.Linear.None,!0,0,0,!0),this.checkProximitySecondTutorial()?this.game.add.tween(this.shiftSprite).to({alpha:1},300,Phaser.Easing.Linear.None,!0,0,0,!0):this.game.add.tween(this.shiftSprite).to({alpha:0},300,Phaser.Easing.Linear.None,!0,0,0,!0)}showMobileButtons(){this.checkProximityFirstTutorial()?this.game.add.tween(this.player.controller.buttonjump.scale).to({x:1.2,y:1.2},300,Phaser.Easing.Linear.None,!0,0,0,!0):this.game.add.tween(this.player.controller.buttonjump.scale).to({x:1,y:1},300,Phaser.Easing.Linear.None,!0,0,0,!0),this.checkProximitySecondTutorial()?this.game.add.tween(this.player.controller.buttonfire.scale).to({x:1.2,y:1.2},300,Phaser.Easing.Linear.None,!0,0,0,!0):this.game.add.tween(this.player.controller.buttonfire.scale).to({x:1,y:1},300,Phaser.Easing.Linear.None,!0,0,0,!0)}checkProximityFirstTutorial(){return this.player.x>this.arrowKeysSprite.x-120&&this.player.x<this.arrowKeysSprite.x+100}checkProximitySecondTutorial(){return this.player.x>this.shiftSprite.x-120&&this.player.x<this.shiftSprite.x+150}render(){this.game.debug.text(": "+this.player.gems.toString(),662,40)}}}.apply(t,i))||(e.exports=a)},function(e,t,s){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ControllerManager=class{constructor(e,t){this.game=t,this.game.device.desktop||this.getVirtualButtonsInput(e)}getKeyboardInput(e){this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)?e.running=!0:e.running=!1,this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)?e.movingLeft=!0:e.movingLeft=!1,this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)?e.movingRight=!0:e.movingRight=!1,this.game.input.keyboard.isDown(Phaser.Keyboard.UP)?(e.pressingUp=!0,e.body.blocked.down&&e.jump()):e.pressingUp=!1,this.game.input.keyboard.isDown(Phaser.Keyboard.UP)||e.body.blocked.down||e.fall()}getVirtualButtonsInput(e){this.buttonjump=this.game.add.button(600,310,"buttonjump",null,this,0,1,0,1),this.buttonjump.fixedToCamera=!0,this.buttonjump.events.onInputDown.add(function(){e.pressingUp=!0,e.body.blocked.down&&e.jump()}),this.buttonjump.events.onInputUp.add(function(){e.pressingUp=!1,e.body.blocked.down||e.fall()}),this.buttonfire=this.game.add.button(700,310,"buttonfire",null,this,0,1,0,1),this.buttonfire.fixedToCamera=!0,this.buttonfire.events.onInputDown.add(function(){e.running=!e.running}),this.buttonleft=this.game.add.button(0,310,"buttonhorizontal",null,this,0,1,0,1),this.buttonleft.fixedToCamera=!0,this.buttonleft.events.onInputDown.add(function(){e.movingLeft=!0}),this.buttonleft.events.onInputUp.add(function(){e.movingLeft=!1}),this.buttonright=this.game.add.button(160,310,"buttonhorizontal",null,this,0,1,0,1),this.buttonright.fixedToCamera=!0,this.buttonright.events.onInputDown.add(function(){e.movingRight=!0}),this.buttonright.events.onInputUp.add(function(){e.movingRight=!1})}}}.apply(t,[s,t]))||(e.exports=i)},function(e,t,s){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Enemy=class extends Phaser.Sprite{constructor(e,t,s,i,a){super(e,t,s,"enemy1",0),this.localGravity=200,this.speed=a,this.size=1.8,this.scale.setTo(this.size,this.size),this.anchor.setTo(.5,0),this.game.physics.arcade.enableBody(this),this.body.setSize(23,19,0,0),this.body.collideWorldBounds=!0,this.body.gravity.y=i,this.movingRight=!0,e.add.existing(this)}update(){this.body.velocity.x=0,this.movingRight?this.moveRight():this.movingLeft&&this.moveLeft(),this.body.blocked.right&&(this.movingRight=!1,this.movingLeft=!0),this.body.blocked.left&&(this.movingRight=!0,this.movingLeft=!1)}moveRight(){this.body.velocity.x=this.speed,this.scale.x==-this.size&&(this.scale.x=this.size)}moveLeft(){this.body.velocity.x=-this.speed,this.scale.x==this.size&&(this.scale.x=-this.size)}}}.apply(t,[s,t]))||(e.exports=i)},function(e,t,s){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Bat=class extends Phaser.Sprite{constructor(e,t,s,i,a,h){super(e,t,s,"bat",0),this.speed=125,this.speed=a,this.player=h,this.fieldOfView=200,this.size=2,this.scale.setTo(this.size,this.size),this.anchor.setTo(.5,0),this.wakeAnim=this.animations.add("wake",[0,1,2,3,4],8,!1),this.flyAnim=this.animations.add("fly",[5,6,7,8,9],8,!0),this.wakeAnim.onComplete.add(this.startFly,this),this.isSleeping=!0,this.isChasing=!1,this.game.physics.arcade.enableBody(this),this.body.setSize(16,16,0,0),this.body.collideWorldBounds=!0,this.body.gravity.y=-i,this.movingRight=!0,e.add.existing(this)}update(){this.body.velocity.x=0,this.isSleeping&&this.checkIfPlayerIsInRange()&&this.wake(),this.isChasing&&this.chase()}wake(){this.wakeAnim.play(),this.fieldOfView+=75,this.isSleeping=!1}startFly(){this.flyAnim.play(),this.isChasing=!0}chase(){this.checkIfPlayerIsInRange()?this.game.physics.arcade.moveToObject(this,this.player,this.speed):(this.body.velocity.x=0,this.body.velocity.y=0),this.body.velocity.x<0?this.scale.x==this.size&&(this.scale.x=-this.size):this.scale.x==-this.size&&(this.scale.x=this.size)}checkIfPlayerIsInRange(){return this.player.position.x>this.position.x-this.fieldOfView&&this.player.position.x<this.position.x+this.fieldOfView&&this.player.position.y<this.position.y+this.fieldOfView}}}.apply(t,[s,t]))||(e.exports=i)},function(e,t,s){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.LevelBase=class{constructor(){this.bats=[],this.enemies=[],this.enemySpeed=100}}}.apply(t,[s,t]))||(e.exports=i)},function(e,t,s){var i,a;i=[s,t,s(0),s(1),s(2)],void 0===(a=function(e,t,s,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Level2=class extends Phaser.State{init(e,t,s,i){this.lastPlayer=e,this.soundManager=t,this.levelBase=s,e.destroy(),s=null}create(){this.levelManager=new i.LevelManager(this.game,this.levelBase,"Level3",this.soundManager),this.levelManager.createBasicLevelStuff("tileMap_level2"),this.player=new s.Player(this.game,10,300,150,this.game.physics.arcade.gravity.y,this.lastPlayer.gems,this.lastPlayer.lives,this.soundManager),this.game.camera.follow(this.player),this.hud=new a.Hud(this.game,this.player),this.game.world.bringToTop(this.hud)}update(){this.player.lives<0&&this.game.state.start("MainMenu"),this.game.physics.arcade.collide(this.player,this.levelBase.walls),this.levelManager.updateBasicLevelStuff(this.player)}render(){this.game.debug.text(": "+this.player.gems.toString(),662,40)}}}.apply(t,i))||(e.exports=a)},function(e,t,s){var i,a;i=[s,t,s(0),s(1),s(2)],void 0===(a=function(e,t,s,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Level3=class extends Phaser.State{init(e,t,s,i){this.lastPlayer=e,this.soundManager=t,this.levelBase=s,e.destroy(),s=null}create(){this.levelManager=new i.LevelManager(this.game,this.levelBase,"Level4",this.soundManager),this.levelManager.createMap("tileMap_level3"),this.game.world.bringToTop(this.levelManager.level.back),this.game.world.bringToTop(this.levelManager.level.walls),this.levelManager.createGreenEnemies(),this.levelManager.createGems(),this.levelManager.createRedGems(),this.player=new s.Player(this.game,80,50,150,this.game.physics.arcade.gravity.y,this.lastPlayer.gems,this.lastPlayer.lives,this.soundManager),this.game.camera.follow(this.player),this.levelManager.createBats(this.player),this.shadowTexture=this.game.add.bitmapData(this.game.width+100,this.game.height+100),this.lightSprite=this.game.add.image(this.game.camera.x,this.game.camera.y,this.shadowTexture),this.lightSprite.blendMode=Phaser.blendModes.MULTIPLY,this.hud=new a.Hud(this.game,this.player),this.game.world.bringToTop(this.hud)}update(){this.player.lives<0&&this.game.state.start("MainMenu"),this.updateShadowTexture(),this.game.physics.arcade.collide(this.player,this.levelBase.walls),this.levelManager.updateRedGemsInteraction(this.player),this.levelManager.updateGemsInteraction(this.player),this.levelManager.updateEnemiesInteraction(this.player),this.levelManager.updateBatsInteraction(this.player)}render(){this.game.debug.text(": "+this.player.gems.toString(),662,40)}updateShadowTexture(){this.lightSprite.reset(this.game.camera.x,this.game.camera.y),this.shadowTexture.clear(),this.shadowTexture.context.fillStyle="rgb(10, 10, 10, 0.75)",this.shadowTexture.context.fillRect(-25,-25,this.game.width+100,this.game.height+100);var e=150+this.game.rnd.integerInRange(1,20),t=this.player.position.x-this.game.camera.x,s=this.player.position.y-this.game.camera.y,i=this.shadowTexture.context.createRadialGradient(t,s,75,t,s,e);i.addColorStop(0,"rgba(255, 255, 255, 1.0)"),i.addColorStop(1,"rgba(255, 255, 255, 0.0)"),this.shadowTexture.context.beginPath(),this.shadowTexture.context.fillStyle=i,this.shadowTexture.context.arc(t,s,e,0,2*Math.PI,!1),this.shadowTexture.context.fill(),this.shadowTexture.dirty=!0}}}.apply(t,i))||(e.exports=a)}]);