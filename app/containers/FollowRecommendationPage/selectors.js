import {createSelector} from 'reselect';

const selectFollowRecommendationPageDomain = () => state => state.get('followRecommendationPage');

const selectFollowRecommendationPage = () => createSelector(
    selectFollowRecommendationPageDomain(),
    (substate) => substate
);

const selectRecommendation = () => createSelector(
    selectFollowRecommendationPage(),
    (FollowRecommendationPageState) => FollowRecommendationPageState.get('recommendation').toJS()
);

const selectChoiceType = () => createSelector(
    selectFollowRecommendationPage(),
    (FollowRecommendationPageState) => FollowRecommendationPageState.get('choiceType')
);

export default selectFollowRecommendationPage;
export {
    selectFollowRecommendationPageDomain,
    selectRecommendation,
    selectChoiceType,
};


