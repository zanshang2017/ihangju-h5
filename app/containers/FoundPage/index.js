/*
 *
 * FoundPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createSelector} from 'reselect';

import {
    selectFoundPage,
    selectBanners,
    selectTags
} from './selectors';

import {
    loadDiscoveriesData,
} from './actions';

import styles from './styles.scss';

import Banner from 'components/FoundPage/Banner';
import MainContent from 'components/FoundPage/MainContent';

export class FoundPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.loadDiscoveries();
    }

    componentDidMount() {
        console.warn('FoundPage DidMount');
    }

    loadDiscoveries() {
        console.log('loadDiscoveries');
        this.props.dispatch(loadDiscoveriesData());
    }

    // loadRecommendation(page) {
    //     this.props.dispatch(loadRecommendationData(page));
    // }

    //loadNextRecommendation() {
    //    loadRecommendation(++this.recommendationPage);
    //}
    //
    //refreshRecommendation() {
    //    loadRecommendation(this.recommendationPage = 0);
    //}

    render() {
        return (
            <div className="pageInner">
                <div className="mainContent">
                    <Banner items={this.props.banners}></Banner>
                    <MainContent {...this.props} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = createSelector(
    selectBanners(),
    selectTags(),
    (banners, tags) => {
        return {
            banners,
            tags
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        refresh: () => dispatch(loadDiscoveriesData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoundPage);
