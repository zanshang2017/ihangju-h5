import {createSelector} from 'reselect';

const selectDialogueListPageDomain = () => state => state.get('dialogueListPage');

const selectDialogueListPage = () => createSelector(
    selectDialogueListPageDomain(),
    (substate) => substate
);

const selectLists = () => createSelector(
    selectDialogueListPageDomain(),
    (DialogueListPageState) => DialogueListPageState.get('lists')
);

export default selectDialogueListPage;
export {
    selectDialogueListPageDomain,
    selectLists
};


