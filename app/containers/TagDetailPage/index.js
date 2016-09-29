/*
 *
 * TagDetailPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';

import {createSelector} from 'reselect';
import {
    selectProjectList,
    selectRecommendationList,
    selectDetail,
    selectRecommendationListStatus,
    selectProjectListStatus,
    selectIsEditing,
} from './selectors';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadTagList,
    loadTagRecommendationList,
    setRecommendationListStatus,
    setProjectListStatus,
    editTag,
    setEditing,
    setDetail,
    subTag,
    cancelSubTag,
    resetAllState,
} from './actions';

import TopBar from 'components/common/TopBar';
import BannerInfo from 'components/TagDetailPage/BannerInfo';
import TagDesc from 'components/TagDetailPage/TagDesc';
import ListGroup from 'components/TagDetailPage/ListGroup';

import {
    IMG_CDN_PATH
} from 'apis.js';

import styles from './styles.css';

class TagDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);

        this.topBarBtnHTML = '';
        this.detail = null;
        this.UserID = null;
        this.hasAdmin = false;
        this.isAdmin = false;
        this.isEditing = false;
        this.initialized = false;

        props.dispatch(resetAllState()); //重置state
    }

    doEdit() {
        // console.log('do编辑');
        this.props.dispatch(setEditing(true));
    }

    saveEdit() {
        // console.log('save编辑');
        let desc = this.refs.J_TagDesc.getDesc();
        let image = this.props.detail.get('tag_image');

        this.props.dispatch(setDetail({
            tag_description: desc
        }));
        this.props.dispatch(editTag(this.tagID, desc, image));
        this.props.dispatch(setEditing(false));
    }

    subTagHandler() {
        // console.log('关注');
        this.props.dispatch(subTag(this.tagID));
    }

    cancelSubTagHandler() {
        // console.log('取消关注');
        this.props.dispatch(cancelSubTag(this.tagID));
    }

    editBannerImageHandler(url) {
        console.log('banner上传成功', url);
        this.props.dispatch(setDetail({
            tag_image: url
        }));
    }

    loadRecommendationHandler(page = 0, size = 10) {
        // console.log('加载推荐标签', page, size);

        if (page == 0) {
            this.props.dispatch(setRecommendationListStatus({
                page: 0,
                isLast: false
            }));
        } else {
            this.props.dispatch(setRecommendationListStatus({
                page: page
            }));
        }

        this.props.dispatch(loadTagRecommendationList(this.tagID, page, size));
    }

    loadAllHandler(page = 0, size = 10) {
        // console.log('加载全部标签', page, size);

        if (page == 0) {
            this.props.dispatch(setProjectListStatus({
                page: 0,
                isLast: false
            }));
        } else {
            this.props.dispatch(setProjectListStatus({
                page: page
            }));
        }

        this.props.dispatch(loadTagList(this.tagID, page, size));
    }

    backHandler() {
        window.history.back();
        this.props.dispatch(setEditing(false));
    }

    componentWillMount() {
        if (this.props.userInfo) {
            this.userInfo = this.props.userInfo.toJS();
        } else {
            this.context.router.push('/login');
        }

        if (this.props.routeParams) {
            this.tagID = this.props.routeParams.id;
        }
    }

    componentDidMount() {
        // console.warn('TagDetailPage DidMount', this.isAdmin, this.tagID);
        this.props.dispatch(loadTagList(this.tagID));
    }

    componentWillUpdate(props) {

        // console.log('will update', props.detail);

        var that = this;


        if (props.detail) {
            this.detail = props.detail.toJS();

            if (!this.initialized) {
                this.initialized = true;
                this.UserID = this.userInfo.id;
                this.hasAdmin = this.detail.extistAdminstrator || false;
                this.isAdmin = false;

                if (this.hasAdmin
                    && this.detail.tagAdminstrators
                    && this.detail.tagAdminstrators.length > 0) {

                    this.detail.tagAdminstrators.forEach(function (v, i) {
                        if (that.UserID === v.id) {
                            that.isAdmin = true;
                        }
                    });
                }

                // console.log('this.isAdmin:', this.isAdmin);

                if (this.isAdmin) {
                    this.loadRecommendationHandler();
                }

            }

            this.isEditing = props.isEditing || false;

            if (this.isAdmin) {
                if (this.isEditing) {
                    this.topBarBtnHTML = <div onClick={this.saveEdit.bind(this)}>保存</div>;
                } else {
                    this.topBarBtnHTML = <div onClick={this.doEdit.bind(this)}>编辑</div>
                }
            } else {
                if (this.detail.isFollow) {
                    this.topBarBtnHTML = <div onClick={this.cancelSubTagHandler.bind(this)}>已关注</div>;
                } else {
                    this.topBarBtnHTML = <div onClick={this.subTagHandler.bind(this)}>关注</div>;
                }
            }

        }
    }

    componentWillUnmount() {
        // console.warn('TagDetailPage willUnmount');

        this.topBarBtnHTML = '';
        this.detail = null;
        this.UserID = null;
        this.hasAdmin = false;
        this.isAdmin = false;
        this.isEditing = false;
        this.initialized = false;
    }

    render() {
        // console.log('render', this.props.detail, this.isAdmin);
        let infoHTML = '';
        let descHTML = '';

        if (this.isAdmin) {
            infoHTML = <BannerInfo {...this.props}
                                   detail={this.detail}
                                   subTagHandler={this.subTagHandler.bind(this)}
                                   cancelSubTagHandler={this.cancelSubTagHandler.bind(this)}
                                   editBannerImageHandler={this.editBannerImageHandler.bind(this)}/>;

            descHTML =
                <TagDesc ref="J_TagDesc" {...this.props} description={this.detail ? this.detail.tag_description : ''}/>;
        }

        console.log('this.refs.J_Container', this.refs.J_Container);

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true" backHandler={this.backHandler.bind(this)}>
                    <div data-title>{this.detail && this.detail.tag_name || ''}</div>
                    <div data-btns>{this.topBarBtnHTML}</div>
                </TopBar>
                <div ref="J_Container" className="mainContent">
                    <div className={styles.mainContentInner}>
                        {infoHTML}
                        {descHTML}
                        <ListGroup {...this.props}
                                   tagID={this.tagID}
                                   isAdmin={this.isAdmin}
                                   loadRecommendationHandler={this.loadRecommendationHandler.bind(this)}
                                   loadAllHandler={this.loadAllHandler.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const mapStateToProps = createSelector(
    selectUserInfo(),
    selectProjectList(),
    selectRecommendationList(),
    selectDetail(),
    selectRecommendationListStatus(),
    selectProjectListStatus(),
    selectIsEditing(),
    (userInfo, projectList, recommendationList, detail, recommendationListStatus, projectListStatus, isEditing) => {
        return {
            userInfo,
            projectList,
            recommendationList,
            detail,
            recommendationListStatus,
            projectListStatus,
            isEditing,
        }
    }
);

TagDetailPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TagDetailPage);
