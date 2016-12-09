import {createSelector} from 'reselect';

const selectAgreementDetailPageDomain = () => state => state.get('agreementDetailPage');

const selectAgreementDetailPage = () => createSelector(
    selectAgreementDetailPageDomain(),
    (substate) => substate
);

const selectAgreements = () => createSelector(
    selectAgreementDetailPageDomain(),
    (AgreementDetailPageState) => AgreementDetailPageState.get('agreements')
);

export default selectAgreementDetailPage;
export {
    selectAgreementDetailPageDomain,
    selectAgreements
};


