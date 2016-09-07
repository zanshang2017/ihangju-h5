import React from 'react';

import styles from './styles.css';

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
    }

    componentDidMount() {
        var that = this;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        window.addEventListener('scroll', that.scrollHanderBinded);
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
            window.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        var nWrap = document.body;
        var nWrapH = nWrap.getBoundingClientRect().height;

        // console.log(nWrap.scrollTop + nWrapH, nWrap.scrollHeight, this.props.recommendationListStatus.toJS(), this.props.projectListStatus.toJS());

        if (nWrap.scrollTop + nWrapH >= nWrap.scrollHeight) {
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
        return (
            <div id="J_NotificationPageListGroupWrap" className="tagDetailPageListGroup">
                <Tabs ref="J_Tabs" defaultActiveKey="1" onChange={this.tabChangeHandler.bind(this)}>
                    <TabPane tab="评论" key="1">
                        <CommentList {...this.props} items={this.props.commentList || []} />
                    </TabPane>
                    <TabPane tab="通知" key="2">
                        <MessageList {...this.props} items={this.props.messageList || []} />
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


