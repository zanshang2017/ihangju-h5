import React from 'react';

import styles from './styles.css';

import CatelogList from 'components/common/CatelogList';

import {
    Tabs
} from 'antd';

const TabPane = Tabs.TabPane;

let nList = null,
    nTabs = null,
    nTabsHeight = null;

class ListGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        var props = this.props;

        return (
            <div id="J_TagDetailPageListGroupWrap" className="tagDetailPageListGroup">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="推荐作品" key="1">
                        <CatelogList items={this.props.recommendation || []} refreshHandler={this.props.refresh} />
                    </TabPane>
                    <TabPane tab="全部作品" key="2">
                        <CatelogList items={this.props.all || []} refreshHandler={this.props.refresh} />
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


