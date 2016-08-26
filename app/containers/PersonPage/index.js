/*
 *
 * PersonPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectUserInfo,
} from './selectors';

import {
    loadUserData,
} from './actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import UserDesc from 'components/PersonPage/UserDesc';
import List from 'antd-mobile/lib/list';

export class PersonPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.personID = '';
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.personID = this.props.routeParams.id;
        }

        this.props.dispatch(loadUserData(this.personID));
    }

    componentDidMount() {
        console.warn('PersonPage DidMount');
    }

    userDescClickHandler() {
        console.log('click userDesc');
    }

    clickHandler() {
        console.log('link click');
    }

    clickToFansHandler() {

    }

    clickToFollowHandler() {

    }

    render() {
        let userInfo = this.props.userInfo || {};

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>个人主页</div>
                    <div data-btns>
                        {/*<div>关注</div>*/}
                    </div>
                </TopBar>
                <UserDesc userInfo={userInfo} clickHandler={this.userDescClickHandler.bind(this)}/>
                <UserArticle userInfo={userInfo}></UserArticle>
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
    selectUserInfo(),
    (userInfo) => ({userInfo})
), mapDispatchToProps)(PersonPage);
