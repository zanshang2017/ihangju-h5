import { createSelector } from 'reselect';

const selectServicePersonalDomin = () => state => state.get('servicPersonal');

const selectServicePersonalPage = () => createSelector(
	selectServicePersonalDomin(),
	(servicPersonalState) => servicPersonalState
);

const selectServicePersonalData = () => createSelector(
	selectServicePersonalDomin(),
	(servicPersonalState) => servicPersonalState.get('servicePersonalData')
);

export default selectServicePersonalPage;
export {
	selectServicePersonalDomin,
	selectServicePersonalData
};
