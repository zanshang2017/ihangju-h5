/**
 * 全局state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectUserToken = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('userToken')
);

const selectShowNav = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('showNav')
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
    selectUserToken,
    selectShowNav,
    selectLoading,
    selectError,
    selectLocationState,
};
