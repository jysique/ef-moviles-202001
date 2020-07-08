Game = function(){}

Game.prototype = {
    init:function(wave_current,max_enemies,_score){
        this.PLAYER_SPEED = 300;
        this.BULLET_SPEED = 500;

        if(_score == null){
            _score = 0;
        }
        this.score = _score;
        this.total_enemies = 0;
        this.elapsedTime = 0;
        this.seconds = 1000;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;

        this.direction_bullet = 1;
        this.direction_player = 1;

        this.wave_current = wave_current || 1;
        this.max_enemies = max_enemies*2 || 4;
        this.enemy_count = 0;
        
        if(this.wave_current == 1){
            this.enemyFrequency = 8;
        }else if(this.wave_current == 2){
            this.enemyFrequency = 6;
        }else if(this.wave_current == 3){
            this.enemyFrequency = 4;
        }else if(this.wave_current == 4){
            this.enemyFrequency = 3;
        }else{
            this.enemyFrequency = 2;
            this.max_enemies = 64;
        }
    },
    create:function(){
        this.initBackGround();
        this.initPlayer();
        this.initGround();
        this.initBullets();
        this.initEnemies();
        this.initHud();
    },
    initBackGround:function(){
        this.background = this.game.add.sprite(0,0,'background');
        this.background.scale.setTo(0.4,0.3);
    },
    initGround:function(){
        this.ground = this.game.add.tileSprite(0,0,this.game.world.width,70,"ground");
        this.ground.y = this.game.world.height - this.ground.height;
        this.ground.autoScroll(-30,0);
        this.physics.arcade.enable(this.ground);
		this.ground.body.allowGravity = false;
		this.ground.body.immovable = true;
    },
    initHud:function(){
        
        this.textLife = this.game.add.text(100,50,'Vidas: '+ this.life,{ fontSize: '32px', fill: '#000000' });
        this.textLife.anchor.setTo(0.5);

        this.textWave = this.game.add.text(350,50,'Wave: ' + this.wave_current,{ fontSize: '32px', fill: '#000000' });
        this.textWave.anchor.setTo(0.5);

        this.textScore = this.game.add.text(600,50,'Puntaje: ' + this.score,{ fontSize: '32px', fill: '#000000' });
        this.textScore.anchor.setTo(0.5);
    },
    initPlayer:function(){
        this.player = this.game.add.sprite(this.game.world.centerX/2, 400,'player',4);
        this.player.anchor.setTo(0.5);
        this.physics.arcade.enable(this.player,Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.physics.arcade.gravity.y = 1000;
        this.game.physics.arcade.enable(this.player);
        this.initPlayermovement();
        this.player.animations.add("izq", [0,1,2,3],10,false);
        this.player.animations.add("der", [5,6,7,8],10,false);

        this.life = localStorage.lifes;
    },
    initBullets:function(){
        this.playerBullets = this.game.add.group();
        this.playerBullets.enableBody = true;
        
    },
    createPlayerBullets:function(_typeBullet){        
        let bullet = this.playerBullets.getFirstDead();
        if(!bullet){
          bullet = new PlayerBullet(this.game,this.player.x,this.player.y,_typeBullet);
        }else{
          bullet.reset(this.player.x,this.player.y,this.typeBullet);
        }
        this.playerBullets.add(bullet);

        bullet.body.allowGravity = false;
        if (this.direction_bullet == 1) {
            bullet.body.velocity.y = -this.BULLET_SPEED;
        }else if (this.direction_bullet == -1){
            if (this.direction_player == 1) {
                bullet.body.velocity.x = this.BULLET_SPEED;
            }else{
                bullet.body.velocity.x = -this.BULLET_SPEED;
            }
        }
        
      },
    initPlayermovement:function(){
        this.keys = this.input.keyboard.createCursorKeys();
        this.spacekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.a_key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.s_key = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.d_key = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.f_key = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.g_key = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
        this.q_key = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    },
    update:function(){
        this.playerMovement();
        this.loadWave(this.enemyFrequency);
        if(this.life <= 0){
            this.game.state.start("Gameover");
        }
        this.physics.arcade.collide(this.player,this.ground);

        localStorage.totalscore = this.score;
        this.game.physics.arcade.overlap(this.playerBullets,this.enemies,this.damageEnemy,null,this);
        this.game.physics.arcade.collide(this.player,this.enemies,this.reduceLife,null,this);
        
        this.textLife.setText("Vidas: " +this.life);
        this.textScore.setText("Puntaje: " +this.score);
        this.textWave.setText("Wave: " +this.wave_current);

    },
    reduceLife:function(player,enemy){
        enemy.kill();
        this.life--;
    },
    damageEnemy:function(bullet,enemy){
        if (bullet.type == enemy.type_enemy) {
            if(enemy.type_enemy == "brown"){
                this.score+= 5;
            }else if(enemy.type_enemy == "red"){
                this.score+= 10;
            }else if(enemy.type_enemy == "yellow"){
                this.score+= 15;
            }else if(enemy.type_enemy == "cream"){
                this.score+= 20;
            }else{
                this.score+= 50;
            }
            enemy.kill();
        }
        bullet.kill();
    },
    playerMovement:function(){
        this.player.body.velocity.x = 0;

        if(this.keys.left.isDown){
            this.player.body.velocity.x = -this.PLAYER_SPEED;
            this.player.play("izq");
            this.direction_player = -1;
		}
		if(this.keys.right.isDown){
            this.player.body.velocity.x = this.PLAYER_SPEED;
            this.player.play("der");
            this.direction_player = 1;
		}
        this.keys.up.onDown.add(this.jump,this);

        if(this.a_key.isDown){
            this.typeBullet = "brown";
        }
        if(this.s_key.isDown){
            this.typeBullet = "cream";
        }
        if(this.d_key.isDown){
            this.typeBullet = "fly";
        }
        if(this.f_key.isDown){
            this.typeBullet = "red";
        }
        if(this.g_key.isDown){
            this.typeBullet = "yellow";
        }
        this.a_key.onDown.add(this.createPlayerBullets,this);
        this.s_key.onDown.add(this.createPlayerBullets,this);
        this.d_key.onDown.add(this.createPlayerBullets,this);
        this.f_key.onDown.add(this.createPlayerBullets,this);
        this.g_key.onDown.add(this.createPlayerBullets,this);
        this.q_key.onDown.add(this.changeDirection,this);
    },
    changeDirection:function(){
        this.direction_bullet*=-1;
    },
    jump:function(){
        if (this.player.body.touching.down){
            this.player.body.velocity.y = -500;
        }
    },
    initEnemies:function(){
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
    },
    loadWave:function(freq){
        let time_wave = this.seconds * this.enemyFrequency * this.max_enemies
        let time_add = this.seconds * this.enemyFrequency;
        this.endOfLevelTimer = this.game.time.events.add(time_wave + time_add,function(){
            this.wave_current++;
            this.game.state.start("Game",true,false,this.wave_current,this.max_enemies,this.score);
        },this);

        this.elapsedTime += this.time.elapsed;
		if(this.elapsedTime >= this.seconds * freq){
            if(this.enemy_count < this.max_enemies){
                this.elapsedTime = 0;
                this.createEnemy(0,0,this.wave_current);
                this.enemy_count++;
            }
		}
    },
    createEnemy:function(x,y,wave){
        let enemy = this.enemies.getFirstDead();
        if(!enemy){
            enemy = new Enemy(this.game,x,y,wave);
            this.enemies.add(enemy);
        }
        enemy.body.allowGravity = false;
        enemy.reset(x,y);
    }
}