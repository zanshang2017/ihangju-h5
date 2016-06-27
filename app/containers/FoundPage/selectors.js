import { createSelector } from 'reselect';

const selectFoundPageDomain = () => state => state.get('foundPage');

const selectFoundPage = () => createSelector(
    selectFoundPageDomain(),
  (substate) => substate
);

export default selectFoundPage;
export {
    selectFoundPageDomain,
};
