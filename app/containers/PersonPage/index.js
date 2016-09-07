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
import UserArticle from 'components/PersonPage/UserArticle';
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
                <UserDesc userInfo={userInfo}
                          fansClickHandler={this.fansClickHandler.bind(this)}
                          followsClickHandler={this.followsClickHandler.bind(this)}
                />
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
