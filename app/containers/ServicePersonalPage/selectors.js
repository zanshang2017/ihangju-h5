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
const selectServicePersonalDataSuccess = () => createSelector(
	selectServicePersonalDomin(),
	(servicPersonalState) => servicPersonalState.get('updateSuccess')
);
export default selectServicePersonalPage;
export {
	selectServicePersonalDomin,
	selectServicePersonalData,
	selectServicePersonalDataSuccess
};
