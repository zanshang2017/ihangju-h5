/**
 * 借助ios原生滚动实现下拉刷新,由于使用原生惯性滚动,因此不支持android.
 *
 * bug: 当列表条数小于当前容器高度时,原生滚动条不工作,无法完成后续的下拉流程。
 *
 *
 */
import styles from './styles.scss';

class PullRefresh {
    static defaultOptions = {
        lockInTime: 800, //延迟刷新或加载
        maxAmplitude: 120, //设置上下滑动最大弹性振幅度，单位为像素，默认为 80 像素
    };

    constructor(options) {
        let _options = {...options};
        Object.keys(_options).forEach((item) => {
            if (_options[item] === undefined) {
                delete _options[item];
            }
        });

        this.options = {...PullRefresh.defaultOptions, ..._options};
        const {container, ptrEl} = _options;

        this.container = container;
        this.parentContainer = container.parentElement;

        this.ptrEl = ptrEl;

        if (ptrEl) {
            this.imgEl = ptrEl.querySelector(`.${styles['rc-ptr-image']}`);
        }

        this.initBool();

        // this.onscroll = this.onscroll.bind(this);
        this.ontouchstart = this.ontouchstart.bind(this);
        this.ontouchmove = this.ontouchmove.bind(this);
        this.ontouchend = this.ontouchend.bind(this);

        this.resetPtr = this.resetPtr.bind(this);

        this.initEvents();
    }

    initBool() {
        this.isNeedUnbind = this.parentContainer.offsetHeight < this.parentContainer.scrollHeight;
        this.loading = false;
        this.isOnstartAdded = false;
    }

    //初始化事件
    initEvents() {
        // this.parentContainer.addEventListener('scroll', this.onscroll); //不需要了
        this.parentContainer.addEventListener('touchstart', this.ontouchstart, false);
        this.parentContainer.addEventListener('touchend', this.ontouchend, true);

        setTimeout(()=> {
            if (this.parentContainer.scrollTop <= 0) {
                console.log('initEvent,绑定!', this.parentContainer.scrollTop);
                this.addTouchmove();
            }
        }, 0);
    }

    // onscroll(e) {
    //     // console.log('scrollTop', this.parentContainer.scrollTop);
    //     // debugLog('this.parentContainer.scrollTop:' + this.parentContainer.scrollTop);
    //     this.isTouchTop = (this.parentContainer.scrollTop == 0);
    //
    //     if (this.isTouchTop && this.isNeedUnbind) {
    //         console.log('在顶部,绑定!');
    //         this.addTouchmove();
    //     }
    // }

    addTouchmove() {
        if (!this.isOnstartAdded) {
            this.parentContainer.addEventListener('touchmove', this.ontouchmove, false);
            this.isOnstartAdded = true;
        }
    }

    removeTouchmove() {
        if (this.isOnstartAdded) {
            // console.log('解绑')
            this.parentContainer.removeEventListener('touchmove', this.ontouchmove, false);
            this.isOnstartAdded = false;
        }
    }

    ontouchstart(e) {
        this.touchStartY = e.touches[0].pageY || 0;

        if (this.parentContainer.scrollTop <= 0 && this.isNeedUnbind) {
            console.log('在顶部,绑定!');
            this.addTouchmove();
        } else {
            this.removeTouchmove();
        }
    }

