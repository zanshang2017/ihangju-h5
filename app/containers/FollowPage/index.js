/*
 *
 * FollowPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import selectFollowPage from './selectors';
import styles from './styles.scss';

export class FollowPage extends React.Component { // eslint-disable-line react/prefer-stateless-function


    componentDidMount() {
        //console.log('follow did mout', location.href);
    }

    render() {
        return (
            <div className="pageInner">
                This is FollowPage container !
            </div>
        );
    }
}

export default connect()(FollowPage);
//export default FollowPage;
