import styles from './styles.css';
import React from 'react';
import bridge from 'utils/bridge';

import request from 'utils/request';
import {
    CONFIRM_EDITOR_API
} from 'apis.js';

import Toast from 'antd-mobile/lib/toast';

/* eslint-disable react/prefer-stateless-function */
export default class ScanPane extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    scanClickHander(e) {
        var that = this;

        if (!that.props.isAuthor) {
            Toast.info('服务商无法创建作品', 2);
            return;
        }

        bridge.sys.qrReader(function (data) {

            if (!data.resp) return;

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
                if ((ret.err === undefined || ret.err === null) && ret.data.code == 'ok') {
                    Toast.success('扫码成功');
                    //扫码入口 埋点
                    zhuge.track('扫码入口');
                } else {
                    Toast.fail('扫码失败');
                }
            }, function (error) {
                Toast.fail('扫码失败');
            });
        });
    }

    render() {
        let isAuthor = this.props.isAuthor;

        return (
            <div className={styles.wrap}>
                <div className={isAuthor ? styles.scanBtn : styles.noScanBtn}
                     onClick={this.scanClickHander.bind(this)}></div>
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


