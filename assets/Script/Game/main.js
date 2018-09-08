var Common = require('Common');
cc.Class({
	extends: cc.Component,
	properties: () =>({
		enemyGroup: {
			default: null,
			type:require('enemyGroup')
		},
		eatGroup: {
			default: null,
			type: require('eatGroup')
		},
		ufoGroup: {
			default: null,
			type: require('ufoGroup')
		},
		hero: {
			default: null,
			type: require('hero')
		},
		scoreDisplay: cc.Label,
		pause: cc.Button,
		pauseSprite: {
			default: [],
			type: cc.SpriteFrame,
			tooltip:'暂停按钮图片组',
		},
		bombAmount: cc.Label,
	}),   
	onLoad () {
		this.initState();
		this.eatGroup.startAction();
		this.enemyGroup.startAction();
		this.ufoGroup.startAction();
	},
	initState () {
		Common.commonState.pauseState = false;
		Common.commonState.bombAmount = 2;
		this.setBomb();
		Common.commonState.gameScore = 0;
	},
	setBomb (){
		this.bombAmount.string = 'x' + String(Common.commonState.bombAmount);
	},
	// 暂停
	handlePause (){
		
		if(Common.commonState.pauseState){
			this.pause.normalSprite = this.pauseSprite[0];
			this.pause.pressedSprite = this.pauseSprite[0];
			this.pause.hoverSprite = this.pauseSprite[0];
			// 开始正在运行的场景
			cc.director.resume();	
			// 添加Hero拖拽监听
			this.hero.onDrag();	
			return Common.commonState.pauseState = !Common.commonState.pauseState;

		}
		// 暂停正在运行的场景
		cc.director.pause();
		// 移除Hero拖拽监听
		this.hero.offDrag();
		// this.pause.node.getComponent('cc.Sprite').spriteFrame = this.pauseSprite[1];
		this.pause.normalSprite = this.pauseSprite[1];
		this.pause.pressedSprite = this.pauseSprite[1];
		this.pause.hoverSprite = this.pauseSprite[1];		
		return Common.commonState.pauseState = !Common.commonState.pauseState;

	},
	// 使用tnt炸弹
	useBomb (){
		if (Common.commonState.bombAmount > 0) {

			// 把当前的node.children 赋值给一个新的对象
			let enemy = new Array(...this.enemyGroup.node.children);
			
			for(let i = 0; i < enemy.length; i++) {
					enemy[i].getComponent('enemy').explodingAnim();
			}
			Common.commonState.bombAmount--;
			this.bombAmount.string = 'x' + String(Common.commonState.bombAmount);
		}
	},
	// 分数
	changeScore: function (score) {
		Common.commonState.gameScore += score;
		this.scoreDisplay.string = Common.commonState.gameScore.toString();
	},	
	// 游戏结束
	gameOver: function () {
		Common.clearAllPool();
		cc.director.loadScene('End');
	},		
});
