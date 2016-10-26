/*
 *
 * FollowPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createSelector} from 'reselect';

import {
    selectFollowPage,
    selectMyFollowData,
    selectMyFollowListData,
    selectCurrentFollow,
    selectMyFollowLoading,
    selectMyFollowListLoading,
    selectMyFollowDataStatus,
    selectMyFollowListDataStatus,
} from './selectors';

import {
    selectUserInfo,
} from '../App/selectors'

import styles from './styles.scss';

import {
    loadMyFollowData,
    loadMyFollowListData,
    changeCurrentFollow,
    setMyFollowDataStatus,
    setMyFollowListDataStatus,
} from './actions';

import TopListBar from 'components/FollowPage/TopListBar';
import MainContent from 'components/FollowPage/MainContent';

import Toast from 'antd-mobile/lib/toast';

export class FollowPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    componentWillMount() {
    }

    componentDidMount() {
        console.warn('FollowPage DidMount');

        var userInfo = this.props.userInfo;

        if (!userInfo) {
            this.context.router.replace('/login?redirect=' + encodeURIComponent('/') + 'follow');
            return;
        }

        if (!this.props.currentFollow) {
            this.loadMyFollow();
        }
    }

    loadMyFollow(page, currentFollow) {
        var currentFollow = currentFollow || null;

        if (!page) {
            this.props.dispatch(setMyFollowDataStatus({
                page: 0,
                isLast: false
            }));
        } else {
            this.props.dispatch(setMyFollowDataStatus({
                page: page
            }));
        }

        if (currentFollow &&
            currentFollow.id &&
            currentFollow.id !== -1 &&
            currentFollow.type) {
            this.props.dispatch(loadMyFollowData(page || 0, 10, currentFollow.id, currentFollow.type));
        } else {
            this.props.dispatch(loadMyFollowData(page || 0));
        }
    }

    render() {
        return (
            <div className="pageInner">
                <TopListBar {...this.props} />
                <div id="J_Container" ref="J_Container" className="mainContent">
                    <MainContent
                        ref="J_MainContent"
                        loadMyFollow={this.loadMyFollow.bind(this)}
                        {...this.props} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    selectUserInfo(),
    selectMyFollowData(),
    selectMyFollowListData(),
    selectCurrentFollow(),
    selectMyFollowLoading(),
    selectMyFollowListLoading(),
    selectMyFollowDataStatus(),
    selectMyFollowListDataStatus(),
    (userInfo, myFollowData, myFollowListData, currentFollow, myFollowLoading, myFollowListLoading, selectMyFollowDataStatus, selectMyFollowListDataStatus) => {
        return {
            userInfo,
            myFollowData,
            myFollowListData,
            currentFollow,
            myFollowLoading,
            myFollowListLoading,
            selectMyFollowDataStatus,
            selectMyFollowListDataStatus,
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        loadMyFollowList: (page) => {
            if (!page) {
                dispatch(setMyFollowListDataStatus({
                    page: 0,
                    isLast: false
                }));
            } else {
                dispatch(setMyFollowListDataStatus({
                    page: page
                }));
            }

            dispatch(loadMyFollowListData(page || 0));
        },
        changeCurrentFollow: (data) => {
            dispatch(changeCurrentFollow(data));
            dispatch(setMyFollowDataStatus({
                page: 0,
                isLast: false
            }));
            dispatch(setMyFollowListDataStatus({
                page: 0,
                isLast: false
            }));
            dispatch(loadMyFollowData(0, 10, data.id, data.type));
        },
        dispatch
    };
}

FollowPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowPage);
