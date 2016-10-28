/*
 *
 * SettingPage
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import styles from './styles.css';

import {
    logout,
} from 'containers/App/actions';

import {
    Env
} from 'utils/env';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';

class SettingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.tapCount = 0;
    }

    componentWillMount() {
    }

    componentDidMount() {
        var that = this;
        console.warn('SettingPage DidMount');

        // this.refs.J_Wrap.addEventListener('touchstart', function () {
        //     that.tapCount++;
        //     if (that.tapCount > 15) {
        //         that.tapCount = 0;
        //     }
        // });
    }

    render() {

        return (
            <div className="pageInner">
                <TopBar data-has-back="true">
                    <div data-title>设置</div>
                </TopBar>

                <div ref="J_Wrap" className={`${styles.wrap} mainContent deepBg`}>
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
                                    //todo 同时取消消息推送
                                    this.context.router.push('/found');
                                }.bind(this)}
                            >
                                <div className={styles.listWrap}>退出</div>
                            </List.Item>
                        </List.Body>
                    </List>

                    <div className={styles.version}>
                        <p>版本:{window.__APP_CONFIG.ver}_{Env.shell}</p>
                    </div>

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
