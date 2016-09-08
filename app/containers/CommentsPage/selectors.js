import {createSelector} from 'reselect';

const selectCommentsPageDomain = () => state => state.get('collectionPage');

const selectCommentsPage = () => createSelector(
    selectCommentsPageDomain(),
    (substate) => substate
);

const selectCollectionProjs = () => createSelector(
    selectCommentsPageDomain(),
    (CommentsPageState) => CommentsPageState.get('comments')
);

export default selectCommentsPage;
export {
    selectCommentsPageDomain,
    selectCollectionProjs
};


