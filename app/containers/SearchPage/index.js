/*
 *
 * SearchPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createSelector} from 'reselect';

import {
    locStorage,
    goBackHelper
} from 'utils/util';

import {
    selectHistory,
    selectCurrentTab,
    selectSearchStatus,
    searchData,
    searchKeyword,
} from './selectors';

import {
    loadSearchResult,
    changeTag,
    removeAllHistory,
    addHistory,
    initHistory,
    resetAllState,
    setSearchKeyword,
} from './actions';

import {
    SEARCH_HISTORY_KEYWORDS_LOCALSTORAGE
} from './constants';

import SearchBar from 'components/SearchPage/SearchBar';
import HistoryList from 'components/SearchPage/HistoryList';
// import SearchResult from 'components/SearchPage/SearchResult';
import SwitchTab from 'components/SearchPage/SwitchTab';

import ProjectList from 'components/SearchPage/ProjectList'
import TagList from 'components/SearchPage/TagList'
import UserList from 'components/SearchPage/UserList'

import styles from './styles.scss';

export class SearchPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {
    }

    componentWillMount() {
        let historyKw = JSON.parse(locStorage.get(SEARCH_HISTORY_KEYWORDS_LOCALSTORAGE));
        if (historyKw && historyKw.length > 0) {
            this.props.dispatch(initHistory(historyKw));
        }
    }

    componentDidMount() {
        console.log('SearchPage DidMount');

        let searchData = this.props.searchData ? this.props.searchData.toJS() : false;

        if (searchData) {
            this.showResultPage();
        }

        this.gbHelper = goBackHelper(function (e) {
            if (e.newURL.indexOf('/found') > -1) {
                this.props.dispatch(resetAllState());
            }
        }.bind(this));
    }

    componentWillUnmount() {
        this.gbHelper.remove();
    }

    articleClickHandler(e) {
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    searchHandler(keyword = '') {
        this.keyword = keyword;
        this.showResultPage();
        this.props.dispatch(loadSearchResult(keyword));
        this.props.dispatch(addHistory(keyword));
        this.props.dispatch(setSearchKeyword(keyword));
        this.refs.J_SearchBar.setInputValue(keyword);

    }

    showResultPage() {
        this.refs.J_History.classList.add('hide');
        this.refs.J_SwitchTab.classList.remove('hide');
    }

    switchTabHandler(key = '1') {
        this.props.dispatch(changeTag(key));
    }

    removeAllHistoryHandler() {
        this.props.dispatch(removeAllHistory());
    }

    loadNextHandler() {
        let page = this.props.searchStatus ? this.props.searchStatus.toJS().page : 0;
        this.props.dispatch(loadSearchResult(this.keyword, page + 1));
    }

    render() {
        let curTab = this.props.currentTab;
        let tab1Cls = '', tab2Cls = '', tab3Cls = '';

        if (this.props.searchKeyword == '') {
            tab1Cls = 'hide';
            tab2Cls = 'hide';
            tab3Cls = 'hide';
        } else {
            tab1Cls = (curTab != 1) ? 'hide' : '';
            tab2Cls = (curTab != 2) ? 'hide' : '';
            tab3Cls = (curTab != 3) ? 'hide' : '';
        }

        return (
            <div className="pageInner">
                <SearchBar ref="J_SearchBar" {...this.props} searchHandler={this.searchHandler.bind(this)}></SearchBar>
                <div ref="J_History" className="mainContent">
                    <HistoryList items={this.props.history}
                                 searchHandler={this.searchHandler.bind(this)}
                                 removeAllHistoryHandler={this.removeAllHistoryHandler.bind(this)}/>
                </div>

                <div ref="J_SwitchTab" className="hide">
                    <SwitchTab {...this.props} switchTabHandler={this.switchTabHandler.bind(this)}/>
                </div>

                <div ref="tagOuter" className={`${tab1Cls} mainContent`}>
                    <TagList {...this.props} loadNextHandler={this.loadNextHandler.bind(this)} outer={this.refs.tagOuter} />
                </div>
                <div ref="projectOuter" className={`${tab2Cls} mainContent`}>
                    <ProjectList {...this.props} loadNextHandler={this.loadNextHandler.bind(this)} outer={this.refs.projectOuter} />
                </div>
                <div ref="userOuter" className={`${tab3Cls} mainContent`}>
                    <UserList {...this.props} loadNextHandler={this.loadNextHandler.bind(this)} outer={this.refs.userOuter} />
                </div>

            </div>
        );
    }
}

const mapStateToProps = createSelector(
    selectHistory(),
    selectCurrentTab(),
    selectSearchStatus(),
    searchData(),
    searchKeyword(),
    (history, currentTab, searchStatus, searchData, searchKeyword) => {
        return {
            history,
            currentTab,
            searchStatus,
            searchData,
            searchKeyword,
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        // refresh: () => dispatch(loadDiscoveriesData())
    };
}

SearchPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
