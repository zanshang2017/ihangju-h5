/**
 * App.react.js
 */

import styles from './style.scss';

import React from 'react';
// import {Link} from 'react-router';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import ReactCSSTransitionGroup from '../../../node_modules/react/lib/ReactCSSTransitionGroup';
import {
    routeEffector,
    NO_EFFECT,
    FLIP_FORWARD,
    FLIP_BACK
} from '../../utils/routeEffect.js';

import {Env} from 'utils/env.js';

import {
    compareVersion
} from 'utils/util.js'

import {
    jsBridgeEvent
} from 'utils/bridge.js'

import signals from './signals';

import {
    loadLocalStorageUserInfo
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

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.node
    };

    constructor(props) {
        super(props);
    }

    compareVersionShowGuidePage() {
        let cur = __APP_CONFIG.ver || '';
        let old = locStorage.get('version');
        let lastShowGuideVer = __APP_CONFIG.guide.ver; //需要展示guide的版本,>=此版本号&&未展示过的都需要展示guide。

        locStorage.set('version', cur);

        //检测版本号,展示引导页
        if ((!old && lastShowGuideVer) || (cur !== old && compareVersion(lastShowGuideVer, old) > 0)) {
            this.context.router.push('/guide');
        }
    }

    componentWillMount() {
        this.props.dispatch(loadLocalStorageUserInfo());
    }

    componentDidMount() {
        this.compareVersionShowGuidePage();

        if (Env.debug) {
            openLog();
        } else {
            window.debugLog = function () {
            };
        }

        this.addSignalHandler();

        console.log('App DidMount');

        // alert(window.devicePixelRatio);
        // alert(document.documentElement.offsetWidth);
        // setInterval(function(){
        //     alert(document.documentElement.style.fontSize);
        // }, 3000);


        // document.body.addEventListener('touchstart', function(){
        //     this.getElementsByClassName('mainContent')[0].classList.add('showScrollbar');
        // });
        //
        // document.body.addEventListener('touchend', function(){
        //     setTimeout(function(){
        //         this.getElementsByClassName('mainContent')[0].classList.remove('showScrollbar');
        //     }.bind(this), 3000);
        //
        // });

        //模拟hover
        // (function () {
        //     var hoveredElement = [];
        //
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
        //
        // })();
    }

    addSignalHandler() {
        var that = this;

        jsBridgeEvent.onPushMsgComment.add((msg) => {
            let url = `/notification/1`;
            that.context.router.push(url);
        });

        jsBridgeEvent.onPushMsgLike.add((msg) => {
            let url = `/notification/2`;
            that.context.router.push(url);
        });

        //进入私信详情页
        jsBridgeEvent.onPushMsgLetter.add((msg) => {
            let url = `/dialogue/${msg.targetid || ''}`;
            that.context.router.push(url);
        });

        signals.onUnLogin.add(()=> {
            that.context.router.replace('/login');
        });

    }

    render() {
        let pageClass;

        if (this.props.showNav) {
            pageClass = 'page';
        } else {
            pageClass = 'pageNoNav';
        }

        return (
            <div ref="pageTransitionWrap" className={`animWrap ${routeEffector.className}`}>
                <div className={pageClass}>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="flip"
                        transitionEnterTimeout={routeEffector.timeout}
                        transitionLeaveTimeout={routeEffector.timeout}
                        className="transitionWrap"
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

    nLog.classList.remove('none');

    nBtn.addEventListener('touchstart', function () {
        if (nLog.classList.contains('unfold')) {
            nLog.classList.remove('unfold');
        } else {
            nLog.classList.add('unfold');
        }
    });

    window.debugLog = function (text) {
        nCont.innerHTML += text + '<br/>';
        nCont.scrollTop = nCont.scrollHeight;
    };

    // setInterval(function () {
    //     nCont.innerHTML = history.length + '\n' + history.state.key;
    //
    //     // nCont.innerHTML = Math.random() + '';
    // }, 2);

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

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
