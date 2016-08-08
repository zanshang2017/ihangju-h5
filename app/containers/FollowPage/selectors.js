import { createSelector } from 'reselect';

const selectFollowPageDomain = () => state => state.get('followPage');

const selectFollowPage = () => createSelector(
    selectFollowPageDomain(),
    (pageState) => pageState
);

const selectMyFollowData = () => createSelector(
    selectFollowPageDomain(),
    (pageState) => pageState.get('myFollowData')
);

const selectMyFollowListData = () => createSelector(
    selectFollowPageDomain(),
    (pageState) => pageState.get('myFollowListData').toJS()
);

const selectCurrentFollow = () => createSelector(
    selectFollowPageDomain(),
    (pageState) => pageState.get('currentFollow')
);

const selectMyFollowLoading = () => createSelector(
    selectFollowPageDomain(),
    (pageState) => pageState.get('myFollowLoading')
);

const selectMyFollowListLoading = () => createSelector(
    selectFollowPageDomain(),
    (pageState) => pageState.get('myFollowListLoading')
);

const selectMyFollowDataStatus = () => createSelector(
    selectFollowPageDomain(),
    (pageState) => pageState.get('myFollowDataStatus')
);

const selectMyFollowListDataStatus = () => createSelector(
    selectFollowPageDomain(),
    (pageState) => pageState.get('myFollowListDataStatus')
);

export default selectFollowPage;

export {
    selectFollowPageDomain,
    selectMyFollowData,
    selectMyFollowListData,
    selectCurrentFollow,
    selectMyFollowLoading,
    selectMyFollowListLoading,
    selectMyFollowDataStatus,
    selectMyFollowListDataStatus,
};
