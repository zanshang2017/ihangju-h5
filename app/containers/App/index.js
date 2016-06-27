/**
 * App.react.js
 */

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ReactCSSTransitionGroup from '../../../node_modules/react/lib/ReactCSSTransitionGroup';
import {
    routeEffector,
    NO_EFFECT,
    FLIP_FORWARD,
    FLIP_BACK
} from '../../utils/routeEffect.js';

import {
    selectShowNav
} from './selectors.js';

import '../../routes';
import NavBar from 'components/App/NavBar';

import styles from './style.scss';

/* eslint-disable react/prefer-stateless-function */
export default class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.node
    };

    constructor(props) {
        super(props);
    }

    render() {
        let pageClass;

        if (this.props.showNav) {
            pageClass = 'page';
        } else {
            pageClass = 'page-noNav';
        }

        return (
            <div ref="pageTransitionWrap" className={routeEffector.className}>
                <div className={pageClass}>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="flip"
                        transitionEnterTimeout={routeEffector.timeout}
                        transitionLeaveTimeout={routeEffector.timeout}
                        >
                        {React.cloneElement(this.props.children, {
                            key: this.props.location.pathname
                        })}
                    </ReactCSSTransitionGroup>
                </div>

                <NavBar showNav={this.props.showNav}/>
            </div>
        );
    }
}


const mapStateToProps = createSelector(
    selectShowNav(),
    (showNav) => {
        return {
            showNav,
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
