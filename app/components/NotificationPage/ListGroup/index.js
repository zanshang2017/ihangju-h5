import React from 'react';

import styles from './styles.css';

import Result from 'antd-mobile/lib/page-result';

import _ from 'underscore';

import CommentList from 'components/NotificationPage/CommentList';
import MessageList from 'components/NotificationPage/MessageList';

import {} from 'containers/NotificationPage/actions';

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

        this.scrollHanderBinded = null;
        this.curPage = 0;
        this.isLast = false;
    }

    componentWillMount() {
        if (this.props.defaultTabKey !== activeKey) {
            activeKey = this.props.defaultTabKey;
            this.tabChangeHandler(activeKey);
        }
    }

    componentDidMount() {
        var that = this;

        this.nWrap = this.refs.J_NotificationPageListGroupWrap.parentElement;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        that.nWrap.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentWillUpdate(nProps) {
        if (activeKey == '1') {
            this.curPage = this.props.commentListStatus.get('page') || 0;
            this.isLast = this.props.commentListStatus.get('isLast') || false;
        }

        if (activeKey == '2') {
            this.curPage = this.props.messageListStatus.get('page') || 0;
            this.isLast = this.props.messageListStatus.get('isLast') || false;
        }
    }

    componentWillUnmount() {
        console.log('NotificationPage.ListGroup: willUnmount.');

        //移除侦听
        if (this.scrollHanderBinded) {
            this.nWrap.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        var nWrapH = this.nWrap.getBoundingClientRect().height;

        console.log(Math.ceil(this.nWrap.scrollTop + nWrapH), this.nWrap.scrollHeight);

        if (this.nWrap.scrollHeight - (this.nWrap.scrollTop + nWrapH) < 100) {
            //加载下一页
            if (activeKey == '1' && !this.props.commentListStatus.get('loading')) {
                let status = this.props.commentListStatus.toJS();
                this.isLast = status ? status.isLast : false;
                this.curPage = status ? status.page : 0;
                if (!status.loading && !this.isLast) {
                    this.props.loadCommentHandler(this.curPage + 1);
                }
            }

            if (activeKey == '2' && !this.props.messageListStatus.get('loading')) {
                let status = this.props.messageListStatus.toJS();

                this.isLast = status ? status.isLast : false;
                this.curPage = status ? status.page : 0;
                // console.log(this.isLast, this.curPage);
                if (!status.loading && !this.isLast) {
                    this.props.loadMessageHandler(this.curPage + 1);
                }
            }
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


        return (
            <div ref="J_NotificationPageListGroupWrap" className="tagDetailPageListGroup">
                <Tabs ref="J_Tabs" defaultActiveKey={activeKey} onChange={this.tabChangeHandler.bind(this)}>
                    <TabPane tab="评论" key="1">
                        <div className="blockGapTag"></div>
                        {commentHtml}
                    </TabPane>
                    <TabPane tab="通知" key="2">
                        <div className="blockGapTag"></div>
                        {messageHtml}
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


