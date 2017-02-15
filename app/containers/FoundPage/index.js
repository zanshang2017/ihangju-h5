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
    selectBanners,
    selectTags
} from './selectors';

import {
    loadDiscoveriesData,
} from './actions';

import signals from './signals';

import styles from './styles.scss';

import bridge from 'utils/bridge';

// import Toast from 'antd-mobile/lib/toast';

import TopGapForIOS from 'components/common/TopGapForIOS';
import Banner from 'components/FoundPage/Banner';
import MainContent from 'components/FoundPage/MainContent';
import PullRefresh from 'components/common/ReactPullRefresh'

export class FoundPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.loadDiscoveries();
    }

    componentDidUpdate() {
    }

    loadDiscoveries() {
        console.log('loadDiscoveries');
        this.props.dispatch(loadDiscoveriesData());
    }

    articleClickHandler(e) {
        let index = e.currentTarget.dataset['index'];
        zhuge.track('banner' + index + '点击');
        let target = e.currentTarget.dataset['target'] || '';
        let targetType = e.currentTarget.dataset['type'] || '';

        switch(targetType) {
            case 'link':
                bridge.sys.openUrl(encodeURI(target));
                break;

            case 'project':
                this.context.router.push(`/projectDetail/${target}`);
                break;

            case 'tag':
                this.context.router.push(`/tag/${target}`);
                break;

            default:
                break;
        }
    }

    refreshHandler() {
        return new Promise((resolve, reject) => {
            this.loadDiscoveries();

            signals.onDiscoveriesLoadSuccess.add(()=> {
                this.removeSignals();
                clearTimeout(flag);
                resolve();
            });

            signals.onDiscoveriesLoadFail.add(()=> {
                this.removeSignals();
                clearTimeout(flag);
                reject();
            });

            //超时
            let flag = setTimeout(() => {
                this.removeSignals();
                reject();
            }, 15 * 1e3);

        });
    }

    removeSignals() {
        signals.onDiscoveriesLoadSuccess.removeAll();
        signals.onDiscoveriesLoadFail.removeAll();
    }

    render() {
        return (
            <div className="pageInner">
                <TopGapForIOS />
                <div className={`mainContent ${styles.wrap}`}>
                    <PullRefresh refreshCallback={this.refreshHandler.bind(this)}>
                        <Banner items={this.props.banners}
                                articleClickHandler={this.articleClickHandler.bind(this)}></Banner>
                        <MainContent {...this.props} />
                    </PullRefresh>
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
