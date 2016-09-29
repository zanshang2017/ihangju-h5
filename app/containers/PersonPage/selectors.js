import {createSelector} from 'reselect';

const selectPersonPageDomain = () => state => state.get('personPage');

const selectPersonPage = () => createSelector(
    selectPersonPageDomain(),
    (personPageState) => personPageState
);

const selectPersonInfo = () => createSelector(
    selectPersonPageDomain(),
    (personPageState) => personPageState.get('personInfo')
);

export default selectPersonPage;
export {
    selectPersonPageDomain,
    selectPersonInfo
};


