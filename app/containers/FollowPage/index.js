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
    selectMyFollowListLoading
} from './selectors';

import styles from './styles.scss';

import {
    loadMyFollowData,
    loadMyFollowListData,
    changeCurrentFollow,
} from './actions';

import TopListBar from 'components/FollowPage/TopListBar';
import MainContent from 'components/FollowPage/MainContent';

export class FollowPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    componentWillMount() {

        //首次加载数据，二次进入无须重复加载，用户可以手动刷新
        this.props.loadMyFollow();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="pageInner">
                <TopListBar {...this.props} />
                <MainContent {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    selectMyFollowData(),
    selectMyFollowListData(),
    selectCurrentFollow(),
    selectMyFollowLoading(),
    selectMyFollowListLoading(),
    (myFollowData, myFollowListData, currentFollow, myFollowLoading, myFollowListLoading) => {
        return {
            myFollowData,
            myFollowListData,
            currentFollow,
            myFollowLoading,
            myFollowListLoading
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        loadMyFollow: (page, currentFollow) => {

            var currentFollow = currentFollow || null;

            if (currentFollow &&
                currentFollow.id &&
                currentFollow.id !== -1 &&
                currentFollow.type) {
                dispatch(loadMyFollowData(page || 0, 10, currentFollow.id, currentFollow.type));
            } else {
                dispatch(loadMyFollowData(page || 0));
            }
        },
        loadMyFollowList: (page) => {
            dispatch(loadMyFollowListData(page || 0));
        },
        changeCurrentFollow: (data) => {
            dispatch(changeCurrentFollow(data));
        },
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowPage);
