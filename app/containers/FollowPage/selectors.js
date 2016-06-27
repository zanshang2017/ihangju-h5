import { createSelector } from 'reselect';

const selectFollowPageDomain = () => state => state.get('followPage');


const selectFollowPage = () => createSelector(
  selectFollowPageDomain(),
  (substate) => substate
);

export default selectFollowPage;
export {
  selectFollowPageDomain,
};
