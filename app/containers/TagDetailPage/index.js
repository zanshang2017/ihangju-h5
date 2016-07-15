/*
 *
 * TagDetailPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectTagDetailPage from './selectors';
import styles from './styles.css';

export class TagDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="pageInner">
                xxx:{this.props.routeParams.id}
            </div>
        );
    }
}

//const mapStateToProps = selectTagDetailPage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectTagDetailPage(),
    (tagDetailPage) => ({tagDetailPage})
), mapDispatchToProps)(TagDetailPage);
//export default connect(null, mapDispatchToProps)(TagDetailPage);
