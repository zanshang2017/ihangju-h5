/*
 *
 * CommentsPage
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectComments,
    selectPlaceholder,
} from './selectors';

import {
    loadCommentsData,
    sendCommentsData,
    changePlaceholder,
    resetStates,
} from './actions';

import _ from 'underscore';
import styles from './styles.css';

import signals from './signals';
import {
    goTop
} from 'utils/util';

import {Env} from 'utils/env.js';

import TopBar from 'components/common/TopBar';
import List from 'components/CommentsPage/List';
import FloatTools from 'components/CommentsPage/FloatTools';
import InputBar from 'components/common/InputBar';
import {
    DEFAULT_PLACEHOLDER
} from 'components/common/InputBar/constants';

import Toast from 'antd-mobile/lib/toast';

export class CommentsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';

        this.replyData = {
            content: '',

            projectid: '', //所回复项目的id,在添加新评论时发送

            //父id和类型,在回复他人评论时发送
            parentid: '',
            type: '',
        };

        // 回复浮层展开时点中的回复人信息
        this.replyReadyInfo = {
            id: '',
            name: '',
            type: '',
        };

        this.componentMethod = {};

        this.touchStartY = 0;
        this.touchStartHandlerBind = this.touchStartHandler.bind(this);
        this.preventHandlerBind = this.preventHandler.bind(this);
    }

    componentWillMount() {
        if (this.props.routeParams) {
            if (this.id = this.replyData.projectid = this.props.routeParams.id) {
                this.props.dispatch(loadCommentsData(this.id));
            }
        }
    }

    componentDidMount() {
        let that = this;
        signals.sendCommentSuccess.add(()=> {
            that.resetReplyData();
            try {
                Toast.hide();
            }catch(e){}
        });

        signals.sendCommentError.add(()=> {
            try {
                Toast.hide();
            }catch(e){}
            Toast.fail('评论发送失败,请检查网络!', 3);
        });

        this.refs.J_MainContent.addEventListener('touchstart', this.touchStartHandlerBind);
    }

    componentWillUnmount() {
        signals.sendCommentSuccess.removeAll();
        signals.sendCommentError.removeAll();

        this.refs.J_MainContent.removeEventListener('touchstart', this.touchStartHandlerBind);
        this.refs.J_MainContent.removeEventListener('touchmove', this.preventHandlerBind);
        clearInterval(this.keyboardFixTimer);

        this.props.dispatch(resetStates());

        for (var k in this.componentMethod) {
            if (this.componentMethod.hasOwnProperty(k)) {
                delete this.componentMethod[k];
            }
        }
    }

    // 发送成功之后重置输入栏
    resetReplyData() {
        this.props.dispatch(changePlaceholder(DEFAULT_PLACEHOLDER));

        let isGoTop = (this.replyData.type == '');

        this.replyData.content = '';
        this.replyData.parentid = '';
        this.replyData.type = '';

        isGoTop && goTop(this.refs.J_MainContent);
    }

    nextPageHandler(page = 0) {
        if (this.id) {
            // console.log('load page:', page);
            this.props.dispatch(loadCommentsData(this.id, page));
        }
    }

    clickReplyHandler() {
        // console.log('回复');
        // 重置输入框
        this.props.dispatch(changePlaceholder(this.replyReadyInfo.name));

        // 设置回复信息
        this.replyData.parentid = this.replyReadyInfo.id;
        this.replyData.type = this.replyReadyInfo.type;
    }

    clickReportHandler() {
        // console.log('举报');
        Toast.info('举报成功', 1.5);
    }

    listClickHandler(e, opt) {
        var id = opt.id,
            name = opt.name || '',
            type = opt.type || 'answer',
            event = e.nativeEvent,
            nWrap = this.refs.J_FloatTools.refs.J_Wrap,
            nTools = this.refs.J_FloatTools.refs.J_Tools,
            nMainW = this.refs.J_MainContent.clientWidth,
            _style = '',
            nToolsW = '';


        // 获取当前点击的用户信息
        this.replyReadyInfo.id = id;
        this.replyReadyInfo.name = name;
        this.replyReadyInfo.type = type;

        if (id) {
            nWrap.style.display = '';
            nToolsW = nTools.clientWidth;

            if (event.pageX + nToolsW > nMainW) {
                _style = `top:${event.pageY + 'px'};left:${nMainW - nToolsW - 2 + 'px'}`;
            } else {
                _style = `top:${event.pageY + 'px'};left:${event.pageX + 'px'}`;
            }

            nTools.setAttribute('style', _style);
        }
    }

    submitHandler(content) {
        Toast.loading('发送中...');
        this.replyData.content = content;
        this.props.dispatch(sendCommentsData(_.clone(this.replyData)));
        this.componentMethod['clear'] && this.componentMethod['clear']();
    }

    onInputFocusHandler() {
        console.log('focus');

        clearInterval(this.keyboardFixTimer);

        if (Env.platform.iphone || Env.platform.ipad) {
            this.keyboardFixTimer = setInterval(()=> {
                let nWrap = ReactDOM.findDOMNode(this.refs.J_Wrap);
                console.log('A:' + nWrap.style.height, 'B:' + window.innerHeight, 'C:' + document.documentElement.clientHeight, 'D:' + window.pageYOffset);
                nWrap.style.height = window.innerHeight - window.pageYOffset + 'px';
                nWrap.classList.add(styles.onKeyboardShown);
            }, 350);
        }

        this.refs.J_MainContent.addEventListener('touchmove', this.preventHandlerBind);
    }

    onInputBlurHandler() {
        console.log('blur');

        if (Env.platform.iphone || Env.platform.ipad) {
            let nWrap = ReactDOM.findDOMNode(this.refs.J_Wrap);
            nWrap.style.height = '100%';
            nWrap.classList.remove(styles.onKeyboardShown);
        }

        if (this.keyboardFixTimer) {
            clearInterval(this.keyboardFixTimer);
        }

        this.refs.J_MainContent.removeEventListener('touchmove', this.preventHandlerBind);
    }

    preventHandler(e) {
        let outer = ReactDOM.findDOMNode(this.refs.J_MainContent);
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
        let comments = this.props.comments ? this.props.comments.toJS() : {};
        let items = comments.data ? comments.data : [];
        let page = comments.page || 0;
        let isLast = comments.isLast || false;
        let loading = comments.loading || false;

        return (
            <div ref="J_Wrap" className={`pageInner hasFasterTransition`}>
                <TopBar data-has-back="true">
                    <div data-title>评论</div>
                </TopBar>
                <div ref="J_MainContent" className={`mainContent`}>
                    <List page={page}
                          isLast={isLast}
                          loading={loading}
                          items={items}
                          nextPageHandler={this.nextPageHandler.bind(this)}
                          listClickHandler={this.listClickHandler.bind(this)}></List>
                    <FloatTools ref="J_FloatTools"
                                clickReplyHandler={this.clickReplyHandler.bind(this)}
                                clickReportHandler={this.clickReportHandler.bind(this)}
                    ></FloatTools>
                </div>
                <InputBar bindingMethod={{context: this.componentMethod, methodName: ['clear']}}
                          placeholder={this.props.placeholder}
                          submitHandler={this.submitHandler.bind(this)}
                          onInputFocus={this.onInputFocusHandler.bind(this)}
                          onInputBlur={this.onInputBlurHandler.bind(this)}
                ></InputBar>
            </div>
        );
    }
}

CommentsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectComments(),
    selectPlaceholder(),
    (comments, placeholder) => ({comments, placeholder})
), mapDispatchToProps)(CommentsPage);
//export default connect(null, mapDispatchToProps)(CommentsPage);
