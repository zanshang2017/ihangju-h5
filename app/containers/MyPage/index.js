/*
 *
 * MyPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import selectMyPage from './selectors';
import styles from './styles.css';

export class MyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    componentDidMount() {
        console.warn('MyPage DidMount');
    }

    render() {
        return (
            <div className="pageInner">
                This is MyPage container !
            </div>
        );
    }
}

//const mapStateToProps = selectMyPage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectMyPage(),
    (myPage) => ({myPage})
), mapDispatchToProps)(MyPage);
//export default connect(null, mapDispatchToProps)(MyPage);
