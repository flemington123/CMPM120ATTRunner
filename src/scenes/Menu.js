class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('Eat', './assets/Eat.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('Back', './assets/Back.png');
        //background music, source:https://www.bensound.com
        this.load.audio('music', './assets/BGM.mp3');
    }

    create() {
        // menu display
        let menuConfig = {
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
        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY- textSpacer, 'Endless Runner', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Press "F" to start', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        
    }

    update() {
        this.Back.tilePositionX += 0.5;
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                //gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}