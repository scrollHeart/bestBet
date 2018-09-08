var Common = require('Common');
cc.Class({
    extends: cc.Component,
    properties: () =>({
      mainScript: {
        default: null,
        type: require('main')
      },  
      HPBar: {
        default: null,
        type: cc.ProgressBar
      }
    }),
    onLoad () {
      // 监听拖动事件
      this.onDrag();
      // 获取碰撞检测系统
      let manager = cc.director.getCollisionManager();
      // 开启碰撞检测系统
      manager.enabled = true;     
    },
    onDrag () {
      this.node.on('touchmove', this.onHandleHeroMove, this);
    },
    // 去掉拖动监听
    offDrag () {
      this.node.off('touchmove', this.onHandleHeroMove, this);
    },
    onHandleHeroMove (event) {
      // touchmove事件中 event.getLocation() 获取当前已左下角为锚点的触点位置（world point）
      let position = event.getLocation();
      // 实际hero是background的子元素，所以坐标应该是随自己的父元素进行的，所以我们要将“world point”转化为“node point”
      let location = this.node.parent.convertToNodeSpaceAR(position);
      this.node.setPosition(location);
    },
    onCollisionEnter (other, self) {
      if(other.node.group == 'enemy'){ 

        switch (other.node.name){      
          case 'shit':
            this.HPBar.progress -= 0.1;
            break;
          case 'boss':
            this.HPBar.progress -= 0.5;
            break; 
        }
      
        if(this.HPBar.progress <= 0){
          this.onHandleDestroy();
        }
      }
      if(other.node.group == 'ufo'){
        // 若是心❤️，就加血        
        if(other.node.name == 'heart'){
          if(this.HPBar.progress > 0.5){
            this.HPBar.progress = 1
          }else{
            this.HPBar.progress += 0.5;
          }
        }
        // 若是炸弹💣，加入到屏幕下方的炸弹库
        if(other.node.name == 'mines'){
          Common.commonState.bombAmount += 1;
          this.mainScript.setBomb();
        }
      }
      if(other.node.group == 'eatGroup'){
        // 计算得分
        let groupNode = other.node.parent;
        let score = groupNode.getComponent('eat').score;
        this.mainScript.changeScore(score);
        
      // 可视化销毁 "eatGroup"组节点
        this.mainScript.eatGroup.destroyGroup(other.node, other.node.group, other.node.name);        
      }
      if(other.node.group == 'eat'){
        let score = other.node.getComponent('eat').score;
        this.mainScript.changeScore(score);             
      }
    },
    onHandleDestroy: function () {
      // 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应
      this.offDrag();
      // 游戏结束转场
      this.mainScript.gameOver();
  }    
});
