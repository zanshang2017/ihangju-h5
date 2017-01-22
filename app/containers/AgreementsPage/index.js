/*
 *
 * AgreementsPage
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectAgreements,
} from './selectors';

import {
    loadAgreementsData,
    resetState,
} from './actions';

import styles from './styles.css';

import List from 'components/AgreementsPage/List';

import TopBar from 'components/common/TopBar';

export class AgreementsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        this.props.dispatch(loadAgreementsData());
    }

    componentDidMount() {
        console.warn('AgreementsPage DidMount');
    }

    componentWillUnmount() {
        this.props.dispatch(resetState());
    }

    setBg(isWhiteBg=false) {
        let node = ReactDOM.findDOMNode(this.refs.J_MainContent);

        if(isWhiteBg) {
            node.classList.add('whiteBg');
        } else {
            node.classList.remove('whiteBg');
        }
    }

    render() {
        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>版权</div>
                </TopBar>
                <div ref="J_MainContent" className="mainContent whiteBg">
                    <List {...this.props}
                          setBg={this.setBg.bind(this)}
                    ></List>
                </div>
            </div>
        );
    }
}

AgreementsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectAgreements(),
    (agreements) => ({agreements})
), mapDispatchToProps)(AgreementsPage);


