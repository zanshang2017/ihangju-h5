import React from 'react';

import styles from './styles.css';

import CatelogList from 'components/common/CatelogList';

// import Tabs from 'antd/lib/tabs';

import Tabs from 'antd-mobile/lib/tabs';

const TabPane = Tabs.TabPane;

let nList = null,
    nTabs = null,
    nTabsHeight = null;

class MainContent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        //tab固顶
        nTabs = document.querySelector('#J_FoundPageMainContentWrap .am-tab-bar');
        nList = document.querySelector('#J_FoundPageMainContentWrap .am-tab-content');
        nTabsHeight = nTabs.getBoundingClientRect().height;
        window.addEventListener('scroll', scrollHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', scrollHandler);
    }

    componentWillUpdate() {
    }

    render() {
        var props = this.props;

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

//处理分类bar的固顶
function scrollHandler(e) {
    if (nList.getBoundingClientRect().top <= nTabsHeight) {
        nTabs.classList.add('fixedTop');
    } else {
        nTabs.classList.remove('fixedTop');
    }
}


