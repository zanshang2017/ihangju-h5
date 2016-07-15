/*
 *
 * FoundPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createSelector } from 'reselect';

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

let hasInitLoaded = false;

export class FoundPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.recommendationPage = 0;
    }

    componentWillMount() {
        if (!hasInitLoaded) {
            //首次加载数据，二次进入无须重复加载，用户可以手动刷新。
            this.loadDiscoveries();
            hasInitLoaded = true;
        }
    }

    loadDiscoveries() {
        console.log('loadDis');
        this.props.dispatch(loadDiscoveriesData());
    }

    loadRecommendation(page) {
        this.props.dispatch(loadRecommendationData(page));
    }

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
                <Banner items={this.props.banners}></Banner>
                <MainContent {...this.props} />
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
