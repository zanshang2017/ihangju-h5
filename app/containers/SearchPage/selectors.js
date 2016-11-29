import {createSelector} from 'reselect';

const selectSearchPageDomain = () => state => state.get('searchPage');

const selectSearchPage = () => createSelector(
    selectSearchPageDomain(),
    (searchPageState) => searchPageState
);

const selectHistory = () => createSelector(
    selectSearchPageDomain(),
    (substate) => substate.get('historyKeywords')
);

const selectCurrentTab = () => createSelector(
    selectSearchPageDomain(),
    (substate) => substate.get('currentTab')
);

const selectSearchStatus = () => createSelector(
    selectSearchPageDomain(),
    (substate) => substate.get('searchStatus')
);

const searchData = () => createSelector(
    selectSearchPageDomain(),
    (substate) => substate.get('searchData')
);

const searchKeyword = () => createSelector(
    selectSearchPageDomain(),
    (substate) => substate.get('searchKeyword')
);

export default selectSearchPage;
export {
    selectSearchPageDomain,
    selectHistory,
    selectCurrentTab,
    selectSearchStatus,
    searchData,
    searchKeyword,
};
