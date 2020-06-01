class Instruction2 extends Phaser.Scene {
    constructor() {
        super("Ins2Scene");
    }

    preload(){
        this.load.image('Back', './assets/Back.png');
        this.load.audio('music', './assets/BGM.mp3');
        this.load.image('Water', './assets/Water.jpg');
        this.load.spritesheet('Rabbit', './assets/rabbitAtlas.png', {frameWidth: 60, frameHeight: 110, });
        this.load.image('LeftKey', './assets/LeftKey.png');
        this.load.image('Wall', './assets/Wall.png');
        this.load.image('Gate', './assets/Gate.png');
    }
    create() {
        let overConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.Back = this.add.tileSprite(0, 0, game.config.width, game.config.height + 250, 'Back').setScale(1, 0.7).setOrigin(0, 0); 

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.water = new Water(this, 40, 230, 'Water', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.rabbit = new Rabbit(this, 40, 100, 'Rabbit').setScale(0.5, 0.5).setOrigin(0, 0);
        this.rabbit2 = new Rabbit(this, 120, 80, 'Rabbit').setScale(1, 1).setOrigin(0, 0);
        this.wall = new Wall(this, 40, 330, 'Wall', 0).setScale(0.1, 0.1).setOrigin(0,0);
        this.gate = new Gate(this, 50, 360, 'Gate', 0).setScale(0.1, 0.1).setOrigin(0,0);

        this.anims.create({
            key: 'RabbitAnimas',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Rabbit', {start: 0, end: 7, first: 0}),
            frameRate: 6
        });
        this.rabbit.play('RabbitAnimas');
        this.rabbit2.play('RabbitAnimas');

        
        this.add.text(centerX, centerY- textSpacer * 3, 'Instruction', overConfig).setOrigin(0.5);
        this.add.text(centerX + 80, 130, 'press SPACE to change SCALE!', overConfig).setOrigin(0.5);
        this.add.text(centerX , 260, 'ONLY big one can pass', overConfig).setOrigin(0.5);
        this.add.text(centerX + 20, 380, 'ONLY small one can pass', overConfig).setOrigin(0.5);
        this.add.image(centerX * 2 - 40, 420, 'LeftKey', overConfig).setScale(0.15, 0.15);

        game.music = this.sound.add('music');
        game.music.setLoop(true);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }
    update() {
        this.Back.tilePositionX += 2;
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("menuScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("InsScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            game.settings = {
                spaceshipSpeed: 2,
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}