import styles from './styles.css';
import React from 'react';
import bridge from '../../../utils/bridge';

import request from 'utils/request';
import {
    CONFIRM_EDITOR_API
} from '../../../apis.js';


/* eslint-disable react/prefer-stateless-function */
export default class ScanPane extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    scanClickHander(e) {
        var that = this;

        bridge.sys.qrReader(function (data) {
            request(CONFIRM_EDITOR_API, {
                method: "POST",
                body: 'target=console&sancodeid=' + data.resp + '&userid=' + that.props.userId,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-Version': 'v1.1'
                },
                credentials: 'include'
            }).then(function (ret) {
                if (ret.err === undefined || ret.err === null) {
                    if (ret.data.code == 'ok') {
                        alert('扫码成功!');
                    }
                }
            }, function (error) {

            });
        });
    }

    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.scanBtn} onClick={this.scanClickHander.bind(this)}></div>
                <div className={styles.guide}>
                    <span>请在电脑浏览器输入</span>
                    <strong>www.ihangju.com</strong>
                    <span>然后点击上方图标扫码登录</span>
                </div>
            </div>
        );
    }
}

ScanPane.propTypes = {
    userId: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
    ])
};


