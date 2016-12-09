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

const selectProjectCopyright = () =>createSelector(
    selectDetailDomain(),
    (projectDetailState) => projectDetailState.get('projectCopyright')
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
  selectProjectCopyright,
  selectShareData,
};


