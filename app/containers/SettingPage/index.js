/*
 *
 * SettingPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';

import styles from './styles.css';

import {
    logout,
} from 'containers/App/actions';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';

export class SettingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.warn('SettingPage DidMount');
    }

    render() {
        let tags = this.props.tags || [];
        let that = this;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>设置</div>
                </TopBar>
                <List>
                    <List.Body>
                        <List.Item
                            arrow="horizontal"
                            onClick={function () {
                                this.context.router.push('/setting/profile');
                            }.bind(this)}
                        >
                            <div>编辑个人资料</div>
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            onClick={function () {
                                this.context.router.push('/setting/pushconfig');
                            }.bind(this)}
                        >
                            <div>推送通知</div>
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            onClick={function () {
                                this.context.router.push('/setting/feedback');
                            }.bind(this)}
                        >
                            <div>意见反馈</div>
                        </List.Item>
                        <List.Item
                            arrow="horizontal"
                            onClick={function () {
                                this.props.dispatch(logout());
                                this.context.router.push('/found');
                            }.bind(this)}
                        >
                            <div>退出</div>
                        </List.Item>
                    </List.Body>
                </List>
            </div>
        );
    }
}

SettingPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(SettingPage);
