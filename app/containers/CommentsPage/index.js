/*
 *
 * CommentsPage
 *
 */

import React from 'react';
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
} from './actions';

import _ from 'underscore';

import styles from './styles.css';

import signals from './signals';

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
        }
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
        });
    }

    componentWillUnmount() {
        signals.sendCommentSuccess.removeAll();
    }

    // 发送成功之后重置输入栏
    resetReplyData() {
        this.props.dispatch(changePlaceholder(DEFAULT_PLACEHOLDER));
        this.replyData.content = '';
        this.replyData.parentid = '';
        this.replyData.type = '';
    }

    nextPageHandler(page = 0) {
        if (this.id) {
            console.log('load page:', page);
            this.props.dispatch(loadCommentsData(this.id, page));
        }
    }

    clickReplyHandler() {
        console.log('回复');
        // 重置输入框
        this.props.dispatch(changePlaceholder(this.replyReadyInfo.name));

        // 设置回复信息
        this.replyData.parentid = this.replyReadyInfo.id;
        this.replyData.type = this.replyReadyInfo.type;
    }

    clickReportHandler() {
        console.log('举报');
        Toast.info('举报成功', 1.5);
    }

    listClickHandler(e, opt) {
        var id = opt.id;
        var name = opt.name || '';
        var type = opt.type || 'answer';
        var event = e.nativeEvent;
        var nWrap = this.refs.J_FloatTools.refs.J_Wrap;
        var nTools = this.refs.J_FloatTools.refs.J_Tools;

        // 获取当前点击的用户信息
        this.replyReadyInfo.id = id;
        this.replyReadyInfo.name = name;
        this.replyReadyInfo.type = type;

        if (id) {
            var _style = `top:${event.pageY + 'px'};left:${event.pageX + 'px'}`;
            nWrap.style.display = '';
            nTools.setAttribute('style', _style);
        }
    }

    submitHandler(content) {
        this.replyData.content = content;
        this.props.dispatch(sendCommentsData(_.clone(this.replyData)));
    }

    render() {
        let comments = this.props.comments ? this.props.comments.toJS() : {};
        let items = comments.data ? comments.data : [];
        let page = comments.page || 0;
        let isLast = comments.isLast || false;
        let loading = comments.loading || false;

        return (
            <div className={`pageInner`}>
                <TopBar data-has-back="true">
                    <div data-title>评论</div>
                </TopBar>
                <div className="mainContent">
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
                <InputBar placeholder={this.props.placeholder} submitHandler={this.submitHandler.bind(this)}></InputBar>
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
