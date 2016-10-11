/*
 *
 * FollowsListPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectFollowsList
} from './selectors';

import {
    loadListData,
    setFollowUser,
} from './actions';

import styles from './styles.css';

import List from 'components/FollowsListPage/List';

import TopBar from 'components/common/TopBar';

export class FollowsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.id = this.props.routeParams.id;
        }

        if (this.id) {
            this.props.dispatch(loadListData(this.id));
        }
    }

    componentDidMount() {
        console.warn('FollowsListPage DidMount');
    }

    nextPageHandler(page = 0) {
        if (this.id) {
            console.log('link click', page);
            this.props.dispatch(loadListData(this.id, page));
        }
    }

    followUserHandler(id, isToFollow) {
        console.log(id, isToFollow);
        this.props.dispatch(setFollowUser(id, isToFollow));
    }

    render() {
        let projs = this.props.followsList ? this.props.followsList.toJS() : {};
        let items = projs.data ? projs.data : [];
        let page = projs.page || 0;
        let isLast = projs.isLast || false;
        let loading = projs.loading || false;

        return (
            <div className="pageInner">
                <TopBar data-has-back="true">
                    <div data-title>关注</div>
                </TopBar>
                <div className="mainContent">
                    <List page={page}
                          isLast={isLast}
                          loading={loading}
                          items={items}
                          nextPageHandler={this.nextPageHandler.bind(this)}
                          followUserHandler={this.followUserHandler.bind(this)}>
                    </List>
                </div>
            </div>
        );
    }
}

FollowsListPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectFollowsList(),
    (followsList) => ({followsList})
), mapDispatchToProps)(FollowsListPage);
//export default connect(null, mapDispatchToProps)(FollowsListPage);
