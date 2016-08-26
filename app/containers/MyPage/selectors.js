import {createSelector} from 'reselect';

const selectMyPageDomain = () => state => state.get('myPage');

const selectMyPage = () => createSelector(
    selectMyPageDomain(),
    (substate) => substate
);


const selectUserCenterInfo = () => createSelector(
    selectMyPageDomain(),
    (demoPageState) => demoPageState.get('userCenterInfo')
);

export default selectMyPage;
export {
    selectMyPageDomain,
    selectUserCenterInfo
};


