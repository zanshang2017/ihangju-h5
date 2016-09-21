import {createSelector} from 'reselect';

const selectCommentsPageDomain = () => state => state.get('commentsPage');

const selectCommentsPage = () => createSelector(
    selectCommentsPageDomain(),
    (substate) => substate
);

const selectComments = () => createSelector(
    selectCommentsPageDomain(),
    (CommentsPageState) => CommentsPageState.get('comments')
);

const selectPlaceholder = () => createSelector(
    selectCommentsPageDomain(),
    (CommentsPageState) => CommentsPageState.get('inputPlaceholder')
);

export default selectCommentsPage;
export {
    selectCommentsPageDomain,
    selectComments,
    selectPlaceholder
};


