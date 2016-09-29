/*
 *
 * MyTagPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectTags,
} from './selectors';

import {
    IMG_CDN_PATH
} from '../../apis.js';

import {
    loadTagData,
} from './actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';


class MyTagPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.personID = '';
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.personID = this.props.routeParams.id;
        }
        this.props.dispatch(loadTagData(this.personID));
    }

    componentDidMount() {
        console.warn('MyTagPage DidMount');
    }

    tagClickHandler(id) {
        this.context.router.push('/tag/' + id);
    }

    render() {
        let tags = this.props.tags || [];
        let that = this;

        return (
            <div className="pageInner deepBg">
                <TopBar data-has-back="true">
                    <div data-title>我管理的标签</div>
                </TopBar>
                <div className="mainContent">
                    <List>
                        <List.Body>
                            {
                                tags.map(function (tag) {
                                    return <List.Item
                                        arrow="horizontal"
                                        key={tag.id}
                                        onClick={that.tagClickHandler.bind(that, tag.id)}
                                    >
                                        <div className={styles.tag}>{tag.name}</div>
                                    </List.Item>
                                })
                            }
                        </List.Body>
                    </List>
                </div>
            </div>
        );
    }
}


MyTagPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectTags(),
    (tags) => ({tags})
), mapDispatchToProps)(MyTagPage);
//export default connect(null, mapDispatchToProps)(MyTagPage);
