var Common = require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        newScore: {
            default: null,
            type: cc.Label,
        },
        restartBtn: {
            default: null,
            type: cc.Button,
        },
        gobackBtn: {
            default: null,
            type: cc.Button,
        },    
    },
    onLoad: function () {
        this.newScore.string = Common.commonState.gameScore ? Common.commonState.gameScore.toString() : '0';
    },
    reStart (){
        cc.director.loadScene('Game');
    },
    goBack (){
        cc.director.loadScene('Start');
    }
});
