/*
 *
 * FoundPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import selectFollowPage from './selectors';

import Banner from 'components/FoundPage/Banner/index.js'
import Tabs from 'components/FoundPage/Tabs/index.js'

import styles from './styles.scss';

export class FollowPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {

        return (
            <div className="pageInner">
                <Banner />
                <Tabs />
                <Link to={'/'}>login</Link>
                <br/>
                <Link to="/follow">follow</Link><br/>

                <Link to="/found">found</Link>
            </div>
        );
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(FollowPage);
export default FollowPage;
