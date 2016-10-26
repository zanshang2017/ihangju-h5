/**
 * 路由配置
 */

import {getHooks} from 'utils/hooks';

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

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

//标记页面是否加载过,主要解决sagas、reducer重复加载问题
var initedStatus = {};

function beforeGetComponent() {
    try {
        Toast.hide();
        Toast.loading('加载中...', 15);
    } catch (e) {
    }
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

                beforeGetComponent();

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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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
            path: 'setting/profile',
            name: 'editProfilePage',
            getComponent(nextState, cb) {

                beforeGetComponent();

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

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: 'setting/profile/nickname',
            name: 'nickNamePage',
            getComponent(nextState, cb) {

                beforeGetComponent();

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

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: 'setting/profile/description',
            name: 'descriptionPage',
            getComponent(nextState, cb) {

                beforeGetComponent();

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

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: 'setting/pushconfig',
            name: 'pushConfigPage',
            getComponent(nextState, cb) {

                beforeGetComponent();

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

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
            }
        }, {
            path: 'setting/feedback',
            name: 'feedbackPage',
            getComponent(nextState, cb) {

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
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

                beforeGetComponent();

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

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
                store.dispatch(showNav());
            }
        }, {
            path: '/demo',
            name: 'demoPage',
            getComponent(nextState, cb) {

                beforeGetComponent();

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
        }, {
            path: '/follow_recommendation',
            name: 'followRecommendationPage',
            getComponent(nextState, cb) {

                beforeGetComponent();

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

                importModules.catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            },
            onLeave: function () {
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
            path: '/projectDetail/:id',
            name: 'projectDetail',
            getComponent(nextState, cb) {

                beforeGetComponent();

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
                importModules.catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '/readProjectChapter/:projectId/:chapterId',
            name: 'readProjectChapter',
            getComponent(nextState, cb) {

                beforeGetComponent();

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
                importModules.catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet();
            }
        }, {
            path: '/guide',
            name: 'guide',
            getComponent(nextState, cb) {

                beforeGetComponent();

                System.import('containers/GuidePage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
            onEnter: function () {
                store.dispatch(hideNav());
                routeEffector.autoSet(); //进入页面时设置路由切换效果
            }
        }, {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {

                beforeGetComponent();

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
