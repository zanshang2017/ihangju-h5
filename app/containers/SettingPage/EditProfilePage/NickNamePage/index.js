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

export class NickNamePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.warn('NickNamePage DidMount');
        this.refs.J_NickName.focus();
    }

    backBtnHandler() {
        if (this.refs.J_NickName.value.length <= 0) {
            alert('请填写昵称!');
        } else {
            if (this.originName !== this.refs.J_NickName.value) {
                this.props.dispatch(updateUserInfo({
                    nickname: this.refs.J_NickName.value
                }));
            }
            window.history.back();
        }
    }

    render() {
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        this.originName = userInfo.nickName;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true" backHandler={this.backBtnHandler.bind(this)}>
                    <div data-title>昵称</div>
                </TopBar>
                <List>
                    <List.Body>
                        <List.Item>
                            <input ref="J_NickName" className={styles.inputField} placeholder="请输入昵称" maxLength="10"
                                   defaultValue={userInfo.nickName || ''}/>
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