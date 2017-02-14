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

import LoadingList from 'components/common/LoadingList';
import List from 'components/FollowsListPage/List';

import TopBar from 'components/common/TopBar';

export class FollowsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
        this.page = 0;

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

    nextPageHandler() {
        if (this.id) {
            console.log('link click', this.page);
            this.props.dispatch(loadListData(this.id, ++this.page));
        }
    }

    followUserHandler(id, isToFollow) {
        console.log(id, isToFollow);
        this.props.dispatch(setFollowUser(id, isToFollow));
    }

    render() {
        let projs = this.props.followsList ? this.props.followsList.toJS() : {};
        console.log('projs', projs);
        let items = projs.data ? projs.data : [];
        let page = projs.page || 0;
        let isLast = projs.isLast || false;
        let loading = projs.loading || false;

        return (
            <div className="pageInner">
                <TopBar data-has-back="true">
                    <div data-title>关注</div>
                </TopBar>
                <div ref="J_MainContent" className="mainContent whiteBg">
                    <LoadingList outer={this.refs.J_MainContent || null}
                                 isLast={isLast}
                                 isLoading={loading}
                                 loadHandler={this.nextPageHandler.bind(this)}
                                 offset="350">
                        <List page={page}
                              isLast={isLast}
                              loading={loading}
                              items={items}
                              followUserHandler={this.followUserHandler.bind(this)}>
                        </List>
                    </LoadingList>
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
