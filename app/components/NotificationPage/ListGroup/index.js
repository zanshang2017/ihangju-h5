import React from 'react';

import styles from './styles.css';

import Result from 'antd-mobile/lib/page-result';

import _ from 'underscore';

import CommentList from 'components/NotificationPage/CommentList';
import MessageList from 'components/NotificationPage/MessageList';
import LoadingList from 'components/common/LoadingList';

import Tabs from 'antd-mobile/lib/tabs';

const TabPane = Tabs.TabPane;

let nList = null,
    nTabs = null,
    nTabsHeight = null,
    activeKey = 1;

class ListGroup extends React.Component {

    constructor(props) {
        super(props);
        nList = null;
        nTabs = null;
        nTabsHeight = null;
        activeKey = 1;
    }

    componentWillMount() {
        if (this.props.defaultTabKey !== activeKey) {
            activeKey = this.props.defaultTabKey;
            this.tabChangeHandler(activeKey);
        }
    }

    componentDidMount() {
        this.nWrap = this.refs.J_NotificationPageListGroupWrap.parentElement;
        this.curPage = 0;
        this.isLast = false;
    }

    componentWillUpdate() {
        if (activeKey == '1') {
            this.curPage = this.props.commentListStatus.get('page') || 0;
            this.isLast = this.props.commentListStatus.get('isLast') || false;
            this.isCommentListLoading = this.props.commentListStatus.get('loading');
        }

        if (activeKey == '2') {
            this.curPage = this.props.messageListStatus.get('page') || 0;
            this.isLast = this.props.messageListStatus.get('isLast') || false;
            this.isMessageListLoading = this.props.messageListStatus.get('loading');
        }
    }

    componentWillUnmount() {
        console.log('NotificationPage.ListGroup: willUnmount.');
    }

    loadHandler() {
        if (activeKey == '1' && !this.props.commentListStatus.get('loading')) {
            this.props.loadCommentHandler(this.curPage + 1);
        }

        if (activeKey == '2' && !this.props.messageListStatus.get('loading')) {
            this.props.loadMessageHandler(this.curPage + 1);
        }
    }

    tabChangeHandler(_activeKey) {
        activeKey = _activeKey;
        this.curPage = 0;

        switch (activeKey) {
            case '1':
                this.props.loadCommentHandler();
                break;

            case '2':
                this.props.loadMessageHandler();
                break;

            default:
                break;
        }
    }

    render() {

        let commentHtml = <Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png?imageMogr2/auto-orient/"
            title="还没有任何评论哦~"
        />;

        let messageHtml = <Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png?imageMogr2/auto-orient/"
            title="还没有任何通知哦~"
        />;

        if (this.props.commentList) {
            commentHtml = <CommentList {...this.props} items={this.props.commentList || []}/>;
        }

        if (this.props.messageList) {
            messageHtml = <MessageList {...this.props} items={this.props.messageList || []}/>;
        }

        let status = '';

        if (activeKey == '1') {
            status = this.props.commentListStatus.toJS();
            this.curPage = status.page || 0;
            this.isLast = status.isLast || false;
            this.isCommentListLoading = status.loading;
        }

        if (activeKey == '2') {
            status = this.props.messageListStatus.toJS();
            this.curPage = status.page || 0;
            this.isLast = status.isLast || false;
            this.isMessageListLoading = status.loading;
        }

        return (
            <div ref="J_NotificationPageListGroupWrap" className="tagDetailPageListGroup">
                <Tabs ref="J_Tabs" defaultActiveKey={activeKey} onChange={this.tabChangeHandler.bind(this)}>
                    <TabPane tab="评论" key="1">
                        <div className="blockGapTag"></div>
                        <LoadingList outer={this.nWrap}
                                     isLast={this.isLast}
                                     isLoading={this.isCommentListLoading}
                                     loadHandler={this.loadHandler.bind(this)}
                                     offset="350">
                            {commentHtml}
                            <div className="blockGapTag"></div>
                        </LoadingList>
                    </TabPane>
                    <TabPane tab="通知" key="2">
                        <div className="blockGapTag"></div>
                        <LoadingList outer={this.nWrap}
                                     isLast={this.isLast}
                                     isLoading={this.isMessageListLoading}
                                     loadHandler={this.loadHandler.bind(this)}
                                     offset="350">
                            {messageHtml}
                            <div className="blockGapTag"></div>
                        </LoadingList>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

ListGroup.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default ListGroup;


