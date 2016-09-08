/*
 *
 * DialogueListPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectLists,
} from './selectors';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadDialogueListData,
} from './actions';

import styles from './styles.css';

import List from 'components/DialogueListPage/List';

import TopBar from 'components/common/TopBar';

export class DialogueListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        this.props.dispatch(loadDialogueListData(userInfo.id));
    }

    componentDidMount() {
        console.warn('DialogueListPage DidMount');
    }

    render() {
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        let lists = this.props.lists ? this.props.lists.toJS() : {};
        let items = lists.data ? lists.data.letterGroups : [];
        let loading = lists.loading || false;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>私信</div>
                </TopBar>

                <List loading={loading} items={items} ></List>
            </div>
        );
    }
}

DialogueListPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectUserInfo(),
    selectLists(),
    (userInfo, lists) => ({userInfo, lists})
), mapDispatchToProps)(DialogueListPage);
//export default connect(null, mapDispatchToProps)(DialogueListPage);
