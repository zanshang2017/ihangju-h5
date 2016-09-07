/*
 *
 * MyPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectUserCenterInfo,
} from './selectors';
import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadUserCenterData,
} from './actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import UserDesc from 'components/MyPage/UserDesc';
import List from 'antd-mobile/lib/list';

export class MyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        this.props.dispatch(loadUserCenterData());
    }

    componentDidMount() {
        console.warn('MyPage DidMount');
    }

    settingHandler() {
        console.log('setting');
        this.context.router.push('/setting/');
    }

    userDescClickHandler() {
        if (this.id) {
            this.context.router.push('/person/' + this.id);
        }
    }

    collectionClickHandler() {
        if (this.id) {
            this.context.router.push('/collection/' + this.id);
        }
    }

    notificationClickHandler() {
        if (this.id) {
            this.context.router.push('/notification');
        }
    }

    myTagClickHandler() {
        if (this.id) {
            this.context.router.push('/mytag/' + this.id);
        }
    }

    render() {
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        let userCenterInfo = this.props.userCenterInfo || {};
        this.id = userInfo.id;

        let msg_count = (userCenterInfo.comment_notify_count || 0) + (userCenterInfo.discuss_notify_count || 0);

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="false">
                    <div data-title>我的</div>
                </TopBar>
                <UserDesc userInfo={userInfo} clickHandler={this.userDescClickHandler.bind(this)}/>

                <List>
                    <List.Body>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <span className={styles.weakText}>{userCenterInfo.collectionCount || '0'}</span>
                            }

                            onClick={this.collectionClickHandler.bind(this)}
                        >
                            <div className={styles.listWrap}><i className="iconfont icon-staro"></i>收藏夹</div>
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <span className={styles.weakText}>{msg_count}</span>
                            }

                            onClick={this.notificationClickHandler.bind(this)}
                        >
                            <div className={styles.listWrap}><i className="iconfont icon-notification"></i>消息</div>
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <span className={styles.weakText}>{userCenterInfo.letter_notify_count || '0'}</span>
                            }
                        >
                            <div className={styles.listWrap}><i className="iconfont icon-mail"></i>私信</div>
                        </List.Item>
                    </List.Body>
                </List>

                <List>
                    <List.Body>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <span className={styles.weakText}>{userCenterInfo.managermentTagNumber || '0'}</span>
                            }

                            onClick={this.myTagClickHandler.bind(this)}
                        >
                            <div className={styles.listWrap}><i
                                className={`iconfont icon-tags ${styles.iconColored}`}></i>我管理的标签
                            </div>
                        </List.Item>
                    </List.Body>
                </List>

                <List>
                    <List.Body>
                        <List.Item
                            arrow="horizontal"
                            onClick={this.settingHandler.bind(this)}
                        >
                            <div className={styles.listWrap}><i className={`iconfont icon-setting`}></i>设置</div>
                        </List.Item>
                    </List.Body>
                </List>

            </div>
        );
    }
}


MyPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

//const mapStateToProps = selectMyPage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectUserInfo(),
    selectUserCenterInfo(),
    (userInfo, userCenterInfo) => ({userInfo, userCenterInfo})
), mapDispatchToProps)(MyPage);
//export default connect(null, mapDispatchToProps)(MyPage);
