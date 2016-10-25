/*
 * LoginPage
 */

import React from 'react';
import {connect} from 'react-redux';
import {
    THIRDPARTY_LOGIN_URL
} from '../../apis.js';
import {Env} from 'utils/env.js';
import {getUrlParam} from 'utils/util.js';
import {router} from 'react-router';

import styles from './styles.scss';

import {
    loadUserInfo
} from '../App/actions.js'

import {
    DISPATCH_ORIGIN
} from '../App/constants';

import signals from './signals';

/* eslint-disable react/prefer-stateless-function */
class LoginPage extends React.Component {

    constructor() {
        super();
        this.loginHandler = null;
        this.redirectUrl = null;
    }

    componentDidMount() {
        console.warn('LoginPage DidMount');

        let that = this;
        this.refs.thirdPartyLoginIfrm.height = this.refs.J_MainContent.offsetHeight + 'px';

        window.addEventListener('message', this.loginHandlerFactory());

        signals.loginSuccess.add((result)=> {
            //判断是否需要展示引导页
            // if (1) { //todo 记得关闭 测试用
            if (result.openPersonalizedRecommendation == true) {
                that.routeHandler('/follow_recommendation');
            } else {
                that.routeHandler(that.redirectUrl);
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.loginHandlerFactory());
        signals.loginSuccess.removeAll();
    }

    routeHandler(url) {
        this.context.router.push(url);
    }

    loginHandlerFactory() {
        var that = this;

        if (!this.loginHandler) {
            this.loginHandler = (function (e) {
                var data = JSON.parse(e.data),
                    action = data.action;

                that.redirectUrl = getUrlParam('redirect') || '/found#fliproute';

                if ((Env.dev && e.origin.indexOf('http://192.168.1.33:8888') > -1) ||
                    (Env.production && e.origin.indexOf('http://api.ihangju.com') > -1)) {

                    if (action === 'loginedTicket' && data.t) {
                        console.log('loginedTicket');
                        //t写入到了 api.ihangju.com和oauth.zan-shang.com
                        var ifrm = this.refs.thirdPartyLoginIfrm;
                        ifrm.style.display = 'none';
                        that.props.dispatch(loadUserInfo(DISPATCH_ORIGIN.LOGIN));
                    }
                }
            }).bind(this);
        }

        return this.loginHandler;
    }

    render() {
        return (
            <div className="pageInner">
                <div ref="J_MainContent" className="mainContent">
                    {
                        <iframe className={styles.loginPage} src={THIRDPARTY_LOGIN_URL}
                                ref="thirdPartyLoginIfrm"/>
                    }
                </div>
            </div>
        );
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(LoginPage);
