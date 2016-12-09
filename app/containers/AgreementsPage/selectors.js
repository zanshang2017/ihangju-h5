import {createSelector} from 'reselect';

const selectAgreementsPageDomain = () => state => state.get('agreementsPage');

const selectAgreementsPage = () => createSelector(
    selectAgreementsPageDomain(),
    (substate) => substate
);

const selectAgreements = () => createSelector(
    selectAgreementsPageDomain(),
    (AgreementsPageState) => AgreementsPageState.get('agreements')
);

export default selectAgreementsPage;
export {
    selectAgreementsPageDomain,
    selectAgreements
};


