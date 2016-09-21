import {createSelector} from 'reselect';

const selectDialoguePageDomain = () => state => state.get('dialoguePage');

const selectDialoguePage = () => createSelector(
    selectDialoguePageDomain(),
    (substate) => substate
);

const selectDialogue = () => createSelector(
    selectDialoguePageDomain(),
    (DialoguePageState) => DialoguePageState.get('dialogue')
);

export default selectDialoguePage;
export {
    selectDialoguePageDomain,
    selectDialogue,
};


