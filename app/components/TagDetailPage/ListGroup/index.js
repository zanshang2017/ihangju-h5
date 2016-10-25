import React from 'react';

import styles from './styles.css';

import _ from 'underscore';

import TagArticleList from 'components/common/TagArticleList';

import {
    recommendationProject,
} from 'containers/TagDetailPage/actions';

import Tabs from 'antd-mobile/lib/tabs'; //todo 让antd只打包用到的组件

const TabPane = Tabs.TabPane;

const DATA_TYPE = {
    RECOMMENDATION: '1', //推荐作品
    ALL: '2', //全部作品
};

let nList = null,
    nTabs = null,
    nTabsHeight = null,
    activeKey = DATA_TYPE.RECOMMENDATION;

class ListGroup extends React.Component {

    constructor(props) {
        super(props);

        nList = null;
        nTabs = null;
        nTabsHeight = null;
        activeKey = DATA_TYPE.RECOMMENDATION;

        this.scrollHanderBinded = null;
        this.curPage = 0;
        this.isLast = false;
    }

    componentWillMount() {
    }

    componentDidMount() {
        var that = this;
        this.outerElement = this.refs.J_TagDetailPageListGroupWrap.parentElement.parentElement;
        this.innerElement = this.refs.J_TagDetailPageListGroupWrap.parentElement;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        that.outerElement && that.outerElement.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentWillUpdate(nProps) {

        if (!this.props.isAdmin) {
            activeKey = DATA_TYPE.ALL;
        }

        if (activeKey == DATA_TYPE.RECOMMENDATION) {
            this.curPage = this.props.recommendationListStatus.get('page') || 0;
            this.isLast = this.props.recommendationListStatus.get('isLast') || false;
        }

        if (!nProps.isAdmin || activeKey == DATA_TYPE.ALL) {
            this.curPage = this.props.projectListStatus.get('page') || 0;
            this.isLast = this.props.projectListStatus.get('isLast') || false;
        }
    }

    componentWillUnmount() {
        console.log('TagDetailPage.ListGroup: willUnmount.');

        //移除侦听
        if (this.scrollHanderBinded) {
            this.outerElement.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        let nWrap = this.outerElement;
        let nWrapH = nWrap.getBoundingClientRect().height;
        let nInner = this.innerElement;
        let nInnerH = nInner.getBoundingClientRect().height;
        let offsetHAbs = Math.abs((nWrap.scrollTop + nWrapH) - nInnerH);

        console.log(offsetHAbs, nWrap.scrollTop + nWrapH, nInnerH, this.props.recommendationListStatus.toJS(), this.props.projectListStatus.toJS());
        if (offsetHAbs < 1) {
            //加载下一页
            if (activeKey == DATA_TYPE.RECOMMENDATION && !this.props.recommendationListStatus.get('loading')) {
                let status = this.props.recommendationListStatus.toJS();
                this.isLast = status ? status.isLast : false;
                this.curPage = status ? status.page : 0;
                // console.log(this.isLast, this.curPage);
                if (!status.loading && !this.isLast) {
                    this.props.loadRecommendationHandler(this.curPage + 1);
                }
            }

            if (activeKey == DATA_TYPE.ALL && !this.props.projectListStatus.get('loading')) {
                let status = this.props.projectListStatus.toJS();

                this.isLast = status ? status.isLast : false;
                this.curPage = status ? status.page : 0;
                // console.log(this.isLast, this.curPage);
                if (!status.loading && !this.isLast) {
                    this.props.loadAllHandler(this.curPage + 1);
                }
            }
        }
    }

    tabChangeHandler(_activeKey) {
        activeKey = _activeKey;
        this.curPage = 0;

        switch (activeKey) {
            case DATA_TYPE.RECOMMENDATION:
                this.props.loadRecommendationHandler();
                break;

            case DATA_TYPE.ALL:
                this.props.loadAllHandler();
                break;

            default:
                break;
        }
    }

    recommendationHandler(projId, opt = {isRemove: false}) {
        if (opt.isRemove) {
            console.log(projId, this.props.tagID, 'remove');
            this.props.dispatch(recommendationProject(projId, this.props.tagID, opt.isRemove));
        } else {
            console.log(projId, this.props.tagID, 'add');
            this.props.dispatch(recommendationProject(projId, this.props.tagID));
        }
    }

    articleClickHandler(e) {
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    render() {

        let mainTag = '';

        if (this.props.hasAdmin) {
            mainTag =
                <Tabs ref="J_Tabs" defaultActiveKey="1" onChange={this.tabChangeHandler.bind(this)}>
                    <TabPane tab="推荐作品" key={DATA_TYPE.RECOMMENDATION}>
                        <TagArticleList items={this.props.recommendationList || []}
                                        recommendationHandler={this.recommendationHandler.bind(this)}
                                        isAdmin={this.props.isAdmin}
                                        articleClickHandler={this.articleClickHandler.bind(this)}/>
                    </TabPane>
                    <TabPane tab="全部作品" key={DATA_TYPE.ALL}>
                        <TagArticleList items={this.props.projectList || []}
                                        recommendationHandler={this.recommendationHandler.bind(this)}
                                        isAdmin={this.props.isAdmin}
                                        articleClickHandler={this.articleClickHandler.bind(this)} />
                    </TabPane>
                </Tabs>;
        } else {
            mainTag = <TagArticleList items={this.props.projectList || []}
                                      recommendationHandler={this.recommendationHandler.bind(this)}
                                      isAdmin={this.props.isAdmin}
                                      articleClickHandler={this.articleClickHandler.bind(this)}/>;
        }

        return (
            <div ref="J_TagDetailPageListGroupWrap" className={styles.tagDetailPageListGroup}>
                {mainTag}
            </div>
        );
    }
}

ListGroup.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

ListGroup.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default ListGroup;


