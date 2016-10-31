import React from 'react';

import styles from './styles.css';

import ArticleList from 'components/common/ArticleList';

import Result from 'antd-mobile/lib/page-result';

import _ from 'underscore';

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        this.scrollHanderBinded = null;
    }

    componentDidMount() {
        var that = this;
        var nWrap = this.refs.J_FollowPageMainContentWrap;
        that.nScrollOuter = nWrap.parentElement;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        that.nScrollOuter.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentDidUpdate() {
        //goTop
        if (this.page == 0) {
            this.nScrollOuter.scrollTop = 0;
        }
    }

    componentWillUnmount() {
        //移除侦听
        if (this.scrollHanderBinded) {
            this.nScrollOuter.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        // console.log('this.myFollowLoading:', this.props.myFollowLoading,
        //     'this.page:', this.page,
        //     'this.isLast:', this.isLast);

        var nWrap = this.refs.J_FollowPageMainContentWrap;
        var nWrapH = nWrap ? nWrap.getBoundingClientRect().height : 0;
        var nOuterH = this.nScrollOuter ? this.nScrollOuter.getBoundingClientRect().height : 0;

        var dist = nWrapH - (this.nScrollOuter.scrollTop + nOuterH);
        // console.log(this.nScrollOuter.scrollTop + nOuterH + '>=' + nWrapH);

        if ( dist <= 350 && !this.isLast && !this.props.myFollowLoading) {
            debugLog('加载');
            this.props.loadMyFollow(this.page + 1, this.props.currentFollow);
        }
    }

    articleClickHandler(e) {
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    render() {
        this.page = this.props.selectMyFollowDataStatus.get('page') || 0;
        this.isLast = this.props.selectMyFollowDataStatus.get('isLast') || false;

        let articles = this.props.myFollowData ? this.props.myFollowData.toJS() : [];
        let list = '';

        if (this.page == 0 && articles.length == 0) {
            // todo 替换图片
            list = <Result
                imgUrl="https://o82zr1kfu.qnssl.com/@/image/58131646e4b0edf1e7b90b10.png?imageMogr2/auto-orient/"
                title="还没有文章哦~"
            />
        } else {
            list = <ArticleList items={articles} articleClickHandler={this.articleClickHandler.bind(this)}/>
        }

        return (
            <div id="J_FollowPageMainContentWrap" ref="J_FollowPageMainContentWrap"
                 className={`${styles.followPageMainContent}`}>
                {list}
            </div>
        );
    }
}

MainContent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

MainContent.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default MainContent;

