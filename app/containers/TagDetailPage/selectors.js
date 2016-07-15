import { createSelector } from 'reselect';

const selectTagDetailPageDomain = () => state => state.get('tagDetailPage');

const selectTagDetailPage = () => createSelector(
  selectTagDetailPageDomain(),
  (substate) => substate
);

export default selectTagDetailPage;
export {
  selectTagDetailPageDomain,
};


