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

const selectViewState = () => createSelector(
    selectCollectionPageDomain(),
    (substate) => substate.get('viewState')
);

export default selectCollectionPage;
export {
    selectCollectionPageDomain,
    selectCollectionProjs,
    selectViewState,
};


