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

import secretMenu from 'utils/secretMenu';

class SettingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.tapCount = 0;
        this.tapCountTimeout = null;
    }

    componentWillMount() {
    }

    componentDidMount() {
        secretMenu.doListen(this.refs.J_Version);
        console.warn('SettingPage DidMount');
    }

    componentWillUnmount() {
        secretMenu.removeListen();
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

                                    {/*this.context.router.go(-1); //回退一步,保持没有多余的回退页面*/}

                                    setTimeout(()=> {
                                        this.context.router.replace('/found');
                                    }, 10);
                                }.bind(this)}
                            >
                                <div className={styles.listWrap}>退出</div>
                            </List.Item>
                        </List.Body>
                    </List>

                    <div ref="J_Version" className={styles.version}>
                        <p>版本:{Env.shell}({Env.VERSION})</p>
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
