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

import Toast from 'antd-mobile/lib/toast';

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

        try {
            setTimeout(function () {
                Toast.hide();
            }, 0);
        } catch (e) {
        }

        let that = this;
        this.refs.thirdPartyLoginIfrm.height = this.refs.J_MainContent.offsetHeight + 'px';

        window.addEventListener('message', this.loginHandlerFactory());

        signals.loginSuccess.add((result)=> {
            //判断是否需要展示引导页
            // if (1) { //todo 记得关闭 测试用
            if (result.openPersonalizedRecommendation == true) {
                that.routeHandler('/follow_recommendation');
            } else {
                //todo 回退的方案会产生混乱,暂不启用
                // that.context.router.go(-1); //回退一部,因为iframe中表单提交会产生一个历史

                setTimeout(() => {
                    // 如果有跳转链接,截取#和?之间的部分
                    if (that.redirectUrl && that.redirectUrl.indexOf('login') < 0) {
                        if(that.redirectUrl.indexOf('#') > -1) {
                            // that.redirectPageName = that.redirectUrl.substr(that.redirectUrl.indexOf('#')+1);
                            that.redirectPageName = that.redirectUrl.substring(that.redirectUrl.indexOf('#')+1, that.redirectUrl.indexOf('?'));
                        }
                        // window.location.href = that.redirectUrl;
                    // } else {
                        // that.routeHandler(that.redirectPageName);
                    }

                    that.routeHandler(that.redirectPageName);
                }, 0);
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.loginHandlerFactory());
        signals.loginSuccess.removeAll();
    }

    routeHandler(url) {
        this.context.router.replace(url);
    }

    loginHandlerFactory() {
        var that = this;

        if (!this.loginHandler) {
            this.loginHandler = (function (e) {
                var data = JSON.parse(e.data),
                    action = data.action;

                that.redirectPageName = getUrlParam('redirect') || '/found#fliproute';
                that.redirectUrl = getUrlParam('url') ? decodeURIComponent(getUrlParam('url')) : null;

                if (e.origin.indexOf('api.ihangju.com') > -1) {
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
