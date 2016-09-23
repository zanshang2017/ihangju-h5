/*
 *
 * FeedbackPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import Button from 'antd-mobile/lib/button';

import {
    FEEDBACK_API,
} from '../../../apis.js';

import request from 'utils/request';

class FeedbackPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        console.warn('FeedbackPage DidMount');
    }

    submitClickHandler() {
        console.log('submitClickHandler');
        let content = this.refs.J_Content.value;
        let contact = this.refs.J_Contact.value;

        if (content.length <= 0) {
            alert('请填写反馈信息');
            return;
        }

        if (contact.length <= 0) {
            alert('请填写联系方式');
            return;
        }

        let data = `content=${content}&contact=${contact}`;
        request(FEEDBACK_API, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        });

        setTimeout(function () {
            window.history.back();
        }, 200);

    }

    render() {
        // let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        // this.id = userInfo.id;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>意见反馈</div>
                </TopBar>
                <div className={styles.textWrap}>
                    <div className={`${styles.textFieldWrap} r1b`}>
                        <textarea ref="J_Content" className={`${styles.textField}`} placeholder="来吐槽一下我们的行距..."
                                  maxLength="150"
                                  defaultValue={this.originDescription || ''}></textarea>
                    </div>
                    <p>请留下联系方式以便与您取得联系:</p>
                    <div className={`${styles.textFieldWrap} r1b`}>
                        <input type="text" ref="J_Contact" className={styles.contactField} placeholder="手机号/QQ/邮箱"
                               maxLength="50"/>
                    </div>
                    <Button type="primary" onClick={this.submitClickHandler.bind(this)}>发送</Button>
                </div>
            </div>
        );
    }
}


FeedbackPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

//const mapStateToProps = selectFeedbackPage();

export default connect()(FeedbackPage);
//export default connect(null, mapDispatchToProps)(FeedbackPage);
