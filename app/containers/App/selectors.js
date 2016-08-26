/**
 * 全局state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectUserInfo = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('userInfo')
);

const selectShowNav = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('showNav')
);

const selectCurPage = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('curPage')
);

const selectLoading = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('error')
);

const selectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectGlobal,
    selectUserInfo,
    selectShowNav,
    selectCurPage,
    selectLoading,
    selectError,
    selectLocationState,
};
