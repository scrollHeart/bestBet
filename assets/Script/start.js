cc.Class({
    extends: cc.Component,

    properties: {
        button: {
            default: null,
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('Game');
    },
    startGame: function(){
        cc.director.loadScene('Game');
    },
    // called every frame
    update: function (dt) {

    },
});
