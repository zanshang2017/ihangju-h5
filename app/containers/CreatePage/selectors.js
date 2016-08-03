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


export default selectCreatePage;

export {
    selectNotes,
    selectCurrentNote,
};
