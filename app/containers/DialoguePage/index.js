/*
 *
 * DialoguePage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectDialogue,
} from './selectors';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadDialogueData,
    sendDialogueData,
} from './actions';

import _ from 'underscore';

import {
    goBottom
} from '../../utils/util';

import styles from './styles.css';

import signals from './signals';

import TopBar from 'components/common/TopBar';
import List from 'components/DialoguePage/List';
import InputBar from 'components/common/InputBar';

import NoticeBar from 'antd-mobile/lib/top-notice';

export class DialoguePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);

        this.letterGroupId = '';
        this.timer = null;
        this.componentMethod = {};

        // 评论信息的数据结构:
        //    "sendUser": "571dab71e4b0d50d21e7a9fc",
        //    "sendUserName": "门神4",
        //    "sendUserAvatar": "/image/57d8c85ee4b073eceafe17e5.jpg"
        //    "type": "im",
        //    "content": "hhhhhh ",
        //    "id": "57de2c03e4b0c25c843d5323",
        //    "sendTime": 1474178051840,

        //发送数据的模板
        this.dialogueData = {
            content: '',
            sendUser: '', //当前用户
            sendUserName: '',
            sendUserAvatar: '',
            type: 'im', //默认
        };
    }

    componentWillMount() {
        let that = this;
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};

        //todo 无登录信息重新登录

        this.dialogueData['sendUser'] = userInfo.id;
        this.dialogueData['sendUserName'] = userInfo.nickName;
        this.dialogueData['sendUserAvatar'] = userInfo.avatar;

        if (this.props.routeParams) {
            if (this.letterGroupId = this.props.routeParams.id) {

                (function _send() {
                    sendData();
                    that.timer = setTimeout(function () {
                        _send();
                    }, 10 * 1000);
                })();
            }
        }

        function sendData() {
            that.props.dispatch(loadDialogueData(that.letterGroupId));
        }
    }

    componentDidMount() {
        let that = this;

        signals.sendDialogueSuccess.add(()=> {
            that.resetDialogueData();
            that.componentMethod['clear'] && that.componentMethod['clear']();
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        signals.sendDialogueSuccess.removeAll();

        for (var k in this.componentMethod) {
            if (this.componentMethod.hasOwnProperty(k)) {
                delete this.componentMethod[k];
            }
        }
    }

    componentDidUpdate() {
        goBottom(document.body, this.refs.J_Wrap);
    }

    // 发送成功之后重置输入栏
    resetDialogueData() {
        this.dialogueData.content = '';
    }

    submitHandler(content) {
        this.dialogueData.content = content;
        this.props.dispatch(sendDialogueData(this.letterGroupId, _.clone(this.dialogueData)));
    }

    render() {
        let dialogue = this.props.dialogue ? this.props.dialogue.toJS() : {};
        let items = dialogue.data ? dialogue.data.reverse() : []; //反序展示
        // let page = dialogue.page || 0;
        // let isLast = dialogue.isLast || false;
        // let loading = dialogue.loading || false;

        return (
            <div ref="J_Wrap" className={`pageInner`}>
                <TopBar data-has-back="true">
                    <div data-title>私信</div>
                </TopBar>

                <NoticeBar>当前版本无法查看签约详情,请等待新版行距发布!</NoticeBar>

                <div className={`mainContent`}>
                    <List items={items} myUserId={this.dialogueData['sendUser']}></List>
                </div>

                <InputBar bindingMethod={{context: this.componentMethod, methodName: ['clear']}}
                          submitHandler={this.submitHandler.bind(this)}></InputBar>
            </div>
        );
    }
}

DialoguePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectUserInfo(),
    selectDialogue(),
    (userInfo, dialogue) => ({userInfo, dialogue})
), mapDispatchToProps)(DialoguePage);
