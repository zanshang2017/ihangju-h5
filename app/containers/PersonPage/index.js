/*
 *
 * PersonPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectPersonInfo,
} from './selectors';

import {
    selectUserInfo
} from 'containers/App/selectors';

import {
    loadPersonData,
    setFollowUser,
    resetState,
} from './actions';

import _ from 'underscore';

import signals from './signals';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import UserDesc from 'components/PersonPage/UserDesc';
import UserArticle from 'components/PersonPage/UserArticle';

import Toast from 'antd-mobile/lib/toast';

class PersonPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.personID = '';
        this.isFollowRequesting = false;
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.personID = this.props.routeParams.id;
        }

        this.props.dispatch(loadPersonData(this.personID));
    }

    componentDidMount() {
        var that = this;

        console.warn('PersonPage DidMount');

        signals.followRequestComplete.add(()=> {
            that.isFollowRequesting = false;
        });
    }

    componentWillUnmount() {
        this.props.dispatch(resetState());
    }

    fansClickHandler() {
        if (this.personID) {
            this.context.router.push('/fanslist/' + this.personID);
        }
    }

    followsClickHandler() {
        console.log('click followsClickHandler', this.personID);
        if (this.personID) {
            this.context.router.push('/followslist/' + this.personID);
        }
    }

    articleClickHandler(e) {
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    followUserHandler() {
        if (this.isFollowRequesting) return;
        this.isFollowRequesting = true;

        let personInfo = this.props.personInfo.toJS();

        console.log(personInfo.userId, !personInfo.follow);
        let noticeStr = personInfo.follow ? '正在取消关注' : '正在关注';

        try {
            Toast.loading(noticeStr);
        } catch(e){
        }

        this.props.dispatch(setFollowUser(personInfo.userId, !personInfo.follow));
    }

    letterClickHandler() {
        let userId = this.props.personInfo.toJS().userId;
        this.context.router.push(`/dialogue/${userId}`);
    }

    render() {
        let personInfo = (this.props.personInfo && this.props.personInfo.toJS()) || {};
        let followUserCls = personInfo.follow ? styles.followedUser : styles.followUser;
        let btns = '';

        //当前用户自己不展示功能按钮
        if (personInfo.userId && this.props.userInfo.toJS().id !== personInfo.userId) {
            btns = <div><span className={`${styles.topBarBtn} ${followUserCls}`}
                              onClick={_.throttle(this.followUserHandler.bind(this), 500, {leading: false})}></span>
                <span className={`${styles.topBarBtn} ${styles.letter}`}
                      onClick={this.letterClickHandler.bind(this)}></span></div>;
        }

        return (
            <div className="pageInner">
                <TopBar data-has-back="true">
                    <div data-title>个人主页</div>
                    <div data-btns>{btns}</div>
                </TopBar>
                <div className="mainContent">
                    <UserDesc personInfo={personInfo}
                              fansClickHandler={this.fansClickHandler.bind(this)}
                              followsClickHandler={this.followsClickHandler.bind(this)}
                    />
                    <div className="blockGapTag"></div>
                    <UserArticle personInfo={personInfo}
                                 articleClickHandler={this.articleClickHandler.bind(this)}></UserArticle>
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

PersonPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(createSelector(
    selectPersonInfo(),
    selectUserInfo(),
    (personInfo, userInfo) => ({personInfo, userInfo})
), mapDispatchToProps)(PersonPage);
