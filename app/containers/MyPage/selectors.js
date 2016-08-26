import {createSelector} from 'reselect';

const selectMyPageDomain = () => state => state.get('myPage');

const selectMyPage = () => createSelector(
    selectMyPageDomain(),
    (substate) => substate
);


const selectUserCenterInfo = () => createSelector(
    selectMyPageDomain(),
    (myPageState) => myPageState.get('userCenterInfo')
);

export default selectMyPage;
export {
    selectMyPageDomain,
    selectUserCenterInfo
};


