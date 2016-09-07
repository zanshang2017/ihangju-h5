import {createSelector} from 'reselect';

const selectCollectionPageDomain = () => state => state.get('collectionPage');

const selectCollectionPage = () => createSelector(
    selectCollectionPageDomain(),
    (substate) => substate
);

const selectCollectionProjs = () => createSelector(
    selectCollectionPageDomain(),
    (CollectionPageState) => CollectionPageState.get('collectionProjs')
);

export default selectCollectionPage;
export {
    selectCollectionPageDomain,
    selectCollectionProjs
};


