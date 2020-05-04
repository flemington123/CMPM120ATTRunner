class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('Stone', './assets/Stone.png');
        this.load.image('Gold', './assets/Gold.png');
        this.load.image('Back', './assets/Back.png');
        //this.load.atlas('Rabbit','./assets/rabbit.png', './assets/Rabbit.json');
        //this.load.image('Rabbit', './assets /rabbit1.png');
        //this.load.image('Rabbit', './assets/rabbit.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 9});
        this.load.spritesheet('Rabbit', './assets/rabbit.png', {frameWidth: 75, frameHeight: 128, });
    }

    isPlaying = false;

    create() {
        // place tile sprite
        this.Back = this.add.tileSprite(0, 0, game.config.width, game.config.height + 250, 'Back').setScale(1, 0.7).setOrigin(0, 0); 

        if(this.isPlaying == false){
            this.bgm = this.sound.add('music');
            this.bgm.play();
        }

        // green UI background
        this.add.rectangle(0, 12, game.config.width, 50, 0x00FF00).setOrigin(0, 0);
  
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, 20, game.config.height/2, 'Rabbit').setScale(0.5, 0.5).setOrigin(0, 0);
        this.anims.create({
            key: 'RabbitAnimas',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Rabbit', {start: 0, end: 7, first: 0}),
            frameRate: 6
        });
        this.p1Rocket.play('RabbitAnimas');
        this.p1Rocket.setDepth(99999);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, Math.random() * 100 + 100, 'Stone', 0, 30).setScale(0.25, 0.25).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, Math.random() * 200 + 100, 'Stone', 0, 20).setScale(0.25, 0.25).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, Math.random() * 300 + 100, 'Stone', 0, 10).setScale(0.25, 0.25).setOrigin(0,0);
        this.smallship = new Smallship(this, game.config.width, Math.random() * 300 + 100, 'Gold', 0, 50, 4).setOrigin(0,0);

        // white rectangle borders
        this.add.rectangle(0, 0, game.config.width, 12, 0x000000).setOrigin(0, 0);// up
        this.add.rectangle(0, game.config.height - 12, game.config.width, 12, 0x000000).setOrigin(0, 0); // down
        this.add.rectangle(0, 0, 12, game.config.height, 0x000000).setOrigin(0, 0); // left
        this.add.rectangle(game.config.width - 12, 0, 12, game.config.height, 0x000000).setOrigin(0, 0); // right

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        /*this.anims.create({
            key: 'RabbitAnimas',
            frames: this.anims.generateFrameNumbers('Rabbit'),
            frameRate: 5,
            repeat: -1
        });*/

        //var sprite = this.add.sprite(this.p1Rocket.x, this.p1Rocket.y, 'Rabbit').setScale(0.5);
        //sprite.play('RabbitAnimas');
        

        // player 1 score
        this.p1Score = 0;
        this.hScore = highScore;

        /*if(game.settings.gameTimer == 60000){
            this.timeMe = 60;
        }else{
            this.timeMe = 45;
        }*/ 
        

        // score display UI
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 130
        }
        this.scoreLeft = this.add.text((game.config.width/3)-200, 20, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width-200, 20,"HS: " + this.hScore, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        //this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //    this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        //    this.gameOver = true;
        //}, null, this);
        this.timeMid = this.add.text(game.config.width/3*2-200, 20, 'Time: '+ this.timeMe, scoreConfig);
    }

    update() {
        //this.p1Rocket.play('RabbitAnims', true);
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            highScore = this.p1Score;
            console.log(highScore);
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.Back.tilePositionX += 0.5;  // scroll tile sprite
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.smallship.update();
        }             
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
            this.ship03.y = Math.random() * 100 + 300;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.ship02.y = Math.random() * 200 + 200;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.ship01.y = Math.random() * 200 + 100;
        }
        if (this.checkCollision(this.p1Rocket, this.smallship)) {
            this.p1Score += this.smallship.points;
            this.scoreLeft.text = this.p1Score;  
            this.sound.play('Eat'); 
            this.smallship.reset();
            this.smallship.y = Math.random() * 300 + 100;
        }

        if(this.hScore <= this.p1Score){
            this.scoreRight.setText("HS: " + this.p1Score) ;
        }

        this.timeMid.setText('Time: ' + Math.floor(this.timeMe-this.clock.getElapsedSeconds()));
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width*0.25 && 
            rocket.x + rocket.width*0.25 > ship.x && 
            rocket.y < ship.y + ship.height*0.15 &&
            rocket.height*0.25 + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
   
    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            //boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;     
        // play sound
        this.sound.play('sfx_explosion');  
    }
}