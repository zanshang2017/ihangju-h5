import React from 'react';

import styles from './styles.css';

import ArticleList from 'components/common/ArticleList';

import _ from 'underscore';

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        this.scrollHanderBinded = null;
    }

    componentDidMount() {
        var that = this;
        var nWrap = that.refs.J_FollowPageMainContentWrap;

        //设置主内容区高度
        var contentH = document.body.clientHeight - document.getElementById('nav').getBoundingClientRect().height;
        if (nWrap.classList.contains('hasTopBar')) {
            contentH -= document.getElementById("J_followPageTopListBar").getBoundingClientRect().height;
        }
        // nWrap.style.height = contentH + 'px';
        nWrap.style.height = 570 + 'px';

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        nWrap.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentDidUpdate() {
        //goTop
        if(this.page == 0) {
            var nWrap = this.refs.J_FollowPageMainContentWrap;
            nWrap.scrollTop = 0;
        }
    }

    componentWillUnmount() {
        var nWrap = this.refs.J_FollowPageMainContentWrap;
        //移除侦听
        if (this.scrollHanderBinded) {
            nWrap.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {

        console.log('this.myFollowLoading:' , this.props.myFollowLoading,
            'this.page:', this.page,
            'this.isLast:', this.isLast);

        var winH = document.body.clientHeight;
        var nWrap = this.refs.J_FollowPageMainContentWrap;
        var nWrapH = nWrap.getBoundingClientRect().height;
        // console.log(nWrap.scrollTop, nWrapH, nWrap.scrollHeight);

        if (nWrap.scrollTop + nWrapH >= nWrap.scrollHeight - 1 && !this.isLast && !this.props.myFollowLoading) {
            this.props.loadMyFollow(this.page + 1, this.props.currentFollow);
        }
    }

    render() {
        this.page = this.props.selectMyFollowDataStatus.get('page');
        this.isLast = this.props.selectMyFollowDataStatus.get('isLast');

        var articles = this.props.myFollowData ? this.props.myFollowData.toJS() : [];

        return (
            <div id="J_FollowPageMainContentWrap" ref="J_FollowPageMainContentWrap"
                 className={`${styles.followPageMainContent} hasTopBar`}>
                <ArticleList items={articles}/>
            </div>
        );
    }
}

MainContent.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default MainContent;

