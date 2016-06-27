
import { createSelector } from 'reselect';

/**
 * 页面级state
 */
const selectDemoPageDomain = () => state => state.get('demoPage');


/**
 * 子级selector
 */
const selectDemoPage = () => createSelector(
    selectDemoPageDomain(),
    (demoPageState) => demoPageState.get('items')
);

const selectDemoPageList = () => createSelector(
    selectDemoPageDomain(),
    (demoPageState) => demoPageState.get('listItems')
);

export {
    selectDemoPageDomain,
    selectDemoPage,
    selectDemoPageList
};


