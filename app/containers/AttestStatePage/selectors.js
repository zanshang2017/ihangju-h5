import { createSelector } from 'reselect';

const selectAttestStateDomin = () => state => state.get('attestState');

const selectAttestStatePage = () => createSelector(
	selectAttestStateDomin(),
	(attestStateState) => attestStateState
) 

const selectAttestStateData = () => createSelector(
	selectAttestStateDomin(),
	(attestStateState) => attestStateState.get('attestStateData')
)

const selctFailHelpData = () => createSelector(
	selectAttestStateDomin(),
	(attestStateState) => attestStateState.get('helpData')
)

export default selectAttestStatePage;
export {
	selectAttestStateDomin,
	selectAttestStateData,
	selctFailHelpData
}