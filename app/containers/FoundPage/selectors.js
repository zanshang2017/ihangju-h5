import { createSelector } from 'reselect';

const selectFoundPageDomain = () => state => state.get('foundPage');

const selectFoundPage = () => createSelector(
    selectFoundPageDomain(),
    (foundPageState) => foundPageState
);

const selectBanners = () => createSelector(
    selectFoundPageDomain(),
    (foundPageState) => foundPageState.get('discoveriesData').banners
);

const selectTags = () => createSelector(
    selectFoundPageDomain(),
    (foundPageState) => foundPageState.get('discoveriesData').tags
);

const selectRecommendations = () => createSelector(
    selectFoundPageDomain(),
    (foundPageState) => foundPageState.get('recommendationData')
);

export default selectFoundPage;
export {
    selectFoundPageDomain,
    selectBanners,
    selectTags,
    selectRecommendations
};
