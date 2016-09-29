/*
 *
 * DescriptionPage
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
import Button from 'antd-mobile/lib/button';

class DescriptionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.warn('DescriptionPage DidMount');
        this.refs.J_Description.focus();
    }

    backBtnHandler() {
        if (this.refs.J_Description.value.length <= 0) {
            alert('请填写昵称!');
        } else {
            if (this.originDescription !== this.refs.J_Description.value) {
                this.props.dispatch(updateUserInfo({
                    description: this.refs.J_Description.value
                }));
            }
            window.history.back();
        }
    }

    render() {
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        this.originDescription = userInfo.description;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>个人签名</div>
                </TopBar>
                <div className={styles.textWrap}>
                    <div className={`${styles.textFieldWrap} r1b`}>
                        <textarea ref="J_Description" className={`${styles.textField}`} placeholder="请输入个人签名"
                              maxLength="150"
                              defaultValue={this.originDescription || ''}></textarea>
                    </div>
                    <Button type="primary" onClick={this.backBtnHandler.bind(this)}>提交</Button>
                </div>
            </div>
        );
    }
}


DescriptionPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

//const mapStateToProps = selectDescriptionPage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectUserInfo(),
    (userInfo) => ({userInfo})
), mapDispatchToProps)(DescriptionPage);
//export default connect(null, mapDispatchToProps)(DescriptionPage);
