import { createSelector } from 'reselect';

const selectCreatePageDomain = () => state => state.get('createPage');

const selectCreatePage = () => createSelector(
    selectCreatePageDomain(),
    (createPageState) => createPageState
);

const selectNotes = () => createSelector(
    selectCreatePageDomain(),
    (createPageState) => createPageState.get('notes')
);

const selectCurrentNote = () => createSelector(
    selectCreatePageDomain(),
    (createPageState) => createPageState.get('currentNote')
);

const selectNoteContent = () => createSelector(
    selectCreatePageDomain(),
    (createPageState) => createPageState.get('noteContent')
);

const selectIdentify = () => createSelector(
    selectCreatePageDomain(),
    (createPageState) => createPageState.get('identify')
);

export default selectCreatePage;

export {
    selectNotes,
    selectCurrentNote,
    selectNoteContent,
    selectIdentify,
};
