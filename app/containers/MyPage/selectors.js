import { createSelector } from 'reselect';

const selectMyPageDomain = () => state => state.get('myPage');

const selectMyPage = () => createSelector(
  selectMyPageDomain(),
  (substate) => substate
);

export default selectMyPage;
export {
  selectMyPageDomain,
};


