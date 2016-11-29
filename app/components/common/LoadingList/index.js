/**
 * Created by Howard on 2016/11/9.
 */

import styles from './styles.scss';
import React from 'react';

import _ from 'underscore';

/* eslint-disable react/prefer-stateless-function */
class LoadingList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.scrollHanderBinded = null;
        this.offsetDist = this.props.offset || 50; //底部触发加载的距离
        this.outer = null;
        this.isHalt = this.props.isHalt !== undefined ? this.props.isHalt : false;
        this.showLastNotice = this.props.showLastNotice === undefined ? true : this.props.showLastNotice;
    }

    componentDidMount() {
        this.addScrollEvent();
    }

    componentDidUpdate() {
        this.addScrollEvent();
    }

    componentWillUnmount() {
        //移除侦听
        if (this.scrollHanderBinded) {
            this.outer.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    addScrollEvent() {
        let that = this;
        that.outer = that.props.outer || null;

        if (!that.scrollHanderBinded && that.outer) {
            that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
            that.outer.addEventListener('scroll', that.scrollHanderBinded);
        }
    }

    scrollHandler() {
        console.log('this.props.loading:', this.props.isLoading,
            'this.isLast:', this.props.isLast, 'this.isHalt:', this.isHalt);

        if (this.outer && !this.isHalt) {
            // debugger;
            var outerH = this.outer ? this.outer.getBoundingClientRect().height : 0;

            var dist = this.outer.scrollHeight - (this.outer.scrollTop + outerH);
            console.log('dist:', dist);

            if (dist <= this.offsetDist && !this.props.isLast && !this.props.isLoading) {
                console.log('加载');
                this.props.loadHandler();
            }
        }
    }

    /**
     * 开始响应翻页
     */
    start() {
        this.isHalt = false;
    }

    /**
     * 暂停对翻页的响应
     */
    halt() {
        this.isHalt = true;
    }

    render() {

        let _loadingBar = '';

        if (this.props.isLast) {
            if (this.showLastNotice) {

                //条数长度大于一页时才显示此提示,否则隐藏,样式上好看一些
                if (this.outer && (this.outer.scrollHeight > this.outer.offsetHeight)) {
                    _loadingBar = <div className={styles.loadingBar}><span className={styles.noMore}>没有更多了</span></div>;
                }
            }
        } else {
            _loadingBar = <div className={styles.loadingBar}><i className={`${styles.loading} iconLoading`}></i>加载中
            </div>;
        }

        return (
            <div ref="J_Wrap" className={styles.wrap}>
                {this.props.children}
                {_loadingBar}
            </div>
        );
    }
}

LoadingList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

LoadingList.propTypes = {};

export default LoadingList;


