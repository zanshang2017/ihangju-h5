import React from 'react';

import CatelogList from 'components/common/CatelogList';

import styles from './styles.css';

class MainContent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    searchBtnHandler() {
        this.context.router.push(`/search`);
        //搜索点击 埋点
        zhuge.track('搜索点击');
    }

    render() {
        return (
            <div id="J_FoundPageMainContentWrap" className={styles.foundPageMainContent}>
                <div className={styles.navBar}>
                    <div className={styles.title}>
                        <span>分类</span>
                    </div>
                    <div ref="J_SearchBtn" className={styles.searchBtn} data-hashover="true"
                         onClick={this.searchBtnHandler.bind(this)}>
                        <div className={`iconSearch ${styles.searchIcon}`}></div>
                    </div>
                </div>
                <CatelogList items={this.props.tags || []} refreshHandler={this.props.refresh}/>
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

MainContent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default MainContent;

