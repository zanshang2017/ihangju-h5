import {createSelector} from 'reselect';

const selectMyTagPageDomain = () => state => state.get('myTagPage');

const selectMyTagPage = () => createSelector(
    selectMyTagPageDomain(),
    (substate) => substate
);


const selectTags = () => createSelector(
    selectMyTagPageDomain(),
    (myTagPageState) => myTagPageState.get('tags')
);

export default selectMyTagPage;
export {
    selectMyTagPageDomain,
    selectTags
};


