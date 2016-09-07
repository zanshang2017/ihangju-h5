import {createSelector} from 'reselect';

const selectEditProfilePageDomain = () => state => state.get('editProfilePage');

const selectEditProfilePage = () => createSelector(
    selectEditProfilePageDomain(),
    (substate) => substate
);


export default selectEditProfilePage;

export {
    selectEditProfilePageDomain,
};


