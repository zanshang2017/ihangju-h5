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
} from './selectors';

import {
    loadCollectionData,
} from './actions';

import styles from './styles.css';

import CollectionList from 'components/CollectionPage/CollectionList';

import TopBar from 'components/common/TopBar';

export class CollectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.id = this.props.routeParams.id;
        }

        if(this.id){
            this.props.dispatch(loadCollectionData(this.id));
        }
    }

    componentDidMount() {
        console.warn('CollectionPage DidMount');
    }

    nextPageHandler(page = 0) {
        if(this.id){
            console.log('link click', page);
            this.props.dispatch(loadCollectionData(this.id, page));
        }

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
                <CollectionList page={page}
                                isLast={isLast}
                                loading={loading}
                                items={items}
                                nextPageHandler={this.nextPageHandler.bind(this)}></CollectionList>
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
    (collectionProjs) => ({collectionProjs})
), mapDispatchToProps)(CollectionPage);
//export default connect(null, mapDispatchToProps)(CollectionPage);
