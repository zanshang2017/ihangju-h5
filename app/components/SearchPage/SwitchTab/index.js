import React from 'react';

// import { SegmentedControl, WhiteSpace, WingBlank } from 'antd-mobile';
import Tabs from 'antd-mobile/lib/tabs';

import styles from './styles.css';

const TabPane = Tabs.TabPane;

export class SwitchTab extends React.Component { // eslint-disable-line react/prefer-stateless-function

    componentWillMount() {
        this.defaultTab = this.props.currentTab;
    }

    tabSwitchHandler(key) {
        this.props.switchTabHandler(key);
    }

    render() {

        return (
            <div className={`${styles.wrap} whiteBg`}>
                <Tabs defaultActiveKey={this.defaultTab} type="capsule" onChange={this.tabSwitchHandler.bind(this)}>
                    <TabPane tab="标签" key="1"></TabPane>
                    <TabPane tab="作品" key="2"></TabPane>
                    <TabPane tab="用户" key="3"></TabPane>
                </Tabs>
            </div>
        )
    }

}

SwitchTab.propTypes = {};

export default SwitchTab;


