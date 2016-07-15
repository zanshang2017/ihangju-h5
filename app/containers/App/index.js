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

import { Env } from '../../utils/env.js';

import {
    selectShowNav
} from './selectors.js';

import '../../routes';
import TabBar from 'components/App/TabBar';

import styles from './style.scss';

/* eslint-disable react/prefer-stateless-function */
export default class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.node
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(Env.debug){
            openLog();
        }
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
                <div id="logPanel" className="logPanel hide unfold" >
                    <a href="javascript:void(0);" className="btn" id="toggle">打开/关闭</a>
                    <div className="content"></div>
                </div>
                <TabBar showNav={this.props.showNav}/>
            </div>
        );
    }
}


function openLog(){
    //log
    var nLog = document.querySelector('#logPanel');
    var nCont = nLog.querySelector('.content');
    var nBtn = document.querySelector('#toggle');

    nLog.classList.remove('hide');
    nBtn.addEventListener('touchstart', function(){
        if(nLog.classList.contains('unfold')){
            nLog.classList.remove('unfold');
        } else {
            nLog.classList.add('unfold');
        }
    });

    //setInterval(function(){
    //    nCont.innerHTML = Math.random() + '';
    //}, 300);
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
