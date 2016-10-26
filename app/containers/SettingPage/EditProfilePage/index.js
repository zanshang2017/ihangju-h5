/*
 *
 * EditProfilePage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import styles from './styles.css';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadUserInfo,
    updateUserInfo,
} from 'containers/App/actions';

import {
    addImageParam,
    IMAGE_SIZE_TYPE,
} from 'utils/util.js';

import ImageUpload from 'components/common/ImageUpload';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';

import {
    IMG_CDN_PATH
} from 'apis.js';

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

    componentWillUnmount() {
        this.refs.J_ImageUpload.hideSheet();
    }

    avatarClickHandler() {
        console.log('avatarClickHandler');
        this.refs.J_ImageUpload.showSheet();
    }

    nickNameClickHandler() {
        console.log('nickNameClickHandler');
        this.context.router.push('/setting/profile/nickname');
    }

    descriptionClickHandler() {
        console.log('descriptionClickHandler');
        this.context.router.push('/setting/profile/description');
    }

    editAvatarImageHandler(url) {
        let obj = Object.assign({}, {avatar: url}, this.userInfo.pushConfig);
        this.props.dispatch(updateUserInfo(obj));
    }

    render() {
        this.userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        let avatarUrl = addImageParam(IMG_CDN_PATH + this.userInfo.avatar, IMAGE_SIZE_TYPE.AVATAR);
        this.id = this.userInfo.id;

        return (
            <div className="pageInner deepBg">
                <TopBar data-has-back="true">
                    <div data-title>编辑个人资料</div>
                </TopBar>
                <List>
                    <List.Body>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <div className={styles.avatar}><img src={avatarUrl}/></div>
                            }
                            onClick={this.avatarClickHandler.bind(this)}
                        >
                            <div className={styles.listWrap}>头像</div>
                            <ImageUpload ref="J_ImageUpload" onUploadComplete={this.editAvatarImageHandler.bind(this)} />
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <span className={styles.weakText}>{this.userInfo.nickName || ''}</span>
                            }
                            onClick={this.nickNameClickHandler.bind(this)}
                        >
                            <div className={styles.listWrap}>昵称</div>
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            extra={
                                <span className={styles.weakText}>{this.userInfo.description || ''}</span>
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
    router: React.PropTypes.object.isRequired,
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
