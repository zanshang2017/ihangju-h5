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
import TopGapForIOS from 'components/common/TopGapForIOS';

export class FoundPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.loadDiscoveries();
    }

    loadDiscoveries() {
        console.log('loadDiscoveries');
        this.props.dispatch(loadDiscoveriesData());
    }

    articleClickHandler(e) {
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    render() {
        return (
            <div className="pageInner">
                <div className="mainContent">
                    <TopGapForIOS style={{'backgroundColor': '#f5f5f5'}}/>
                    <Banner items={this.props.banners}
                            articleClickHandler={this.articleClickHandler.bind(this)}></Banner>
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

FoundPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundPage);
