/*
 *
 * MyPage
 *
 */

import styles from './styles.css';

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

import TopBar from 'components/common/TopBar';
import UserDesc from 'components/MyPage/UserDesc';
import List from 'antd-mobile/lib/list';

class MyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};

        this.id = userInfo.id;
        if (!this.id) {
            this.context.router.replace('/login');
        }

    }

    componentDidMount() {
        console.warn('MyPage DidMount');
        this.props.dispatch(loadUserCenterData());
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

    agreementsClickHandler() {
        this.context.router.push('/agreements');
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

    dialoguesClickHandler() {
        if (this.id) {
            this.context.router.push('/dialoguelist');
        }
    }

    myTagClickHandler() {
        if (this.id) {
            this.context.router.push('/mytag');
        }
    }

    render() {
        let userCenterInfo = this.props.userCenterInfo || {};
        let notifications = userCenterInfo.notifications || {};
        let msg_count = (notifications.comment_notify_count || 0) + (notifications.discuss_notify_count || 0);

        let tagManageHtml = '';
        if (userCenterInfo.managermentTagNumber) {
            tagManageHtml = <List>
                <List.Body>
                    <List.Item
                        arrow="horizontal"
                        extra={
                            <span
                                className={styles.weakText}>{userCenterInfo.managermentTagNumber || '0'}</span>
                        }

                        onClick={this.myTagClickHandler.bind(this)}
                    >
                        <div className={styles.listWrap}><i
                            className={`${styles.iconTag}`}></i>我管理的标签
                        </div>
                    </List.Item>
                </List.Body>
            </List>
        }

        return (
            <div className="pageInner wrap">
                <TopBar data-has-back="false">
                    <div data-title>我的</div>
                </TopBar>

                <div className={`mainContent ${styles.wrap}`}>
                    <UserDesc userInfomation={userCenterInfo.userinformation}
                              clickHandler={this.userDescClickHandler.bind(this)}/>

                    <List>
                        <List.Body>

                            <List.Item
                                arrow="horizontal"
                                onClick={this.agreementsClickHandler.bind(this)}
                            >
                                <div className={styles.listWrap}><i className={styles.iconAgreements}></i>版权</div>
                            </List.Item>
                            <List.Item
                                arrow="horizontal"
                                extra={
                                    <span className={styles.weakText}>{userCenterInfo.collectionCount || '0'}</span>
                                }

                                onClick={this.collectionClickHandler.bind(this)}
                            >
                                <div className={styles.listWrap}><i className={styles.iconCollection}></i>收藏夹</div>
                            </List.Item>
                            <List.Item
                                arrow="horizontal"
                                extra={
                                    <span className={styles.weakText}>{msg_count}</span>
                                }

                                onClick={this.notificationClickHandler.bind(this)}
                            >
                                <div className={styles.listWrap}><i className={styles.iconNotify}></i>消息</div>
                            </List.Item>
                            <List.Item
                                arrow="horizontal"
                                extra={
                                    <span className={styles.weakText}>{notifications.letter_notify_count || '0'}</span>
                                }
                                onClick={this.dialoguesClickHandler.bind(this)}
                            >
                                <div className={styles.listWrap}><i className={styles.iconLetter}></i>私信</div>
                            </List.Item>
                        </List.Body>
                    </List>

                    {tagManageHtml}

                    <List>
                        <List.Body>
                            <List.Item
                                arrow="horizontal"
                                onClick={this.settingHandler.bind(this)}
                            >
                                <div className={styles.listWrap}><i className={styles.iconSetting}></i>设置</div>
                            </List.Item>
                        </List.Body>
                    </List>
                </div>

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
