
cc.Class({
	extends: cc.Component,
	properties: {
		speedMax: 0,
		speedMin: 0,
		initSpriteFrame: {
			default: null,
			type: cc.SpriteFrame,
			tooltip: '初始化图像'
		},

	},
	onLoad () {
		// 速度随机[speedMax, speedMin]
		this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin;
		// 开启碰撞系统
		let manager = cc.director.getCollisionManager();
		manager.enabled = true;
		this.ufoInit();
	},
	ufoInit () {
		let nSprite = this.node.getComponent(cc.Sprite);
		if(nSprite.SpriteFrame != this.initSpriteFrame){
			nSprite.SpriteFrame = this.initSpriteFrame;
		}
	},
	//碰撞检测
	onCollisionEnter (other, self){
		this.onHandleDestroy();
	},
	update (dt) {
		this.node.y -= dt * this.speed;
		//出屏幕后 回收节点
		if(this.node.y < -this.node.parent.height / 2){
			this.ufoGroup.destroyUfo(this.node);
		}
	},
	onHandleDestroy (){
		this.ufoGroup.destroyUfo(this.node);
	}
});