    ontouchmove(e) {
        if (this.loading) {
            return;
        }

        this.touchMoveY = e.touches[0].pageY;
        let dist = this.touchStartY - this.touchMoveY;

        if (dist < 0) {
            this.isMoveBottom = true; //向下拉
        } else {
            this.isMoveBottom = false;
        }

        if (!this.isMoveBottom && this.isOnstartAdded && this.isNeedUnbind) {
            debugLog('方向相反,解绑!');
            this.removeTouchmove();
            return;
        }

        e.preventDefault();
        let _dist = -(dist / 2);
        this.container.style.webkitTransform = 'translate3d(0, ' + (_dist) + 'px, 0)';
        this.container.style.transform = 'translate3d(0, ' + (_dist) + 'px, 0)';
        // return;

        let top = this.container.scrollTop;
        const maxAmplitude = this.options.maxAmplitude;
        const refresh = this.options.refresh;

        // console.log(this.container.scrollHeight, this.container.clientHeight, this.container.scrollTop);
        // debugLog(this.container.scrollHeight + ' - ' + this.container.clientHeight + ' - ' + top + '<' + (-maxAmplitude / 2));

        if (refresh) {
            const style = this.ptrEl.style;
            if (top < 0 && top >= -maxAmplitude) {
                // style.webkitTransform = `translate3d(0, ${-top}px, 0)`;
                // style.transform = `translate3d(0, ${-top}px, 0)`;
            } else {
                style.webkitTransform = 'translate3d(0, 0, 0)';
                style.transform = 'translate3d(0, 0, 0)';
            }
            if (dist < -maxAmplitude / 2) {//开启刷新
                this.enableLoading = true;
                this.imgEl.classList.add(`${styles['rc-ptr-rotate']}`);
            } else {
                this.enableLoading = false;
                this.imgEl.classList.remove(`${styles['rc-ptr-rotate']}`)
            }
        }
    }

    ontouchend(e) {
        if (!this.touchMoveY) {
            return;
        }

        let dist = this.touchStartY - this.touchMoveY;
        // const top = -this.parentContainer.scrollTop; // +
        const refresh = this.options.refresh;

        if (refresh) {
            if (dist < 0) { //向上滑动，刷新
                this.refresh(e);
            } else {
                this.resetPtr(false);
            }
        }

        this.touchMoveY = 0;
    }

    refresh(e) {
        var that = this;

        if (!this.enableLoading) {
            this.resetPtr();
            return;
        }
        if (e) {
            e.stopImmediatePropagation();
        }

        if (this.loading) {
            return;
        }
        this.loading = true;

        debugLog('刷新');

        const maxAmplitude = this.options.maxAmplitude;
        // const cstyle = that.parentContainer.lastElementChild.style;
        const cstyle = that.container.style;
        // debugger;
        // const cstyle = that.container.style;
        cstyle.transition = 'transform .2s ease';
        cstyle.webkitTransition = '-webkit-transform .2s ease';
        cstyle.webkitTransform = `translate3d(0, ${maxAmplitude / 2}px, 0)`;
        cstyle.transform = `translate3d(0, ${maxAmplitude / 2}px, 0)`;

        this.imgEl.classList.add(`${styles['rc-ptr-loading']}`, 'iconLoading');

        const options = this.options;
        const {lockInTime, refreshCallback} = options;
        if (refreshCallback && typeof refreshCallback === 'function') {
            if (lockInTime > 0) {
                clearTimeout(this.refreshTimoutId);
                this.refreshTimoutId = setTimeout(() => {
                    refreshCallback().then(this.resetPtr, this.resetPtr);
                }, lockInTime);
            } else {
                refreshCallback().then(this.resetPtr, this.resetPtr);
            }
        }
    }

    resetPtr() {
        this.enableLoading = false;
        this.loading = false;
        this.imgEl.className = `${styles['rc-ptr-image']}`;

        // const cstyle = this.parentContainer.lastElementChild.style;
        const cstyle = this.container.style;

        cstyle.transition = 'transform .3s linear';
        cstyle.webkitTransition = '-webkit-transform .3s linear';
        cstyle.webkitTransform = `translate3d(0, 0, 0)`;
        cstyle.transform = `translate3d(0, 0, 0)`;

        setTimeout(()=> {
            cstyle.transition = cstyle.webkitTransition = '';
        }, 400);
    }

    /**
     *
     */
    reset() {
        console.log('PullRefresh reset!!!');
        this.initBool();
        this.unmount();
        this.initEvents();
    }

    unmount() {
        this.parentContainer.removeEventListener('scroll', this.onscroll);
        this.parentContainer.removeEventListener('touchstart', this.ontouchstart, false);
        this.parentContainer.removeEventListener('touchmove', this.ontouchmove, false);
        this.parentContainer.removeEventListener('touchend', this.ontouchend, true);
    }
}

export default PullRefresh;
