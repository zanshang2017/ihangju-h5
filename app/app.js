/**
 * app.js
 * 入口文件
 */

import 'babel-polyfill';

import 'common/common.css';
import 'sanitize.css/lib/sanitize.css';

import 'antd-mobile/dist/antd-mobile.css';
import 'common/antd_cover.css';

// import 'file?name=[name].[ext]!./.htaccess';      // eslint-disable-line import/no-unresolved

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyRouterMiddleware, Router, browserHistory, hashHistory, useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import useScroll from 'react-router-scroll';
import configureStore from './store';
import {
    getUserInfo
} from 'containers/App/sagas.js';

import Toast from 'antd-mobile/lib/toast';


//console.log('Env', Env);

const initialState = {};

// React.initializeTouchEvents && React.initializeTouchEvents(true);

// const store = configureStore(initialState, browserHistory);
const store = configureStore(initialState, hashHistory);

store.runSaga(getUserInfo);

// 同步路由和store状态
import {selectLocationState} from 'containers/App/selectors';

// browserHistory需要服务端支持,先使用hashHistory.
// const history = syncHistoryWithStore(browserHistory, store, {
//     selectLocationState: selectLocationState(),
// });

const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState: selectLocationState(),
});

// console.log('history', history);

// setTimeout(function(){
//     history.push('/my');
//     history.push('/create');
//     history.push('/follow');
// }, 2000);

window.onerror = function (e) {
    // alert('error' + e);
    // location.reload();
};

window.debugLog = function () {
};

import App from 'containers/App';

import createRoutes from './routes';

import {foo} from 'utils/upload.js';

import {
    testSupportWebp
} from 'utils/util';

testSupportWebp();

// alert('dpr:' + window.devicePixelRatio + ' w:' + document.documentElement.clientWidth + ' h:' + document.documentElement.clientHeight);
// alert(navigator.userAgent);

//路由配置
const rootRoute = {
    path: '/',
    component: App,
    indexRoute: {
        onEnter: (nextState, replace) => replace('/found') //根路径重定向
        // onEnter: (nextState, replace) => replace('/guide') //根路径重定向
    },
    childRoutes: createRoutes(store),
};

var hasRemovedAppLoading = false;

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={history}
            routes={rootRoute}
            render={
                applyRouterMiddleware(
                    useScroll(
                        (prevProps, props) => {

                            {/*alert('history.length:' + window.history.length);*/
                            }

                            if (!hasRemovedAppLoading) {
                                hasRemovedAppLoading = true;
                                document.body.removeChild(document.getElementById('appLoading'));
                            }

                            try {
                                Toast.hide(); //页面加载后清除loading
                            } catch (e) {
                            }

                            if (!prevProps || !props) {
                                return true;
                            }

                            if (prevProps.location.pathname !== props.location.pathname) {
                                return [0, 0];
                            }

                            return true;
                        }
                    )
                )
            }
        />
    </Provider>,
    document.getElementById('app')
);

