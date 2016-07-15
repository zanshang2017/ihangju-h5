/**
 * 路由配置
 */

import { getHooks } from 'utils/hooks';

import {
    routeEffector,
    NO_EFFECT,
    FLIP_FORWARD,
    FLIP_BACK
} from './utils/routeEffect.js';

import {
    showNav,
    hideNav
} from 'containers/App/actions.js'

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    const { injectReducer, injectSagas } = getHooks(store);

    return [
        {
            path: '/login',
            name: 'loginPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/LoginPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {

            }
        }, {
            path: '/follow',
            name: 'followPage',
            getComponent(nextState, cb) {
                console.log(nextState);
                const importModules = Promise.all([
                    System.import('containers/FollowPage/reducer'),
                    System.import('containers/FollowPage/sagas'),
                    System.import('containers/FollowPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('followPage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '/found',
            name: 'foundPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/FoundPage/reducer'),
                    System.import('containers/FoundPage/sagas'),
                    System.import('containers/FoundPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('foundPage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '/tag/:id',
            name: 'tagDetailPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/tagDetailPage/reducer'),
                    System.import('containers/tagDetailPage/sagas'),
                    System.import('containers/tagDetailPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('tagDetailPage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '/my',
            name: 'myPage',
            getComponent(nextState, cb) {

                const importModules = Promise.all([
                    System.import('containers/MyPage/reducer'),
                    System.import('containers/MyPage/sagas'),
                    System.import('containers/MyPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('myPage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '/demo',
            name: 'demoPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('containers/DemoPage/reducer'),
                    System.import('containers/DemoPage/sagas'),
                    System.import('containers/DemoPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('demoPage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                //store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function(){
                //store.dispatch(showNav());
            }
        }, {
            path: '/bridgeTest',
            name: 'bridgeTest',
            getComponent(nextState, cb) {
                System.import('containers/BridgeTestPage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {
                System.import('containers/NotFoundPage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }
    ];
}
