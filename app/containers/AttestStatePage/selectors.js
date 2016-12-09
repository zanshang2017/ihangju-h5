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

export default selectAttestStatePage;
export {
	selectAttestStateDomin,
	selectAttestStateData
}