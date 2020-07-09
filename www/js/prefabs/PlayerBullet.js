PlayerBullet = function(game,x,y,type){
    //this.changeType();
    //Phaser.Sprite.call(this,game,x,y,this.key);
    Phaser.Sprite.call(this,game,x,y,"bullet_" + type);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.3);
    this.type = type;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.events.onOutOfBounds.add(function(){
        //console.log("me mori");
    },this);
}

PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
PlayerBullet.prototype.constructor = PlayerBullet;

PlayerBullet.prototype.changeType = function(){
    this.key = "bullet_"+this.type;
}
PlayerBullet.prototype.update = function(){
    if(this.position.y < 0){
        this.kill();
    }
}

PlayerBullet.prototype.reset = function(x,y,type){
    this.type = type;
    this.changeType();
    Phaser.Sprite.prototype.reset.call(this,x,y,"bullet_" + type);
    this.loadTexture(this.key);

}

