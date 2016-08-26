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

export const SET_CUR_PAGE = 'app/App/SET_CUR_PAGE';
export const SET_USER_INFO = 'app/App/SET_USER_INFO';

export const LOAD_USER_INFO = 'app/LoginPage/LOAD_USER_INFO';
export const LOAD_USER_INFO_SUCCESS = 'app/LoginPage/LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_ERROR = 'app/LoginPage/LOAD_USER_INFO_ERROR';

export const PAGE_NAME = {
    FOLLOW_PAGE: 'followPage',
    FOUND_PAGE: 'foundPage',
    CREATE_PAGE: 'createPage',
    MY_PAGE: 'myPage',
    PERSON_PAGE: 'personPage',

};


