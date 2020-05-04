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
        this.load.image('RabbitDie', './assets/rabbitdie.png');
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
        game.music.play();
        

        // green UI background
        this.add.rectangle(0, 12, game.config.width, 50, 0x00FF00).setOrigin(0, 0);
  
        // add rocket (p1)
        this.rabbit = new Rabbit(this, 20, game.config.height/2, 'Rabbit').setScale(0.5, 0.5).setOrigin(0, 0);
        this.anims.create({
            key: 'RabbitAnimas',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Rabbit', {start: 0, end: 7, first: 0}),
            frameRate: 6
        });
        this.rabbit.play('RabbitAnimas');
        this.rabbit.setDepth(99999);

        // add spaceships (x3)
        this.rock01 = new Rock(this, game.config.width + 192, Math.random() * 100 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.rock02 = new Rock(this, game.config.width + 96, Math.random() * 200 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.rock03 = new Rock(this, game.config.width, Math.random() * 300 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.gold = new Gold(this, game.config.width, Math.random() * 300 + 100, 'Gold', 0, 50, 4).setOrigin(0,0);

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
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
        
    }
    

    update() {
        //this.p1Rocket.play('RabbitAnims', true);
        // check key input for restart / menu
        if (this.gameOver){
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
                fixedWidth: 150
            }
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', scoreConfig).setOrigin(0.5);
            scoreConfig.fixedWidth = 360;
            this.add.text(game.config.width/2, game.config.height/2, 'Press "F" to restart', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press "SPACE" to menu', scoreConfig).setOrigin(0.5);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            highScore = this.p1Score;
            console.log(highScore);
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene");
        }

        this.Back.tilePositionX += 2;  // scroll tile sprite
        if (!this.gameOver) {               
            this.rabbit.update();         // update rocket sprite
            this.rock01.update();           // update spaceships (x3)
            this.rock02.update();
            this.rock03.update();
            this.gold.update();
        }             
        // check collisions
        if(this.checkCollision(this.rabbit, this.rock03)) {
            this.rabbit.destroy();
            this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
            this.gameOver = true;
            
        }
        if (this.checkCollision(this.rabbit, this.rock02)) {
            this.rabbit.destroy();
            this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
            this.gameOver = true;
            
        }
        if (this.checkCollision(this.rabbit, this.rock01)) {
            this.rabbit.destroy();
            this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
            this.gameOver = true;
           
        }
        if (this.checkCollision(this.rabbit, this.gold)) {
            this.p1Score += this.gold.points;
            this.scoreLeft.text = this.p1Score;  
            this.sound.play('Eat'); 
            this.gold.reset();
            this.gold.y = Math.random() * 300 + 100;
        }

        if(this.hScore <= this.p1Score){
            this.scoreRight.setText("HS: " + this.p1Score) ;
        }

        //this.timeMid.setText('Time: ' + Math.floor(this.timeMe-this.clock.getElapsedSeconds()));
    }

    checkCollision(rabbit, rock) {
        
        if (rabbit.x < rock.x + rock.width*0.25 && 
            rabbit.x + rabbit.width*0.25 > rock.x && 
            rabbit.y < rock.y + rock.height*0.15 &&
            rabbit.height*0.25 + rabbit.y > rock.y) {
                return true;
        } else {
            return false;
        }
    }
   
    /*shipExplode(rock) {
        rock.alpha = 0;                         // temporarily hide ship
        //create explosion sprite at ship's position
        //let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        //boom.anims.play('explode');             // play explode animation
        //boom.on('animationcomplete', () => {    // callback after animation completes
            rock.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            //boom.destroy();                     // remove explosion sprite
        //});
        
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;     
        // play sound
        this.sound.play('sfx_explosion');  
    }*/
}