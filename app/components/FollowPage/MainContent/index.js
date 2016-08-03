import React from 'react';

import styles from './styles.css';

import ArticleList from 'components/common/ArticleList';

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
        nWrap.style.height = contentH + 'px';

        //滑动底部加载下一页
        that.scrollHanderBinded = that.scrollHandler.bind(that);
        nWrap.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentDidUpdate() {
        var that = this;
        var nWrap = that.refs.J_FollowPageMainContentWrap;

        //前一次加载结束后,重新侦听滑动
        if (!this.props.myFollowLoading) {
            that.scrollHanderBinded = that.scrollHandler.bind(that);
            nWrap.addEventListener('scroll', that.scrollHanderBinded);
        }
    }

    componentWillUnmount() {
    }

    scrollHandler(e) {
        var winH = document.body.clientHeight;
        var nWrap = this.refs.J_FollowPageMainContentWrap;
        var nWrapH = nWrap.getBoundingClientRect().height;
        // console.log(nWrap.scrollTop, nWrapH, nWrap.scrollHeight);
        if (nWrap.scrollTop + nWrapH >= nWrap.scrollHeight - 50) {

            //todo 加载下一页
            this.props.loadMyFollow(2, this.props.currentFollow);

            //移除侦听
            if (this.scrollHanderBinded) {
                nWrap.removeEventListener('scroll', this.scrollHanderBinded);
                this.scrollHanderBinded = null;
            }

        }
    }

    render() {

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

