import { createSelector } from 'reselect';

const selectDetailDomain = () => state => state.get('readProjectChapter');

const selectReadChapter = () => createSelector(
  selectDetailDomain(),
  (readProjectChapterState) => readProjectChapterState.get('chapterContent')
);
const selectProjectInfo = () => createSelector(
  selectDetailDomain(),
  (readProjectChapterState) => readProjectChapterState.get('projectInfo')
);
export {
	selectDetailDomain,
	selectReadChapter,
	selectProjectInfo,
}

