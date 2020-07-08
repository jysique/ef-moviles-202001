Gameover = function () {}
Gameover.prototype = {
    create:function(){
        this.background = this.game.add.sprite(0,0,'background');
        this.background.scale.setTo(0.4,0.3);

        this.title = this.game.add.text(200,300,'gameover');
        // this.title.anchor.setTo(0.5);

        this.titleScore = this.game.add.text(200,500,'puntaje: '+ localStorage.totalscore);
        // this.titleScore.anchor.setTo(0.5);


        this.endOfLevelTimer = this.game.time.events.add(3000,function(){
            this.goPlay();
        },this);
	},
	goPlay:function(){
		this.state.start("Menu");
    }
};