import React from 'react';

import styles from './styles.css';

import LoadingList from 'components/common/LoadingList';
import ArticleList from 'components/common/ArticleList';

import Result from 'antd-mobile/lib/page-result';

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        this.scrollHanderBinded = null;
        this.outer = null;
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        //goTop
        if (this.page == 0 && this.outer) {
            this.outer.scrollTop = 0;
        }

        // this.outer = this.refs.J_FollowPageMainContentWrap && this.props.getParentRef();
        // this.outer && this.refs.J_LoadingList.setOuter(this.outer);
    }

    componentWillUnmount() {
    }

    setOuter(outer) {
        this.outer = this.refs.J_FollowPageMainContentWrap && outer;
        this.outer && this.refs.J_LoadingList.setOuter(this.outer);
    }

    loadHandler() {
        if (!this.props.myFollowLoading) {
            this.props.loadMyFollow(this.page + 1, this.props.currentFollow);
        }
    }

    articleClickHandler(e) {
        //作品查看埋点
        zhuge.track('作品查看');
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    render() {
        this.page = this.props.selectMyFollowDataStatus.get('page') || 0;
        this.isLast = this.props.selectMyFollowDataStatus.get('isLast') || false;

        let articles = this.props.myFollowData ? this.props.myFollowData.toJS() : [];
        let list = '';

        if (this.page == 0 && articles.length == 0 && this.outer && !this.props.myFollowLoading) {
            list = <Result
                imgUrl="https://o82zr1kfu.qnssl.com/@/image/58131646e4b0edf1e7b90b10.png?imageMogr2/auto-orient/"
                title="还没有文章哦~"
            />
        } else {
            list = <LoadingList ref="J_LoadingList"
                                isLast={this.isLast}
                                isLoading={this.props.myFollowLoading}
                                loadHandler={this.loadHandler.bind(this)}
                                offset="350">
                <ArticleList items={articles} articleClickHandler={this.articleClickHandler.bind(this)}/>
            </LoadingList>;
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

