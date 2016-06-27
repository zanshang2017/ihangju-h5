/**
 * Created by Howard on 16/6/17.
 *
 * 用于控制路由动画，主要解决由点击和返回键触发的正反向动画切换
 */

var useReverse = false,
    reverseSign = '-reverse';

var routeContext = {
    historyEffect: [] //save effect use before to a stack.
};

//检测到浏览器后退(只不过android端只有后退键）事件

window.addEventListener('popstate', function () {
    useReverse = true;
});

//export const FLIP_TIMEOUT = 400;
export const FLIP_TIMEOUT = 400; //时间

//无切换效果
export var NO_EFFECT = {
    className: 'flip-noEffect',
    timeout: -1
};

//从右向左
export var FLIP_FORWARD = {
    className: 'flip-right2left',
    timeout: FLIP_TIMEOUT
};

//从左向右
export var FLIP_BACK = {
    className: 'flip-right2left' + reverseSign,
    timeout: FLIP_TIMEOUT
};

export var routeEffector = {

    className: NO_EFFECT.className,
    timeout: NO_EFFECT.timeout,

    eq(effect){
        return this.className === effect.className;
    },

    set(conf){
        if (useReverse && routeContext.historyEffect.length) {
            var _effect = routeContext.historyEffect.pop();
            this.className = _effect.className + reverseSign || NO_EFFECT.className; //如果是回退，则用之前的反向效果
            this.timeout = _effect.timeout || NO_EFFECT.timeout;
            useReverse = false;
        } else {
            this.className = conf.className || NO_EFFECT.className;
            this.timeout = conf.timeout || NO_EFFECT.timeout;
            routeContext.historyEffect.push(conf);
        }
        //console.dir('historyStack:' + routeContext.historyClassName);
    },

    get(){
        return {
            className: this.className,
            timeout: this.timeout
        }
    },

    /**
     *  根据url hash自动配置路由效果，此方法建议在路由的onEnter方法中调用.
     *      - hash规则：
     *          - #flipRoute 切入效果，切入方向由是否由back键触发决定
     *          - #noEffectRoute 无效果
     */
        autoSet() {
        let hash = location.hash.toLowerCase();

        switch (hash) {
            case '#fliproute':
                this.set(FLIP_FORWARD);
                break;

            case '#noeffectroute':
            default:
                this.set(NO_EFFECT);
                break;
        }

    }
};



