import { createSelector } from 'reselect';

const selectServiceAgencyDomin = () => state => state.get('serviceAgency');

const selectServiceAgencyPage = () => createSelector(
	selectServiceAgencyDomin(),
	(servicAgencyState) => servicAgencyState
);

const selectServiceAgencyData = () => createSelector(
	selectServiceAgencyDomin(),
	(servicAgencyState) => servicAgencyState.get('serviceAgencyData')
);
const selectServiceAgencyDataSuccess = () => createSelector(
	selectServiceAgencyDomin(),
	(servicAgencyState) => servicAgencyState.get('updateSuccess')
);
export default selectServiceAgencyPage;
export {
	selectServiceAgencyDomin,
	selectServiceAgencyData,
	selectServiceAgencyDataSuccess
};
