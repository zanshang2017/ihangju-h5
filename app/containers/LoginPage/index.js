/*
 * LoginPage
 */

import React from 'react';
import {connect} from 'react-redux';
import {
    THIRDPARTY_LOGIN_URL
} from '../../apis.js';
import {Env} from '../../utils/env.js';
import {getUrlParam} from '../../utils/util.js';
import {router} from 'react-router';

import styles from './styles.scss';

import {
    loadUserInfo
} from '../App/actions.js'

/* eslint-disable react/prefer-stateless-function */
export default class LoginPage extends React.Component {

    constructor() {
        super();
        this.loginHandler = null;
    }

    componentDidMount() {
        window.addEventListener('message', this.loginHandlerFactory());
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.loginHandlerFactory());
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

                var redirect = getUrlParam('redirect') || '/found#fliproute';

                if ((Env.dev && e.origin.indexOf('http://192.168.1.33:8888') > -1) ||
                    (Env.prod && e.origin.indexOf('http://api.ihangju.com') > -1)) {

                    if (action === 'loginedTicket' && data.t) {
                        //t写入到了 api.ihangju.com和oauth.zan-shang.com
                        var ifrm = this.refs.thirdPartyLoginIfrm;
                        ifrm.style.display = 'none';
                        that.props.dispatch(loadUserInfo());

                        //需要延时处理,等待用户数据加载完毕
                        //todo 后续改为等待sagas处理完毕
                        setTimeout(function () {
                            this.routeHandler(redirect);
                        }.bind(this), 1000);

                    }
                }
            }).bind(this);
        }

        return this.loginHandler;
    }

    render() {
        return (
            <div className="pageInner">
                <div>
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
