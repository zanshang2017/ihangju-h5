/**
 * app.js
 * 入口文件
 */

import 'babel-polyfill';

import 'common/common.scss';
import 'sanitize.css/lib/sanitize.css';

import 'antd-mobile/dist/antd-mobile.css';
import 'common/antd_cover.scss';

import {Env} from './utils/env.js';

import 'file?name=[name].[ext]!./.htaccess';      // eslint-disable-line import/no-unresolved

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyRouterMiddleware, Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import useScroll from 'react-router-scroll';
import configureStore from './store';
import {
    getUserInfo
} from 'containers/App/sagas.js';

//console.log('Env', Env);

const initialState = {};

// React.initializeTouchEvents && React.initializeTouchEvents(true);

const store = configureStore(initialState, browserHistory);

store.runSaga(getUserInfo); //todo 这里获取用户信息?

// 同步路由和store状态
import {selectLocationState} from 'containers/App/selectors';

//利用History api改变浏览器历史,并发生url路径变化，需要通过服务端配置引导子路径到实际的物理文件
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
});

import App from 'containers/App';

import createRoutes from './routes';

import {foo} from 'utils/upload.js';

//路由配置
const rootRoute = {
    path: '/',
    component: App,
    indexRoute: {
        onEnter: (nextState, replace) => replace('/found') //根路径重定向
    },
    childRoutes: createRoutes(store),
};

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={history}
            routes={rootRoute}
            render={
                // 滚动到页顶
                applyRouterMiddleware(
                    useScroll(
                        (prevProps, props) => {

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

