/*
 *
 * CommentsPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectCollectionProjs,
} from './selectors';

import {
    loadCommentsData,
} from './actions';

import styles from './styles.css';

import List from 'components/CommentsPage/List';
import TopBar from 'components/common/TopBar';

export class CommentsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.id = this.props.routeParams.id; //项目ID
        }

        if (this.id) {
            this.props.dispatch(loadCommentsData(this.id));
        }
    }

    componentDidMount() {
        console.warn('CommentsPage DidMount');
    }

    render() {
        let comments = this.props.comments ? this.props.comments.toJS() : {};
        let items = comments.data ? comments.data : [];
        let loading = comments.loading || false;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>评论</div>
                </TopBar>
                <List loading={loading} items={items}></List>

            </div>
        );
    }
}

CommentsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectCollectionProjs(),
    (comments) => ({comments})
), mapDispatchToProps)(CommentsPage);
//export default connect(null, mapDispatchToProps)(CommentsPage);
