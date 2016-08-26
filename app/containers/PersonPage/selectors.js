import {createSelector} from 'reselect';

const selectPersonPageDomain = () => state => state.get('personPage');

const selectPersonPage = () => createSelector(
    selectPersonPageDomain(),
    (personPageState) => personPageState
);

const selectUserInfo = () => createSelector(
    selectPersonPageDomain(),
    (personPageState) => personPageState.get('userInfo')
);

export default selectPersonPage;
export {
    selectPersonPageDomain,
    selectUserInfo
};


