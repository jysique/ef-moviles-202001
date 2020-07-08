Menu = function () {}
Menu.prototype = {
    create:function(){
        this.background = this.game.add.sprite(0,0,'background');
        this.background.scale.setTo(0.4,0.3);
        
        this.titleText = this.game.add.text(120,100,'Examen Final',{ fontSize: '20px', fill: '#000000' });
        this.titleText.anchor.setTo(0.5);

        this.playText = this.game.add.text(120,300,'Jugar',{ fontSize: '32px', fill: '#000000' });
        this.playText.anchor.setTo(0.5);
        this.playText.inputEnabled = true;
        this.playText.events.onInputDown.add(this.goSelection,this);

	},
	goSelection:function(){
		this.state.start("Seleccion");
    }
};