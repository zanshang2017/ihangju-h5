import { createSelector } from 'reselect';

const selectAuthorAttestDomin = () => state => state.get('authorAttest');

const selectAuthorAttestPage = () => createSelector(
	selectAuthorAttestDomin(),
	(authorAttestState) => authorAttestState
);

const selectAuthorAttest = () => createSelector(
	selectAuthorAttestDomin(),
	(authorAttestState) => authorAttestState.get('authorAttestData')
);

export default selectAuthorAttestPage;
export {
	selectAuthorAttestDomin,
	selectAuthorAttest
};
