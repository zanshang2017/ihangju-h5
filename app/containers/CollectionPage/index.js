/*
 *
 * CollectionPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectCollectionProjs,
    selectViewState,
} from './selectors';

import signals from './signals';

import {
    loadCollectionData,
    resetState,
    setViewState,
} from './actions';

import styles from './styles.css';

import CollectionList from 'components/CollectionPage/CollectionList';

import TopBar from 'components/common/TopBar';

import PullRefresh from 'components/common/ReactPullRefresh'


export class CollectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = ''

        if (this.props.routeParams) {
            this.id = this.props.routeParams.id;
        }

        let datas = this.props.collectionProjs.toJS().data;

        if (this.props.viewState && datas) {
            setTimeout(()=> {
                let vs = this.props.viewState.toJS();
                this.refs.J_MainContent.scrollTop = vs.scrollTop;
            }, 0);
        } else if(this.id) {
            this.props.dispatch(loadCollectionData(this.id));
        }
    }

    componentDidMount() {
        console.warn('CollectionPage DidMount');

        this.forceUpdate(); //必须强制刷新,以便子组件能获取父组件的引用
    }

    componentWillUnmount() {
        this.saveViewState();
        this.removeSignals();
    }

    nextPageHandler(page = 0) {
        if (this.id) {
            console.log('link click', page);
            this.props.dispatch(loadCollectionData(this.id, page));
        }
    }

    saveViewState() {
        if (this.refs.J_MainContent) {
            this.props.dispatch(setViewState({scrollTop: this.refs.J_MainContent.scrollTop}));
        }
    }

    refreshHandler() {
        return new Promise((resolve, reject) => {

            this.props.dispatch(resetState());
            this.props.dispatch(loadCollectionData(this.id, 0));

            signals.onCollectionLoadSuccess.add(()=> {
                this.removeSignals();
                clearTimeout(flag);
                resolve();
            });

            signals.onCollectionLoadFail.add(()=> {
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
        signals.onCollectionLoadSuccess.removeAll();
        signals.onCollectionLoadFail.removeAll();
    }

    render() {
        let projs = this.props.collectionProjs ? this.props.collectionProjs.toJS() : {};
        let items = projs.data ? projs.data : [];
        let page = projs.page || 0;
        let isLast = projs.isLast || false;
        let loading = projs.loading || false;

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>收藏夹</div>
                </TopBar>
                <div className="mainContent" ref="J_MainContent">
                    <PullRefresh ref="J_PullRefresh" refreshCallback={this.refreshHandler.bind(this)}>
                        <CollectionList page={page}
                                        wrap={this.refs.J_MainContent || null}
                                        isLast={isLast}
                                        loading={loading}
                                        items={items}
                                        nextPageHandler={this.nextPageHandler.bind(this)}></CollectionList>
                    </PullRefresh>
                </div>

            </div>
        );
    }
}

CollectionPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectCollectionProjs(),
    selectViewState(),
    (collectionProjs, viewState) =>
        ({collectionProjs, viewState})
), mapDispatchToProps)(CollectionPage);
//export default connect(null, mapDispatchToProps)(CollectionPage);
