import React from 'react';

import styles from './styles.css';

import CatelogList from 'components/common/CatelogList';

import Tabs from 'antd-mobile/lib/tabs';

const TabPane = Tabs.TabPane;

class MainContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="J_FoundPageMainContentWrap" className="foundPageMainContent">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="分类" key="1">
                        <CatelogList items={this.props.tags || []} refreshHandler={this.props.refresh}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

MainContent.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default MainContent;

