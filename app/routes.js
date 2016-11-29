/**
 * 路由配置
 */

import {getHooks} from 'utils/hooks';

import {feedbackLog} from 'utils/feedbackLog';

import {
    routeEffector,
    NO_EFFECT,
    FLIP_FORWARD,
    FLIP_BACK
} from './utils/routeEffect.js';

import {
    showNav,
    hideNav,
    setCurPage,
} from 'containers/App/actions.js'

import {
    PAGE_NAME,
} from 'containers/App/constants.js';

import Toast from 'antd-mobile/lib/toast';

import {
    locStorage
} from 'utils/util.js'

import {hashHistory} from 'react-router';

const errorLoading = (err, opt = null) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console

    feedbackLog.addLog({
        desc: '页面请求失败',
        err: JSON.stringify(err),
        options: opt ? JSON.stringify(opt) : '',
        type: feedbackLog.type.ERROR
    });

    try {
        Toast.hide(); //此方法如果没有Toast展示时调用会抛异常,必须捕获
    } catch (e) {
    }

    if (location.href.indexOf('login') < 0) {
        if (navigator.onLine) {
            Toast.fail('加载失败,请稍后再试!');
        } else {
            Toast.fail('加载失败,请检查网络!');
        }
    }

};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

//标记页面是否加载过,主要解决sagas、reducer重复加载问题
var initedStatus = {};

/**
 * 获取页面前的准备工作,返回值可作为页面后续是否加载的条件
 * @param isCheckLogin {boolean} 是否进行登录检查
 * @returns {boolean}
 */
function beforeGetComponent(isCheckLogin = true, path = '/found') {

    if (isCheckLogin && !locStorage.get('userInfo')) {
        try {
            Toast.hide();
        } catch (e) {
        }
        hashHistory.replace('/login?redirect=' + encodeURIComponent(path));
        return false;
    }

    try {
        Toast.hide();
    } catch (e) {
    }
    Toast.loading('加载中...', 10);

    return true;
}

