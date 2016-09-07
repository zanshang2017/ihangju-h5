import React from 'react';

import styles from './styles.css';

import _ from 'underscore';

import TagArticleList from 'components/common/TagArticleList';

import {
    recommendationProject,
} from 'containers/TagDetailPage/actions';

import Tabs from 'antd-mobile/lib/tabs';

const TabPane = Tabs.TabPane;

let nList = null,
    nTabs = null,
    nTabsHeight = null,
    activeKey = 1;

class ListGroup extends React.Component {

    constructor(props) {
        super(props);

        nList = null;
        nTabs = null;
        nTabsHeight = null;
        activeKey = 1;

        this.scrollHanderBinded = null;
        this.curPage = 0;
        this.isLast = false;
    }

    componentWillMount() {
    }

    componentDidMount() {
        var that = this;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        window.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentWillUpdate(nProps) {

        if (!this.props.isAdmin) {
            activeKey = 2;
        }

        if (activeKey == '1') {
            this.curPage = this.props.recommendationListStatus.get('page') || 0;
            this.isLast = this.props.recommendationListStatus.get('isLast') || false;
        }

        if (!nProps.isAdmin || activeKey == '2') {
            this.curPage = this.props.projectListStatus.get('page') || 0;
            this.isLast = this.props.projectListStatus.get('isLast') || false;
        }
    }

    componentWillUnmount() {
        console.log('TagDetailPage.ListGroup: willUnmount.');

        //移除侦听
        if (this.scrollHanderBinded) {
            window.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        var winH = document.body.clientHeight;
        var nWrap = document.body;
        var nWrapH = nWrap.getBoundingClientRect().height;

        // console.log(nWrap.scrollTop + nWrapH, nWrap.scrollHeight, this.props.recommendationListStatus.toJS(), this.props.projectListStatus.toJS());

        if (nWrap.scrollTop + nWrapH >= nWrap.scrollHeight) {
            //加载下一页
            if (activeKey == '1' && !this.props.recommendationListStatus.get('loading')) {
                let status = this.props.recommendationListStatus.toJS();
                this.isLast = status ? status.isLast : false;
                this.curPage = status ? status.page : 0;
                // console.log(this.isLast, this.curPage);
                if (!status.loading && !this.isLast) {
                    this.props.loadRecommendationHandler(this.curPage + 1);
                }
            }

            if (activeKey == '2' && !this.props.projectListStatus.get('loading')) {
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
            case '1':
                this.props.loadRecommendationHandler();
                break;

            case '2':
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

    render() {

        let mainTag = '';

        if (this.props.isAdmin) {
            mainTag = <Tabs ref="J_Tabs" defaultActiveKey="1" onChange={this.tabChangeHandler.bind(this)}>
                <TabPane tab="推荐作品" key="1">
                    <TagArticleList items={this.props.recommendationList || []}
                                    recommendationHandler={this.recommendationHandler.bind(this)}/>
                </TabPane>
                <TabPane tab="全部作品" key="2">
                    <TagArticleList items={this.props.projectList || []}
                                    recommendationHandler={this.recommendationHandler.bind(this)}/>
                </TabPane>
            </Tabs>;
        } else {
            mainTag = <TagArticleList items={this.props.projectList || []}
                                      recommendationHandler={this.recommendationHandler.bind(this)}/>;
        }

        return (
            <div id="J_TagDetailPageListGroupWrap" className="tagDetailPageListGroup">
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

export default ListGroup;


