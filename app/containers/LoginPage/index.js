/*
 * LoginPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { THIRDPARTY_LOGIN_URL } from '../../apis.js';
import styles from './styles.scss';

import request from 'utils/request';

/* eslint-disable react/prefer-stateless-function */
export default class LoginPage extends React.Component {

    componentDidMount() {
        var ifrm = this.refs.thirdPartyLoginIfrm;
        ifrm.addEventListener('load', function(e){
            console.log('reload', ifrm.src, e);
        });

        //三方登录接口 POST
        //http://192.168.1.33:7777/authentication
        //username=13811818349&password=123123

        //跨域
        //request('http://192.168.1.33:7777/authentication', {
        //    method: "POST",
        //    body: 'username=13811818349&password=123123'
        //});

    }

    render() {

        return (
            <div className="pageInner">
                <div>
                    {
                        <iframe className={styles.loginPage} src={THIRDPARTY_LOGIN_URL} ref="thirdPartyLoginIfrm"/>
                    }
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(LoginPage);
