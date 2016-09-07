/*
 *
 * FansListPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectFansList
} from './selectors';

import {
    loadListData
} from './actions';

import styles from './styles.css';

import FansList from 'components/FansListPage/List';

import TopBar from 'components/common/TopBar';

export class FansListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
        console.warn('FansListPage DidMount');
    }

    nextPageHandler(page = 0) {
        if (this.id) {
            console.log('link click', page);
            this.props.dispatch(loadListData(this.id, page));
        }
    }

    render() {
        let projs = this.props.fansList ? this.props.fansList.toJS() : {};
        let items = projs.data ? projs.data : [];
        let page = projs.page || 0;
        let isLast = projs.isLast || false;
        let loading = projs.loading || false;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>粉丝</div>
                </TopBar>
                <FansList page={page}
                                isLast={isLast}
                                loading={loading}
                                items={items}
                                nextPageHandler={this.nextPageHandler.bind(this)}></FansList>
            </div>
        );
    }
}

FansListPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectFansList(),
    (fansList) => ({fansList})
), mapDispatchToProps)(FansListPage);
//export default connect(null, mapDispatchToProps)(FansListPage);
