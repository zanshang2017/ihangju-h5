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
    compareVersion,
    isLogin,
} from 'utils/util.js'

import {
    jsBridgeEvent
} from 'utils/bridge.js'

import signals from './signals';

import {
    loadLocalStorageUserInfo,
    loadUserInfo,
} from './actions.js';

import {
    feedbackLog
} from 'utils/feedbackLog';

import Toast from 'antd-mobile/lib/toast';


// <<<<< 预先加在一些模块,避免无样式闪烁
import ProjectDesc from 'components/ProjectDetailPage/ProjectDesc';
import ProjectTag from 'components/ProjectDetailPage/ProjectTag';
import ProjectIntro from 'components/ProjectDetailPage/ProjectIntro';
import ProjectComment from 'components/ProjectDetailPage/ProjectComment';
import ProjectTopBar from 'components/ProjectDetailPage/ProjectTopBar';

import UserDesc from 'components/PersonPage/UserDesc';

import ReadContent from 'components/ReadProjectChapter/ReadContent';

import TopListBar from 'components/FollowPage/TopListBar';
// >>>>>

import {
    DISPATCH_ORIGIN
} from './constants';

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

import ImageWithDescPanel from 'components/common/ImageWithDescPanel';

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {

    static propTypes = {
        children: React.PropTypes.node
    };

    constructor(props) {
        super(props);
    }

    compareVersionToShowGuidePage() {
        let cur = __APP_CONFIG.ver || '';
        let old = locStorage.get('version');
        let lastShowGuideVer = __APP_CONFIG.guide.ver; //需要展示guide的版本,>=此版本号&&未展示过的都需要展示guide。

        locStorage.set('version', cur);

        //检测版本号,展示引导页
        if ((!old && lastShowGuideVer) || (cur !== old && compareVersion(lastShowGuideVer, old) > 0)) {
            this.context.router.push('/guide');
            return true;
        }

        return false;
    }

    componentWillMount() {
        this.props.dispatch(loadLocalStorageUserInfo());

        signals.openIdentityPanel.add((function (result) {
            if (result.openidentityauthentication) {
                this.refs.J_AuthenticationNoticePanel.show();
            }
        }).bind(this));

        //确保已存在登录信息,避免不必要的登录跳转
        if (JSON.parse(locStorage.get('userInfo'))) {
            this.props.dispatch(loadUserInfo(DISPATCH_ORIGIN.OPEN_IDENTITY));
        }
    }

    componentDidMount() {
        this.compareVersionToShowGuidePage();

        if (Env.debug) {
            openLog();
        } else {
            window.debugLog = function () {
            };
        }

        debugLog('UA:' + navigator.userAgent);

        this.addSignalHandler(); //添加全局事件处理

        feedbackLog.doListen(); //侦听反馈日志

        console.log('App DidMount');

        // window.addEventListener("offline", function (e) {
        //     Toast.fail('网络中断,请检查网络!', 3);
        // });
        //
        // window.addEventListener("online", function (e) {
        //     Toast.success('网络已恢复!', 2);
        // });
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

        //进入作品详情页
        jsBridgeEvent.onPushMsgProjectDetail.add((msg) => {
            if (msg.targetid) {
                let url = `/projectDetail/${msg.targetid || ''}`;
                that.context.router.push(url);
            }
        });

        signals.onUnLogin.add(()=> {
            var redirect = '?url=' + encodeURIComponent(location.href);
            // that.context.router.replace('/login' + redirect);

            window.location.replace('/#/login' + redirect);
        });
    }

    render() {
        let that = this;
        let pageClass;

        if (this.props.showNav) {
            pageClass = 'page';
        } else {
            pageClass = 'pageNoNav';
        }

        if (this.props.userInfo) {
            this.userInfo = this.props.userInfo.toJS();
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
                <TabBar showNav={this.props.showNav} curPage={this.props.curPage || ''}/>

                <ImageWithDescPanel
                    ref="J_AuthenticationNoticePanel"
                    image="https://o82zr1kfu.qnssl.com/@/image/5848cefae4b05c2d3be5390a.png?imageView2/2/w/300"
                    title="服务商想签你的作品"
                    desc="需要完善信息认证，才能完成签约"
                    okText="去完善"
                    onClick={()=> {
                        that.refs.J_AuthenticationNoticePanel.hide();
                        that.context.router.push(`/authorAttest/${this.userInfo.id}`);
                    }}
                />

                <div id="logPanel" className="logPanel none unfold">
                    <a href="javascript:void(0);" className="btn" id="toggle">打开/关闭</a>
                    <div className="content"></div>
                </div>

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
