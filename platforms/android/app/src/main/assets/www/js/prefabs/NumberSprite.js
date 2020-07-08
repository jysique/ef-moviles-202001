
NumberSprite = function(game,x,y,currentIndex){
    Phaser.Sprite.call(this,game,x,y,"numbers",currentIndex);
    this.game = game;
    this.currentIndex = currentIndex
    this.anchor.setTo(0.5,0.5)
    this.game.add.existing(this);
}

NumberSprite.prototype = Object.create(Phaser.Sprite.prototype);
NumberSprite.prototype.constructor = Number;

NumberSprite.prototype.Tween = function(xPos, yPos,timer){
    this.tween = this.game.add.tween(this);
    this.tween.to({ x: [xPos], y: [yPos] }, timer, "Linear");
    this.tween.start();
};