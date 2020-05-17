class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('Stone', './assets/Stone.png');
        this.load.image('Gold', './assets/Gold.png');
        this.load.image('Back', './assets/Back.png');
        this.load.image('Water', './assets/Water.jpg');
        this.load.image('RabbitDie', './assets/rabbitdie.png');
        this.load.spritesheet('Rabbit', './assets/rabbitAtlas.png', {frameWidth: 60, frameHeight: 110, });
    }
    isPlaying = false;
    create() {
        // place tile sprite
        this.Back = this.add.tileSprite(0, 0, game.config.width, game.config.height + 250, 'Back').setScale(1, 0.7).setOrigin(0, 0); 
        game.music.play();
        // add spaceships (x3)
        this.rock01 = new Rock(this, game.config.width + 192, Math.random() * 100 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.rock02 = new Rock(this, game.config.width + 96, Math.random() * 200 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.rock03 = new Rock(this, game.config.width, Math.random() * 300 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.water = new Water(this, game.config.width*3, 0, 'Water', 0).setScale(1, 1.6).setOrigin(0,0);
        this.gold = new Gold(this, game.config.width, Math.random() * 300 + 100, 'Gold', 0, 50, 4).setOrigin(0,0);
        // add rocket (p1)
        this.rabbit = new Rabbit(this, 20, game.config.height/2, 'Rabbit').setScale(0.5, 0.5).setOrigin(0, 0);
        this.anims.create({
            key: 'RabbitAnimas',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Rabbit', {start: 0, end: 7, first: 0}),
            frameRate: 6
        });
        this.rabbit.play('RabbitAnimas');
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
        scoreConfig.fixedWidth = 0;
        this.Scale = 0;
    }
    update() {
        // check key input for restart / menu
        this.Back.tilePositionX += 2;
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
            this.Back.tilePositionX += -2;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            highScore = this.p1Score;
            console.log(highScore);
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene");
        }
        if (!this.gameOver) {               
            this.rabbit.update();         // update rocket sprite
            this.rock01.update();           // update spaceships (x3)
            this.rock02.update();
            this.rock03.update();
            this.gold.update();
            this.water.update();
        }             
        if (!this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if(this.Scale == 0){
                this.rabbit.setScale(1,1);
                this.Scale = 1;
            }else if(this.Scale == 1){
                this.rabbit.setScale(0.5,0.5);
                this.Scale = 0;
            }
        }
        // check collisions
        if(this.checkCollision(this.rabbit, this.rock03)) {
            if(this.Scale == 0){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
            }else{
                this.rock03.reset();
                this.rock03.y = Math.random() * 300 + 100;
            }
        }
        if (this.checkCollision(this.rabbit, this.rock02)) {
            if(this.Scale == 0){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
            }else{
                this.rock02.reset();
                this.rock02.y = Math.random() * 300 + 100;
            }
        }
        if (this.checkCollision(this.rabbit, this.rock01)) {
            if(this.Scale == 0){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
            }else{
                this.rock01.reset();
                this.rock01.y = Math.random() * 300 + 100;
            }
        }
        if (this.checkCollisionWater(this.rabbit, this.water)){
            if(this.Scale == 0){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
            }
        }
        
        if (this.checkCollisionGold(this.rabbit, this.gold)) {
            this.p1Score += this.gold.points;
            this.scoreLeft.text = this.p1Score;  
            this.sound.play('Eat'); 
            this.gold.reset();
            this.gold.y = Math.random() * 300 + 100;
        }
        if(this.hScore <= this.p1Score){
            this.scoreRight.setText("HS: " + this.p1Score) ;
        }
    }
    checkCollision(rabbit, rock) {
            if (rabbit.x - 10 < rock.x + rock.width && 
                rabbit.x + rabbit.width*0.5 - 10 > rock.x && 
                rabbit.y - 10 < rock.y + rock.height &&
                rabbit.height*0.5 + rabbit.y + 50 > rock.y ) {
                    return true;
            } else {
                return false;
            }   
    }
    checkCollisionWater(rabbit, water) {
        if  (this.Scale == 0){
            if (rabbit.x < water.x + water.width && 
                rabbit.x + rabbit.width - 40 > water.x && 
                rabbit.y < water.y + water.height &&
                rabbit.height + rabbit.y > water.y) {
                    return true;
            } else {
                return false;
            }
        }else{
            if (rabbit.x < water.x + water.width*0.5 && 
                rabbit.x + rabbit.width*0.5 > water.x && 
                rabbit.y + 40 < water.y + water.height*0.5 &&
                rabbit.height*0.5 + rabbit.y + 20 > water.y) {
                    return true;
            } else {
                return false;
            }   
        }
    }
    checkCollisionGold(rabbit, rock) {
        if (rabbit.x < rock.x + rock.width*0.25 && 
            rabbit.x + rabbit.width*0.25 > rock.x && 
            rabbit.y < rock.y + rock.height*0.5 &&
            rabbit.height*0.25 + rabbit.y > rock.y) {
                return true;
        } else {
            return false;
        }
    }
}