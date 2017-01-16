import {createSelector} from 'reselect';

const selectTagDetailPageDomain = () => state => state.get('tagDetailPage');

const selectTagDetailPage = () => createSelector(
    selectTagDetailPageDomain(),
    (substate) => substate
);

const selectProjectList = () => createSelector(
    selectTagDetailPageDomain(),
    (substate) => substate.get('projectList')
);

const selectRecommendationList = () => createSelector(
    selectTagDetailPageDomain(),
    (substate) => substate.get('recommendationList')
);

const selectDetail = () => createSelector(
    selectTagDetailPageDomain(),
    (substate) => substate.get('detail')
);

const selectRecommendationListStatus = () => createSelector(
    selectTagDetailPageDomain(),
    (substate) => substate.get('recommendationListStatus')
);

const selectProjectListStatus = () => createSelector(
    selectTagDetailPageDomain(),
    (substate) => substate.get('projectListStatus')
);

const selectIsEditing = () => createSelector(
    selectTagDetailPageDomain(),
    (substate) => substate.get('isEditing')
);

const selectViewState = () => createSelector(
    selectTagDetailPageDomain(),
    (substate) => substate.get('viewState')
);

export default selectTagDetailPage;
export {
    selectTagDetailPageDomain,
    selectProjectList,
    selectRecommendationList,
    selectDetail,
    selectRecommendationListStatus,
    selectProjectListStatus,
    selectIsEditing,
    selectViewState,
};


