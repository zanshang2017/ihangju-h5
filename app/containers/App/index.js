/**
 * App.react.js
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import ReactCSSTransitionGroup from '../../../node_modules/react/lib/ReactCSSTransitionGroup';
import {
    routeEffector,
    NO_EFFECT,
    FLIP_FORWARD,
    FLIP_BACK
} from '../../utils/routeEffect.js';

import {Env} from '../../utils/env.js';

import {
    setUserInfo
} from './actions.js';

import {
    selectGlobal,
    selectUserInfo,
    selectShowNav,
    selectCurPage,
    selectLoading,
    selectError,
    selectLocationState,
} from './selectors.js';

import '../../routes';
import TabBar from 'components/App/TabBar';

import {
    locStorage
} from 'utils/util';

import styles from './style.scss';

/* eslint-disable react/prefer-stateless-function */
export default class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.node
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //获取保存的用户信息
        var userInfo = null;

        try {
            userInfo = JSON.parse(locStorage.get('userInfo'));
        } catch (e) {
            alert(e);
        }

        if (userInfo && userInfo.id) {
            this.props.dispatch(setUserInfo(userInfo));
        }
    }

    componentDidMount() {

        if (Env.debug) {
            openLog();
        }

        console.warn('App DidMount');

        //模拟hover
        (function () {
            var hoveredElement = [];

            // document.body.addEventListener('touchstart', function (e) {
            //     var node = e.target;
            //     if (node.nodeType == 1 && node.nodeName.toLowerCase() == 'a') {
            //         node.classList.add('hover');
            //         hoveredElement.push(node);
            //         e.stopPropagation();
            //     }
            // });
            //
            // document.body.addEventListener('touchend', function (e) {
            //     if (hoveredElement.length > 0) {
            //         hoveredElement.forEach(function (v, k) {
            //             v.classList.remove('hover');
            //         });
            //     }
            //     hoveredElement.length = 0;
            // }, true);

        })();

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
                <div id="logPanel" className="logPanel none unfold">
                    <a href="javascript:void(0);" className="btn" id="toggle">打开/关闭</a>
                    <div className="content"></div>
                </div>
                <TabBar showNav={this.props.showNav} curPage={this.props.curPage || ''}/>
            </div>
        );
    }
}


function openLog() {
    //log
    var nLog = document.querySelector('#logPanel');
    var nCont = nLog.querySelector('.content');
    var nBtn = document.querySelector('#toggle');

    nLog.classList.remove('hide');
    nBtn.addEventListener('touchstart', function () {
        if (nLog.classList.contains('unfold')) {
            nLog.classList.remove('unfold');
        } else {
            nLog.classList.add('unfold');
        }
    });

    setInterval(function () {
        nCont.innerHTML = history.length + '\n' + history.state.key;

        // nCont.innerHTML = Math.random() + '';
    }, 2);

    return nCont;
}

const mapStateToProps = createSelector(
    selectGlobal(),
    selectUserInfo(),
    selectShowNav(),
    selectCurPage(),
    selectLoading(),
    selectError(),
    selectLocationState(),
    (global, userInfo, showNav, curPage, loading, error, locationState) => {
        return {
            global,
            userInfo,
            showNav,
            curPage,
            loading,
            error,
            locationState
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
