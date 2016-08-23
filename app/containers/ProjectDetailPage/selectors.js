import { createSelector } from 'reselect';

const selectDetailDomain = () => state => state.get('projectDetail');

const selectDetail = () => createSelector(
  selectDetailDomain(),
  (projectDetailState) => projectDetailState
);

const selectDetailResult = () => createSelector(
	selectDetailDomain(),
  	(projectDetailState) => projectDetailState.get('projectDetail')
);

const selectDetailProjectChapter = () =>createSelector(
	selectDetailDomain(),
  	(projectDetailState) => projectDetailState.get('projectDetailChapter')
);
export default selectDetail;

export {
  selectDetailDomain,
  selectDetailResult,
  selectDetailProjectChapter
};


