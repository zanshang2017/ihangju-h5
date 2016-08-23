import React from 'react';

import styles from './styles.css';

import CatelogList from 'components/common/CatelogList';

import {
    Tabs,
    Affix
} from 'antd';

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
        nList = document.querySelector('#J_FoundPageMainContentWrap .ant-tabs-content');
        nTabs = document.querySelector('#J_FoundPageMainContentWrap .ant-tabs-bar');
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
        console.log(props);
        return (
            <div id="J_FoundPageMainContentWrap" className="foundPageMainContent">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="分类" key="1">
                        <CatelogList items={this.props.tags || []} refreshHandler={this.props.refresh} />
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


const FIXED_CLASS = ' fixedTop';

function scrollHandler(e) {
    if (nList.getBoundingClientRect().top <= nTabsHeight) {
        if(nTabs.className.indexOf(FIXED_CLASS) < 0){
            nTabs.className += FIXED_CLASS;
        }
    } else {
        if (nTabs.className.indexOf(FIXED_CLASS) > -1) {
            var reg = new RegExp(FIXED_CLASS, 'igm');
            nTabs.className = nTabs.className.replace(reg, '');
        }
    }
}


