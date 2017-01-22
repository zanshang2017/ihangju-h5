import React from 'react';

import styles from './styles.css';

import LoadingList from 'components/common/LoadingList';
import TagArticleList from 'components/common/TagArticleList';

import {
    recommendationProject,
} from 'containers/TagDetailPage/actions';

import Result from 'antd-mobile/lib/page-result';
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
        this.outerElement = this.refs.J_TagDetailPageListGroupWrap.parentElement.parentElement;
    }

    componentWillUpdate(nProps) {
        if (!this.props.isAdmin && !this.props.hasAdmin) {
            activeKey = DATA_TYPE.ALL;
        } else {
            activeKey = DATA_TYPE.RECOMMENDATION;
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
    }

    loadRecommendation() {
        let status = this.props.recommendationListStatus.toJS();
        this.isLast = status ? status.isLast : false;
        this.curPage = status ? status.page : 0;
        // console.log(this.isLast, this.curPage);
        if (!status.loading && !this.isLast) {
            this.props.loadRecommendationHandler(this.curPage + 1);
        }
    }

    loadProject() {
        let status = this.props.projectListStatus.toJS();
        this.isLast = status ? status.isLast : false;
        this.curPage = status ? status.page : 0;
        // console.log(this.isLast, this.curPage);
        if (!status.loading && !this.isLast) {
            this.props.loadAllHandler(this.curPage + 1);
        }
    }

    tabChangeHandler(_activeKey) {
        activeKey = _activeKey;
        this.curPage = 0;

        switch (activeKey) {
            case DATA_TYPE.RECOMMENDATION:
                this.props.loadRecommendationHandler();

                setTimeout(function () {
                    this.refs.J_ReommendationLoadingList && this.refs.J_ReommendationLoadingList.start();
                    this.refs.J_ProjectLoadingList && this.refs.J_ProjectLoadingList.halt();
                }.bind(this), 0);

                break;

            case DATA_TYPE.ALL:
                this.props.loadAllHandler();

                setTimeout(function () {
                    this.refs.J_ProjectLoadingList && this.refs.J_ProjectLoadingList.start();
                    this.refs.J_ReommendationLoadingList && this.refs.J_ReommendationLoadingList.halt();
                }.bind(this), 0);
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
        //作品查看埋点
        zhuge.track('作品查看');
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    render() {
        let noContent = <Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png?imageMogr2/auto-orient/"
            title="还没有内容哦~"/>;

        let mainTag = '';

        let recomendationHtml = '';
        let projectHtml = '';

        let recommendationListStatus = this.props.recommendationListStatus;
        this.isRecommendationLast = recommendationListStatus.get('isLast');
        this.isRecommendationLoading = recommendationListStatus.get('loading');
        this.recommendationList = this.props.recommendationList && this.props.recommendationList.toJS();

        let projectListStatus = this.props.projectListStatus;
        this.isProjectLast = projectListStatus.get('isLast');
        this.isProjectLoading = projectListStatus.get('loading');
        this.projectList = this.props.projectList && this.props.projectList.toJS();


        if (this.outerElement) {
            if (this.props.hasAdmin) {

                if (!this.isRecommendationLoading && this.isRecommendationLast && (this.recommendationList && this.recommendationList.length <= 0)) {
                    recomendationHtml = noContent;
                } else {
                    recomendationHtml = <LoadingList ref="J_ReommendationLoadingList"
                                                     name="J_ReommendationLoadingList"
                                                     outer={this.outerElement}
                                                     isLast={this.isRecommendationLast}
                                                     isLoading={this.isRecommendationLoading}
                                                     offset="300"
                                                     loadHandler={this.loadRecommendation.bind(this)}>
                        <TagArticleList items={this.props.recommendationList || []}
                                        recommendationHandler={this.recommendationHandler.bind(this)}
                                        isAdmin={this.props.isAdmin}
                                        articleClickHandler={this.articleClickHandler.bind(this)}/>
                    </LoadingList>;
                }

                if (!this.isProjectLoading && this.isProjectLast && (this.projectList && this.projectList.length <= 0)) {
                    projectHtml = noContent;
                } else {
                    projectHtml = <LoadingList ref="J_ProjectLoadingList"
                                               name="J_ProjectLoadingList"
                                               outer={this.outerElement}
                                               isLast={this.isProjectLast}
                                               isLoading={this.isProjectLoading}
                                               offset="300"
                                               loadHandler={this.loadProject.bind(this)}>
                        <TagArticleList items={this.props.projectList || []}
                                        recommendationHandler={this.recommendationHandler.bind(this)}
                                        isAdmin={this.props.isAdmin}
                                        articleClickHandler={this.articleClickHandler.bind(this)}/>
                    </LoadingList>;
                }

                mainTag =
                    <Tabs ref="J_Tabs" defaultActiveKey="1" onChange={this.tabChangeHandler.bind(this)}>
                        <TabPane tab="推荐作品" key={DATA_TYPE.RECOMMENDATION}>
                            {recomendationHtml}
                        </TabPane>
                        <TabPane tab="全部作品" key={DATA_TYPE.ALL}>
                            {projectHtml}
                        </TabPane>
                    </Tabs>;
            } else {

                if (!this.isProjectLoading && this.isProjectLast && (this.projectList && this.projectList.length <= 0)) {
                    mainTag = noContent;
                    document.querySelector('.mainContent').classList.add('whiteBg');
                } else {
                    mainTag = <LoadingList outer={this.outerElement}
                                           isLast={this.isProjectLast} isLoading={this.isProjectLoading}
                                           items={(this.props.projectList && this.props.projectList.toJS()) || []}
                                           offset="300"
                                           loadHandler={this.loadProject.bind(this)}>
                        <TagArticleList items={this.props.projectList || []}
                                        recommendationHandler={this.recommendationHandler.bind(this)}
                                        isAdmin={this.props.isAdmin}
                                        articleClickHandler={this.articleClickHandler.bind(this)}/>
                    </LoadingList>;

                    // document.querySelector('.mainContent').classList.remove('whiteBg');
                }

            }
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


