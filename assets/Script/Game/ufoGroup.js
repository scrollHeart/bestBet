var Common = require('Common');

const ufoG = cc.Class({
  name: 'ufoG',
  properties: {
		name: '',
		prefab: cc.Prefab,
		freq: 0,
		poolAmount: 0
   } 
})
var ufoGroup = cc.Class({
	extends: cc.Component,
	properties: {
		ufoGroup: {
			default: [],
			type: ufoG
		},
		mainScript: {
			default: null,
			type: require('main')
		}
	},
	onLoad () {
		Common.batchInitNodePool(this, this.ufoGroup);
	},
	// ufo(加血，炸弹)展现到屏幕
	startAction (){
		for(let i = 0; i < this.ufoGroup.length; i++){
			let groupName = this.ufoGroup[i].name;
			let freq = this.ufoGroup[i].freq;
			this[groupName] = function (i) {
				this.genNewUfo(this.ufoGroup[i]);
			}.bind(this, i)
			this.schedule(this[groupName], freq);
		}
	},
	genNewUfo (ufoInfo){
		let poolName = ufoInfo.name + 'Pool';
		let newNode = Common.genNewNode(this[poolName], ufoInfo.prefab, this.node);
		let pos = this.getNewUfoPosition(newNode);
		newNode.setPosition(pos);
		newNode.getComponent('ufo').ufoGroup = this;
		// 初始化ufo状态
		newNode.getComponent('ufo').ufoInit();
	},
	getNewUfoPosition (newUfo){
		let randx = cc.randomMinus1To1() * (this.node.parent.width / 2 - newUfo.width);
		let randy = this.node.parent.height / 2 + newUfo.height / 2;
		return cc.v2(randx,randy);
	},
	// 销毁
	destroyUfo (node){
		Common.putBackPool(this, node);
	}
});
