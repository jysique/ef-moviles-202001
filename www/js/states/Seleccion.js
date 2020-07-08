Seleccion = function () {}
Seleccion.prototype = {
    create:function(){
        this.background = this.game.add.sprite(0,0,'background');
        this.background.scale.setTo(0.4,0.3);
        
        this.text1 = this.game.add.text(250,200,'Normal',{ fontSize: '32px', fill: '#000000' });
        this.text1.anchor.setTo(0.5);
        this.text1.inputEnabled = true;
        this.text1.events.onInputDown.add(this.goNormalGame,this);

        this.text2 = this.game.add.text(550,200,'Parao sin polo',{ fontSize: '32px', fill: '#000000' });
        this.text2.anchor.setTo(0.5);
        this.text2.inputEnabled = true;
        this.text2.events.onInputDown.add(this.goParaoSinPoloGame,this);

        localStorage.totalscore = 0;
    },
    goParaoSinPoloGame:function(){
        localStorage.lifes = 1;
		this.state.start("Game");
    },
    goNormalGame:function(){
        localStorage.lifes = 4;
		this.state.start("Game");
    }
};