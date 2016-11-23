/**
 * NotFoundPage
 */

import React from 'react';

import Toast from 'antd-mobile/lib/toast';
import Result from 'antd-mobile/lib/page-result';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.Component {

    componentDidMount() {
        console.warn('NotFoundPage DidMount');

        try {
            Toast.hide();
        } catch(e){}

        Toast.info('此页面不存在, 5秒后将自动返回');
        setTimeout(function () {
            location.href = '#/found';
        }, 3000);
    }

    render() {
        return (
            <div className="notFoundPage" style={{paddingTop: '70px', color: '#a09e98'}}>
                <Result
                    imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png?imageMogr2/auto-orient/"
                    title="好像迷路了哦~"
                />
            </div>
        );
    }
}
