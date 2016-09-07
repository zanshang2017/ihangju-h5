import {createSelector} from 'reselect';

const selectNotificationPageDomain = () => state => state.get('notificationPage');

const selectNotificationPage = () => createSelector(
    selectNotificationPageDomain(),
    (substate) => substate
);

const selectCommentList = () => createSelector(
    selectNotificationPageDomain(),
    (substate) => substate.get('commentList')
);

const selectCommentListStatus = () => createSelector(
    selectNotificationPageDomain(),
    (substate) => substate.get('commentListStatus')
);

const selectMessageList = () => createSelector(
    selectNotificationPageDomain(),
    (substate) => substate.get('messageList')
);

const selectMessageListStatus = () => createSelector(
    selectNotificationPageDomain(),
    (substate) => substate.get('messageListStatus')
);


export default selectNotificationPage;
export {
    selectNotificationPageDomain,
    selectCommentList,
    selectCommentListStatus,
    selectMessageList,
    selectMessageListStatus,
};


