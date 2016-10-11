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
} from './actions';

import _ from 'underscore';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import UserDesc from 'components/PersonPage/UserDesc';
import UserArticle from 'components/PersonPage/UserArticle';
import List from 'antd-mobile/lib/list';

class PersonPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.personID = '';
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.personID = this.props.routeParams.id;
        }

        this.props.dispatch(loadPersonData(this.personID));
    }

    componentDidMount() {
        console.warn('PersonPage DidMount');
    }

    componentWillUnmount() {
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
        let personInfo = this.props.personInfo.toJS();
        console.log(personInfo.userId, !personInfo.follow);
        this.props.dispatch(setFollowUser(personInfo.userId, !personInfo.follow));
    }

    letterClickHandler() {
        let myId = this.props.userInfo.toJS().id;
        let userId = this.props.personInfo.toJS().userId;
        this.context.router.push(`/dialogue/${myId}:${userId}`);
    }

    render() {
        let personInfo = (this.props.personInfo && this.props.personInfo.toJS()) || {};
        console.log('info', personInfo);
        let followUserCls = personInfo.follow ? styles.followedUser : styles.followUser;
        let btns = '';

        //当前用户自己不展示功能按钮
        if(this.props.userInfo.toJS().id !== personInfo.userId) {
            btns = <div><span className={`${styles.topBarBtn} ${followUserCls}`} onClick={_.throttle(this.followUserHandler.bind(this), 500, {leading: false})}></span>
                <span className={`${styles.topBarBtn} ${styles.letter}`} onClick={this.letterClickHandler.bind(this)}></span></div>;
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
