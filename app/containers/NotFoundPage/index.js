/**
 * NotFoundPage
 */

import React from 'react';

import Toast from 'antd-mobile/lib/toast';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.Component {

    componentDidMount() {
        console.warn('NotFoundPage DidMount');

        Toast.info('此页面不存在, 5秒后将自动返回');
        setTimeout(function () {
            window.history.back();
        }, 3000);
    }

    render() {
        return (
            <div className="notFoundPage" style={{color: '#a09e98'}}>
                <h1 style={{margin: '100px auto 0', textAlign: 'center', fontSize: '30px'}}>Page Not Found!</h1>
                <div style={{textAlign: 'center', paddingTop: '30px', fontSize: '26px'}}>404</div>
            </div>
        );
    }
}
