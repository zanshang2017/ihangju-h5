/*
 *
 * NotificationPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';

import {createSelector} from 'reselect';
import {
    selectCommentList,
    selectCommentListStatus,
    selectMessageList,
    selectMessageListStatus,
} from './selectors';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadCommentList,
    loadMessageList,
    setCommentListStatus,
    setMessageListStatus,
} from './actions';

import TopBar from 'components/common/TopBar';
import ListGroup from 'components/NotificationPage/ListGroup';

import ActionSheet from 'antd-mobile/lib/action-sheet';
import Toast from 'antd-mobile/lib/toast';

import styles from './styles.css';

export class NotificationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.UserID = null;
        this.userInfo = null;
    }

    loadCommentHandler(page = 0, size = 10) {
        if (page == 0) {
            this.props.dispatch(setCommentListStatus({
                page: 0,
                isLast: false
            }));
        } else {
            this.props.dispatch(setCommentListStatus({
                page: page
            }));
        }

        this.props.dispatch(loadCommentList(page, size));
    }

    loadMessageHandler(page = 0, size = 10) {
        if (page == 0) {
            this.props.dispatch(setMessageListStatus({
                page: 0,
                isLast: false
            }));
        } else {
            this.props.dispatch(setMessageListStatus({
                page: page
            }));
        }

        this.props.dispatch(loadMessageList(page, size));
    }

    showCommentActionSheet(id) {
        const BUTTONS = ['查看详情', '举报', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
            },
            (buttonIndex) => {
                switch(buttonIndex) {
                    case 0:
                        alert('评论详情');
                        break;

                    case 1:
                        Toast.info('举报成功');
                        break;

                    default:
                        break;
                };
            });
    }

    commentClickHandler(id) {
        this.showCommentActionSheet(id);
    }

    userClickHandler(id) {
        this.context.router.push('/person/' + id);
    }

    componentWillMount() {
        if (this.props.userInfo) {
            this.userInfo = this.props.userInfo.toJS();
        } else {
            this.context.router.push('/login');
        }
    }

    componentDidMount() {
        // console.warn('NotificationPage DidMount', this.isAdmin, this.tagID);
        this.props.dispatch(loadCommentList());
    }

    componentWillUpdate(props) {
        // console.log('will update', props.detail);
    }

    componentWillUnmount() {
        // console.warn('NotificationPage willUnmount');
    }

    render() {
        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>消息</div>
                </TopBar>

                <ListGroup
                    {...this.props}
                    loadCommentHandler={this.loadCommentHandler.bind(this)}
                    loadMessageHandler={this.loadMessageHandler.bind(this)}
                    commentClickHandler={this.commentClickHandler.bind(this)}
                    userClickHandler={this.userClickHandler.bind(this)}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const mapStateToProps = createSelector(
    selectUserInfo(),
    selectCommentList(),
    selectMessageList(),
    selectCommentListStatus(),
    selectMessageListStatus(),
    (userInfo, commentList, messageList, commentListStatus, messageListStatus) => {
        return {
            userInfo,
            commentList,
            messageList,
            commentListStatus,
            messageListStatus,
        }
    }
);

NotificationPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);

