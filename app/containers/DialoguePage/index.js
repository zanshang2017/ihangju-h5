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
    getLetterGroupId,
    resetState,
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

import Toast from 'antd-mobile/lib/toast';

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

        this.dialogueData['sendUser'] = userInfo.id;
        this.dialogueData['sendUserName'] = userInfo.nickName;
        this.dialogueData['sendUserAvatar'] = userInfo.avatar;

        if (this.props.routeParams) {
            let paramId = this.props.routeParams.id;

            if (~paramId.indexOf(':')) { //有":"代表为groupId,否则为userId,需要请求服务端获取
                this.letterGroupId = paramId;
                this.loadDialogueList();
            } else { //否则是userId,须从后台获取groupId
                this.props.dispatch(getLetterGroupId(paramId));

                signals.getLetterGroupIdSuccess.add((letterGroupId)=> {
                    that.letterGroupId = letterGroupId;
                    that.loadDialogueList();
                });
            }
        }
    }

    componentDidMount() {
        let that = this;

        signals.loadDialogueSuccess.add(()=> {
            that.scrollToBottom();
            Toast.hide();
            signals.loadDialogueSuccess.removeAll(); //只在首次加载时滑到底部
        });

        signals.loadDialogueError.add(()=> {
            Toast.hide();
            Toast.fail('加载失败!');
        });

        signals.sendDialogueSuccess.add(()=> {
            that.resetDialogueData();
            that.componentMethod['clear'] && that.componentMethod['clear']();
            that.scrollToBottom();
            Toast.hide();
        });

        signals.sendDialogueError.add(()=> {
            Toast.hide();
            Toast.fail('发送失败,请检查网络!');
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        signals.sendDialogueSuccess.removeAll();
        signals.sendDialogueError.removeAll();
        signals.loadDialogueSuccess.removeAll();
        signals.loadDialogueError.removeAll();
        signals.getLetterGroupIdSuccess.removeAll();

        for (var k in this.componentMethod) {
            if (this.componentMethod.hasOwnProperty(k)) {
                delete this.componentMethod[k];
            }
        }

        this.props.dispatch(resetState());
    }

    componentDidUpdate() {
    }

    loadDialogueList() {
        let that = this;

        (function _load() {
            loadData();
            that.timer = setTimeout(function () {
                _load();
            }, 10 * 1000);
        })();

        function loadData() {
            that.props.dispatch(loadDialogueData(that.letterGroupId));
        }
    }

    scrollToBottom() {
        setTimeout(function () {
            goBottom(this.refs.J_Outer, this.refs.J_Inner);
        }.bind(this), 0);
    }

    // 发送成功之后重置输入栏
    resetDialogueData() {
        this.dialogueData.content = '';
    }

    submitHandler(content) {
        Toast.loading('发送中...');
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
            <div ref="J_Wrap" className='pageInner'>
                <TopBar data-has-back="true">
                    <div data-title>私信</div>
                </TopBar>

                <NoticeBar>当前版本无法查看签约详情,请等待新版行距发布!</NoticeBar>

                <div ref="J_Outer" className={`mainContent whiteBg`}>
                    <div ref="J_Inner">
                        <List items={items} myUserId={this.dialogueData['sendUser']}></List>
                    </div>
                </div>

                <InputBar bindingMethod={{context: this.componentMethod, methodName: ['clear']}}
                          submitHandler={this.submitHandler.bind(this)}
                          placeholder="请输入私信内容"
                ></InputBar>
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
