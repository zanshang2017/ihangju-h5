/*
 *
 * EditProfilePage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadUserInfo,
} from 'containers/App/actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

class EditProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        this.props.dispatch(loadUserInfo());
    }

    componentDidMount() {
        console.warn('EditProfilePage DidMount');
    }

    avatarClickHandler() {
        console.log('avatarClickHandler');
    }

    nickNameClickHandler() {
        console.log('nickNameClickHandler');
        this.context.router.push('/setting/profile/nickname');
    }

    descriptionClickHandler() {
        console.log('descriptionClickHandler');
        this.context.router.push('/setting/profile/description');
    }

    render() {
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        let avatarUrl = IMG_CDN_PATH + userInfo.avatar;
        this.id = userInfo.id;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>编辑个人资料</div>
                </TopBar>
                <List>
                    <List.Body>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <div className={styles.avatar}><img src={avatarUrl} width="0" height="0"/></div>
                            }
                            onClick={this.avatarClickHandler.bind(this)}
                        >
                            <div className={styles.listWrap}>头像</div>
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <span className={styles.weakText}>{userInfo.nickName || ''}</span>
                            }
                            onClick={this.nickNameClickHandler.bind(this)}
                        >
                            <div className={styles.listWrap}>昵称</div>
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <span className={styles.weakText}>{userInfo.description || ''}</span>
                            }
                            onClick={this.descriptionClickHandler.bind(this)}
                        >
                            <div className={styles.listWrap}>个人签名</div>
                        </List.Item>
                    </List.Body>
                </List>

            </div>
        );
    }
}


EditProfilePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

//const mapStateToProps = selectEditProfilePage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectUserInfo(),
    (userInfo) => ({userInfo})
), mapDispatchToProps)(EditProfilePage);
//export default connect(null, mapDispatchToProps)(EditProfilePage);
