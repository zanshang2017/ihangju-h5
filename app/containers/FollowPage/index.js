/*
 *
 * FollowPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createSelector} from 'reselect';

import {Env} from 'utils/env';

import {
    selectFollowPage,
    selectMyFollowData,
    selectMyFollowListData,
    selectCurrentFollow,
    selectMyFollowLoading,
    selectMyFollowListLoading,
    selectMyFollowDataStatus,
    selectMyFollowListDataStatus,
    selectViewState,
} from './selectors';

import {
    selectUserInfo,
} from '../App/selectors'

import signals from './signals';

import styles from './styles.scss';

import {
    loadMyFollowData,
    loadMyFollowListData,
    changeCurrentFollow,
    setMyFollowDataStatus,
    setMyFollowListDataStatus,
    setViewState,
} from './actions';

import TopListBar from 'components/FollowPage/TopListBar';
import MainContent from 'components/FollowPage/MainContent';

import PullRefresh from 'components/common/ReactPullRefresh'

export class FollowPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        debugLog('FollowPage constructor');
    }

    componentWillMount() {
        debugLog('FollowPage DidMount')
        console.log('FollowPage DidMount');

        var userInfo = this.props.userInfo;

        if (!userInfo) {
            this.context.router.push('/login?redirect=' + encodeURIComponent('/') + 'follow');
            return;
        }

        if (!this.props.currentFollow && !this.props.myFollowData) {
            this.loadMyFollow();
        }
    }

    componentDidMount() {
        if (this.props.selectViewState && this.refs.J_Container) {
            let vs = this.props.selectViewState.toJS();
            this.refs.J_Container.scrollTop = vs.scrollTop;
        }

        this.refs.J_MainContent.setOuter(this.refs.J_Container);
        this.refs.J_PullRefresh.reset();
    }

    saveViewState() {
        if (this.refs.J_Container) {
            this.props.dispatch(setViewState({scrollTop: this.refs.J_Container.scrollTop}));
        }
    }

    componentWillUnmount() {
        debugLog('FollowPage WillUnmount');

        this.saveViewState();
        this.removeSignals();
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

    refreshHandler() {
        return new Promise((resolve, reject) => {
            this.loadMyFollow(0, this.props.currentFollow);

            signals.onMyFollowLoadSuccess.add(()=> {
                this.removeSignals();
                clearTimeout(flag);
                resolve();
            });

            signals.onMyFollowLoadFail.add(()=> {
                this.removeSignals();
                clearTimeout(flag);
                reject();
            });

            //超时
            let flag = setTimeout(() => {
                this.removeSignals();
                reject();
            }, 15 * 1e3);

        });
    }

    removeSignals() {
        signals.onMyFollowLoadSuccess.removeAll();
        signals.onMyFollowLoadFail.removeAll();
    }

    render() {

        return (
            <div className="pageInner">
                <TopListBar {...this.props} />
                <div id="J_Container" ref="J_Container" className="mainContent">
                    <PullRefresh ref="J_PullRefresh" refreshCallback={this.refreshHandler.bind(this)}>
                        <MainContent
                            ref="J_MainContent"
                            loadMyFollow={this.loadMyFollow.bind(this)}
                            {...this.props} />
                    </PullRefresh>
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
    selectViewState(),
    (userInfo, myFollowData, myFollowListData, currentFollow, myFollowLoading, myFollowListLoading, selectMyFollowDataStatus, selectMyFollowListDataStatus, selectViewState) => {
        return {
            userInfo,
            myFollowData,
            myFollowListData,
            currentFollow,
            myFollowLoading,
            myFollowListLoading,
            selectMyFollowDataStatus,
            selectMyFollowListDataStatus,
            selectViewState,
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
