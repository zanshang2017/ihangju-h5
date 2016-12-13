/*
 * action常量名与action定义分开，避免错误引用
 *
 * 遵循如下格式：
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_ACTION = 'app/App/DEFAULT_ACTION';
export const SHOW_NAV = 'app/App/SHOW_NAV';
export const HIDE_NAV = 'app/App/HIDE_NAV';
export const LOGIN_SUCCESS = 'app/App/LOGIN_SUCCESS';
export const LOGOUT = 'app/App/LOGOUT';
export const LOGOUT_SUCCESS = 'app/App/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'app/App/LOGOUT_ERROR';

export const SET_CUR_PAGE = 'app/App/SET_CUR_PAGE';
export const LOAD_LOCAL_STORAGE_USER_INFO = 'app/App/LOAD_LOCAL_STORAGE_USER_INFO';

export const LOAD_USER_INFO = 'app/App/LOAD_USER_INFO';
export const LOAD_USER_INFO_SUCCESS = 'app/App/LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_ERROR = 'app/App/LOAD_USER_INFO_ERROR';

export const UPDATE_USER_INFO = 'app/App/UPDATE_USER_INFO';
export const UPDATE_USER_INFO_SUCCESS = 'app/App/UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_ERROR = 'app/App/UPDATE_USER_INFO_ERROR';


export const PAGE_NAME = {
    FOLLOW_PAGE: 'followPage',
    FOUND_PAGE: 'foundPage',
    CREATE_PAGE: 'createPage',
    MY_PAGE: 'myPage',
    PERSON_PAGE: 'personPage',
    COLLECTION_PAGE: 'collectionPage',
    FANS_LIST_PAGE: 'fansListPage',
    FOLLOWS_LIST_PAGE: 'followsListPage',
    MY_TAG_PAGE: 'myTagPage',
    SETTING_PAGE: 'settingPage',
};

// action发送的源,用于标记用途
export const DISPATCH_ORIGIN = {
    LOGIN: 'login',
    OPEN_IDENTITY: 'openidentityauthentication',
};


