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

class SettingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
            <div className="pageInner">
                <TopBar data-has-back="true">
                    <div data-title>设置</div>
                </TopBar>

                <div className={`${styles.wrap} mainContent`}>
                    <List>
                        <List.Body>
                            <List.Item
                                arrow="horizontal"
                                onClick={function () {
                                    this.context.router.push('/setting/profile');
                                }.bind(this)}
                            >
                                <div className={styles.listWrap}>编辑个人资料</div>
                            </List.Item>
                            <List.Item
                                arrow="horizontal"
                                onClick={function () {
                                    this.context.router.push('/setting/pushconfig');
                                }.bind(this)}
                            >
                                <div className={styles.listWrap}>推送通知</div>
                            </List.Item>
                            <List.Item
                                arrow="horizontal"
                                onClick={function () {
                                    this.context.router.push('/setting/feedback');
                                }.bind(this)}
                            >
                                <div className={styles.listWrap}>意见反馈</div>
                            </List.Item>
                        </List.Body>
                    </List>

                    <List>
                        <List.Body>
                            <List.Item
                                arrow="horizontal"
                                onClick={function () {
                                    this.props.dispatch(logout());
                                    this.context.router.push('/found');
                                }.bind(this)}
                            >
                                <div className={styles.listWrap}>退出</div>
                            </List.Item>
                        </List.Body>
                    </List>
                </div>
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
