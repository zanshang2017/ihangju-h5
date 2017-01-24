/*
 *
 * DialoguePage
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectDialogue,
    selectAgreementStatus,
} from './selectors';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadDialogueData,
    sendDialogueData,
    getLetterGroupId,
    getAgreementStatus,
    resetState,
} from './actions';

import _ from 'underscore';

import {
    goBottom
} from 'utils/util';

import {Env} from 'utils/env.js';

import {
    AGREEMENT_STATUS
} from './constants';

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
        this.providerId = '';

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

        this.touchStartY = 0;
        this.preventHandlerBind = this.preventHandler.bind(this);
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
                this.loadAgreementStatus(paramId);
            } else { //否则是userId,须从后台获取groupId
                this.props.dispatch(getLetterGroupId(paramId));

                signals.getLetterGroupIdSuccess.add((letterGroupId)=> {
                    that.letterGroupId = letterGroupId;
                    that.loadDialogueList();
                    this.loadAgreementStatus(letterGroupId);
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

        this.refs.J_NoticeBarWrap.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });

        this.refs.J_Outer.addEventListener('touchstart', this.touchStartHandler.bind(this));
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

    loadAgreementStatus(groupId) {
        let userId = this.dialogueData['sendUser'];

        if (groupId) {
            //从groupId中解析出对方id
            let groups = groupId.split(':');
            this.providerId = groups[0] === userId ? groups[1] : groups[0];
            this.props.dispatch(getAgreementStatus(this.providerId));
        }
    }

    gotoAgreementDetail() {
        this.context.router.push(`/agreement/detail/${this.providerId}`);
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

    onInputFocusHandler() {
        console.log('focus');

        if (Env.platform.iphone || Env.platform.ipad) {
            let n = 0;
            let flag = setInterval(()=> {
                if (n >= 5) {
                    clearInterval(flag);
                }

                n++;

                let nWrap = ReactDOM.findDOMNode(this.refs.J_Wrap);
                console.log('A:' + nWrap.style.height, 'B:' + window.innerHeight, 'C:' + document.documentElement.clientHeight, 'D:' + window.pageYOffset);
                nWrap.style.height = window.innerHeight - window.pageYOffset + 'px';
                nWrap.classList.add(styles.onKeyboardShown);
            }, 350);
        }

        this.refs.J_Outer.addEventListener('touchmove', this.preventHandlerBind);
    }

    onInputBlurHandler() {
        console.log('blur');

        if (Env.platform.iphone || Env.platform.ipad) {
            let nWrap = ReactDOM.findDOMNode(this.refs.J_Wrap);
            nWrap.style.height = '100%';
            nWrap.classList.remove(styles.onKeyboardShown);
        }

        this.refs.J_Outer.removeEventListener('touchmove', this.preventHandlerBind);
    }

    preventHandler(e) {
        let outer = ReactDOM.findDOMNode(this.refs.J_Outer);
        if (e.touches) {
            let y = e.touches[0].clientY;
            // console.log('y', y, 'this.touchStartY', this.touchStartY);

            if(y - this.touchStartY < 0) {
                console.log('swipeTop');
                return;
            } else {
                console.log('swipeBottom');
                if(outer.scrollTop <= 0) {
                    e.preventDefault();
                }
            }
        }
    }

    touchStartHandler(e) {
        if (e.touches) {
            this.touchStartY = e.touches[0].clientY || 0;
            console.log('this.touchStartY', this.touchStartY);
        }
    }

    render() {
        let dialogue = this.props.dialogue ? this.props.dialogue.toJS() : {};
        let agreementStatus = this.props.agreementStatus ? this.props.agreementStatus.toJS() : false;
        let items = dialogue.data ? dialogue.data.reverse() : []; //反序展示
        // let page = dialogue.page || 0;
        // let isLast = dialogue.isLast || false;
        // let loading = dialogue.loading || false;
        let _noticeHtml = '';

        if (agreementStatus && agreementStatus.result && agreementStatus.result.laststatus != '') {
            let _status = AGREEMENT_STATUS[agreementStatus.result.laststatus] || {};
            _noticeHtml = <NoticeBar>
                <div className="fl">{_status.desc}</div>
                <div className="fr" onClick={this.gotoAgreementDetail.bind(this)}>详情<i className="anticon anticon-right"></i></div>
            </NoticeBar>;
        }


        return (
            <div ref="J_Wrap" className='pageInner'>
                <TopBar ref="J_TopBar" data-has-back="true">
                    <div data-title>私信</div>
                </TopBar>

                <div ref="J_NoticeBarWrap" className={`${styles.noticeBarWrap}`}>
                    {_noticeHtml}
                </div>

                <div ref="J_Outer" className={`mainContent whiteBg`}>
                    <div ref="J_Inner" className={`${styles.mainInner}`}>
                        <List items={items} myUserId={this.dialogueData['sendUser']} loading={dialogue['loading']}></List>
                    </div>
                </div>

                <InputBar bindingMethod={{context: this.componentMethod, methodName: ['clear']}}
                          submitHandler={this.submitHandler.bind(this)}
                          placeholder="请输入私信内容"
                          onInputFocus={this.onInputFocusHandler.bind(this)}
                          onInputBlur={this.onInputBlurHandler.bind(this)}
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
    selectAgreementStatus(),
    (userInfo, dialogue, agreementStatus) => ({userInfo, dialogue, agreementStatus})
), mapDispatchToProps)(DialoguePage);

