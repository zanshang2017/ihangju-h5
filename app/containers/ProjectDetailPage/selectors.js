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
const selectShareData = () => createSelector(
	selectDetailDomain(),
  	(projectDetailState) => projectDetailState.get('shareData')
);
export default selectDetail;

export {
  selectDetailDomain,
  selectDetailResult,
  selectDetailProjectChapter,
  selectShareData,
};