export default function createRoutes(store) {
    const {injectReducer, injectSagas} = getHooks(store);

    /**
     * @method isLogin
     *
     * 根据store内的userInfo判断用户是否登录
     * 注意: 如果登录过期,即时存在数据依然有可能是登出状态,这就需要由请求返回状态码判断登录状态了!
     * @param _store
     * @returns {boolean}
     */
    // function isLogin() {
    //     if(store && store.getState) {
    //         let _state = store.getState().toJS();
    //
    //         if (_state && _state.global && _state.global.userInfo && _state.global.userInfo.id) {
    //             return true;
    //         }
    //     }
    //
    //     window.location.href = '/#/login';
    // }

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

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/login'
                    });
                });
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

                if (!beforeGetComponent(true, '/follow')) {
                    return;
                }
                console.log(nextState);
                const importModules = Promise.all([
                    System.import('containers/FollowPage/reducer'),
                    System.import('containers/FollowPage/sagas'),
                    System.import('containers/FollowPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.followPage) {
                        injectReducer('followPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.followPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/follow'
                    });
                });
            },
            onEnter: function () {
                // if (isLogin()) {
                store.dispatch(showNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.FOLLOW_PAGE));
                // }

            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/create',
            name: 'createPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/create')) {
                    return;
                }
                const importModules = Promise.all([
                    System.import('containers/CreatePage/reducer'),
                    System.import('containers/CreatePage/sagas'),
                    System.import('containers/CreatePage')
                ]);


                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.createPage) {
                        injectReducer('createPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.createPage = true;
                    }
                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/create'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(showNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.CREATE_PAGE));
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/found',
            name: 'foundPage',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/FoundPage/reducer'),
                    System.import('containers/FoundPage/sagas'),
                    System.import('containers/FoundPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.foundPage) {
                        injectReducer('foundPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.foundPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/found'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(showNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.FOUND_PAGE));
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/my',
            name: 'myPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/my')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/MyPage/reducer'),
                    System.import('containers/MyPage/sagas'),
                    System.import('containers/MyPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.myPage) {
                        injectReducer('myPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.myPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/my'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(showNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.MY_PAGE));
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/person/:id',
            name: 'personPage',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/PersonPage/reducer'),
                    System.import('containers/PersonPage/sagas'),
                    System.import('containers/PersonPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.personPage) {
                        injectReducer('personPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.personPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/person/:id'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.PERSON_PAGE));
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/fanslist/:id',
            name: 'fansListPage',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/FansListPage/reducer'),
                    System.import('containers/FansListPage/sagas'),
                    System.import('containers/FansListPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.fansListPage) {
                        injectReducer('fansListPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.fansListPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/fanslist/:id'
                    });
                });
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.FANS_LIST_PAGE));
                store.dispatch(hideNav());
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/followslist/:id',
            name: 'followsListPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/followslist/' + nextState.params.id)) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/FollowsListPage/reducer'),
                    System.import('containers/FollowsListPage/sagas'),
                    System.import('containers/FollowsListPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.followsListPage) {
                        injectReducer('followsListPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.followsListPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/followslist/:id'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.FOLLOWS_LIST_PAGE));
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/collection/:id',
            name: 'collectionPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/collection/' + nextState.params.id)) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/CollectionPage/reducer'),
                    System.import('containers/CollectionPage/sagas'),
                    System.import('containers/CollectionPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.collectionPage) {
                        injectReducer('collectionPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.collectionPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/collection/:id'
                    });
                });
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.COLLECTION_PAGE));
                store.dispatch(hideNav());
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/tag/:id',
            name: 'tagDetailPage',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/TagDetailPage/reducer'),
                    System.import('containers/TagDetailPage/sagas'),
                    System.import('containers/TagDetailPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.tagDetailPage) {
                        injectReducer('tagDetailPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.tagDetailPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/tag/:id'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.FOUND_PAGE));
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/mytag',
            name: 'myTagPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/mytag')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/MyTagPage/reducer'),
                    System.import('containers/MyTagPage/sagas'),
                    System.import('containers/MyTagPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.myTagPage) {
                        injectReducer('myTagPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.myTagPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/mytag'
                    });
                });
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.MY_TAG_PAGE));
                store.dispatch(hideNav());
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/setting',
            name: 'settingPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/setting')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/App/reducer'),
                    System.import('containers/App/sagas'),
                    System.import('containers/SettingPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.settingPage) {
                        injectReducer('settingPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.settingPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/setting'
                    });
                });
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
                store.dispatch(setCurPage(PAGE_NAME.SETTING_PAGE));
                store.dispatch(hideNav());
            },
            onLeave: function () {
                store.dispatch(setCurPage(''));
            }
        }, {
            path: '/setting/profile',
            name: 'editProfilePage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/setting/profile')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/App/reducer'),
                    System.import('containers/App/sagas'),
                    System.import('containers/SettingPage/EditProfilePage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.editProfilePage) {
                        injectReducer('editProfilePage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.editProfilePage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/setting/profile'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: '/setting/profile/nickname',
            name: 'nickNamePage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/setting/profile/nickname')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/App/reducer'),
                    System.import('containers/App/sagas'),
                    System.import('containers/SettingPage/EditProfilePage/NickNamePage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.nickNamePage) {
                        injectReducer('nickNamePage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.nickNamePage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/setting/profile/nickname'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: '/setting/profile/description',
            name: 'descriptionPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/setting/profile/description')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/App/reducer'),
                    System.import('containers/App/sagas'),
                    System.import('containers/SettingPage/EditProfilePage/DescriptionPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.descriptionPage) {
                        injectReducer('descriptionPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.descriptionPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: 'setting/profile/description'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: '/setting/pushconfig',
            name: 'pushConfigPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/setting/pushconfig')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/App/reducer'),
                    System.import('containers/App/sagas'),
                    System.import('containers/SettingPage/PushConfigPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.pushConfigPage) {
                        injectReducer('pushConfigPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.pushConfigPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: 'setting/pushconfig'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: '/setting/feedback',
            name: 'feedbackPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/setting/feedback')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/SettingPage/FeedbackPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                    if (!initedStatus.feedbackPage) {
                        initedStatus.feedbackPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: 'setting/feedback'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: '/notification(/:tab)',
            name: 'notificationPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/notification')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/NotificationPage/reducer'),
                    System.import('containers/NotificationPage/sagas'),
                    System.import('containers/NotificationPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.notificationPage) {
                        injectReducer('notificationPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.notificationPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/notification(/:tab)'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
                store.dispatch(showNav());
            }
        }, {
            path: '/dialoguelist',
            name: 'dialogueListPage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/dialoguelist')) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/DialogueListPage/reducer'),
                    System.import('containers/DialogueListPage/sagas'),
                    System.import('containers/DialogueListPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.dialogueListPage) {
                        injectReducer('dialogueListPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.dialogueListPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/dialoguelist'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
                store.dispatch(showNav());
            }
        }, {
            path: '/dialogue/:id',
            name: 'dialoguePage',
            getComponent(nextState, cb) {

                if (!beforeGetComponent(true, '/dialogue/' + nextState.params.id)) {
                    return;
                }

                const importModules = Promise.all([
                    System.import('containers/DialoguePage/reducer'),
                    System.import('containers/DialoguePage/sagas'),
                    System.import('containers/DialoguePage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.dialoguePage) {
                        injectReducer('dialoguePage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.dialoguePage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/dialogue/:id'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
                store.dispatch(showNav());
            }
        }, {
            path: '/comments/:id',
            name: 'commentsPage',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/CommentsPage/reducer'),
                    System.import('containers/CommentsPage/sagas'),
                    System.import('containers/CommentsPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.commentsPage) {
                        injectReducer('commentsPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.commentsPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/comments/:id'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
                store.dispatch(showNav());
            }
        }, {
            path: '/follow_recommendation',
            name: 'followRecommendationPage',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/FollowRecommendationPage/reducer'),
                    System.import('containers/FollowRecommendationPage/sagas'),
                    System.import('containers/FollowRecommendationPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.followRecommendationPage) {
                        injectReducer('followRecommendationPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.followRecommendationPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/follow_recommendation'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: '/search',
            name: 'searchPage',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/SearchPage/reducer'),
                    System.import('containers/SearchPage/sagas'),
                    System.import('containers/SearchPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.searchPage) {
                        injectReducer('searchPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.searchPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/search(/:keywords)'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
                store.dispatch(showNav());
            }
        }, {
            path: '/projectDetail/:id',
            name: 'projectDetail',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/ProjectDetailPage/reducer'),
                    System.import('containers/ProjectDetailPage/sagas'),
                    System.import('containers/ProjectDetailPage/'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.detail) {
                        injectReducer('projectDetail', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.demoPage = true;
                    }
                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/projectDetail/:id'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '/readProjectChapter/:projectId/:chapterId',
            name: 'readProjectChapter',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/ReadProjectChapter/reducer'),
                    System.import('containers/ReadProjectChapter/sagas'),
                    System.import('containers/ReadProjectChapter/'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.detail) {
                        injectReducer('readProjectChapter', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.demoPage = true;
                    }
                    renderRoute(component);
                });

                importModules.catch(function (err) {
                    errorLoading(err, {
                        path: '/readProjectChapter/:projectId/:chapterId'
                    });
                });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet();
            }
        }, {
            path: '/guide',
            name: 'guide',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                System.import('containers/GuidePage')
                    .then(loadModule(cb))
                    .catch(function (err) {
                        errorLoading(err, {
                            path: '/guide'
                        });
                    });
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                System.import('containers/NotFoundPage')
                    .then(loadModule(cb))
                    .catch(function (err) {
                        errorLoading(err, {
                            path: '*'
                        });
                    });
            },
            onEnter: function () {
                routeEffector.autoSet(); //进入页面时设置路由切换效果
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
            path: '/demo',
            name: 'demoPage',
            getComponent(nextState, cb) {

                beforeGetComponent(false);

                const importModules = Promise.all([
                    System.import('containers/DemoPage/reducer'),
                    System.import('containers/DemoPage/sagas'),
                    System.import('containers/DemoPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    if (!initedStatus.demoPage) {
                        injectReducer('demoPage', reducer.default);
                        injectSagas(sagas.default);
                        initedStatus.demoPage = true;
                    }

                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                //store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
                //store.dispatch(showNav());
            }
        }
    ];
}
