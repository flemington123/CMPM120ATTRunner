class Instruction extends Phaser.Scene {
    constructor() {
        super("InsScene");
    }

    preload(){
        this.load.image('Back', './assets/Back.png');
        this.load.audio('music', './assets/BGM.mp3');
    }
    create() {
        let overConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF69B4',
            color: '#FFF0F5',
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
        
        
        this.add.text(centerX, centerY- textSpacer, 'Instruction', overConfig).setOrigin(0.5);
        overConfig.backgroundColor = '#FFB6C1';
        overConfig.color = '#FFF0F5';
        this.add.text(centerX, centerY + textSpacer + 40, 'Press F to Menu', overConfig).setOrigin(0.5);  
        this.add.text(centerX, centerY + textSpacer + 80, 'Press SPACE to start', overConfig).setOrigin(0.5);

        // BestScore display


        game.music = this.sound.add('music');
        game.music.setLoop(true);
        
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.Back.tilePositionX += 2;
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("menuScene");    
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