import {createSelector} from 'reselect';

const selectFansListPageDomain = () => state => state.get('fansListPage');

const selectFansListPage = () => createSelector(
    selectFansListPageDomain(),
    (substate) => substate
);

const selectFansList = () => createSelector(
    selectFansListPageDomain(),
    (FansListPageState) => FansListPageState.get('fansList')
);

export default selectFansListPage;
export {
    selectFansListPageDomain,
    selectFansList
};


