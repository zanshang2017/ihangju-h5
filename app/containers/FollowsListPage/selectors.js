import {createSelector} from 'reselect';

const selectFollowsListPageDomain = () => state => state.get('followsListPage');

const selectFollowsListPage = () => createSelector(
    selectFollowsListPageDomain(),
    (substate) => substate
);

const selectFollowsList = () => createSelector(
    selectFollowsListPageDomain(),
    (FollowsListPageState) => FollowsListPageState.get('followsList')
);

export default selectFollowsListPage;
export {
    selectFollowsListPageDomain,
    selectFollowsList
};


