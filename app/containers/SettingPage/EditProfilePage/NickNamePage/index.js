/*
 *
 * NickNamePage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    updateUserInfo,
} from 'containers/App/actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';
import Toast from 'antd-mobile/lib/toast';

class NickNamePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
    }

    componentDidMount() {
        console.warn('NickNamePage DidMount');
        this.refs.J_NickName.focus();
    }

    backBtnHandler() {
        if (this.refs.J_NickName.value.length <= 0) {
            Toast.fail('请填写昵称!', 2.5);
        } else {
            if (this.originName !== this.refs.J_NickName.value) {
                let obj = Object.assign({}, {nickname: this.refs.J_NickName.value}, this.userInfo.pushConfig);
                this.props.dispatch(updateUserInfo(obj));
            }
            this.context.router.goBack();
        }
    }

    render() {
        this.originName = this.userInfo.nickName || '';

        return (
            <div className="pageInner deepBg">
                <TopBar data-has-back="true" backHandler={this.backBtnHandler.bind(this)}>
                    <div data-title>昵称</div>
                </TopBar>
                <List>
                    <List.Body>
                        <List.Item>
                            <input ref="J_NickName" className={styles.inputField} placeholder="请输入昵称" maxLength="10"
                                   defaultValue={this.userInfo.nickName || ''}/>
                        </List.Item>
                    </List.Body>
                </List>
            </div>
        );
    }
}


NickNamePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

//const mapStateToProps = selectNickNamePage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectUserInfo(),
    (userInfo) => ({userInfo})
), mapDispatchToProps)(NickNamePage);
//export default connect(null, mapDispatchToProps)(NickNamePage);
