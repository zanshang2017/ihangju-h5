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
    selectUserInfo,
} from 'containers/App/selectors';

import {
    loadTagData,
} from './actions';

import styles from './styles.css';

import Result from 'antd-mobile/lib/page-result';
import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';


class MyTagPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.personID = '';
    }

    componentWillMount() {


    }

    componentDidMount() {
        console.warn('MyTagPage DidMount');
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        this.personID = userInfo.id;

        if (this.personID) {
            this.props.dispatch(loadTagData(this.personID));
        }
    }

    tagClickHandler(id) {
        this.context.router.push('/tag/' + id);
    }

    render() {
        let tags = this.props.tags || [];
        let that = this;

        let listHtml = <Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/58131655e4b0edf1e7b90b19.png?imageMogr2/auto-orient/"
            title="您没有任何管理的标签"
        />;

        if (tags.length > 0) {
            listHtml = <List>
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
            </List>;
        }

        return (
            <div className="pageInner deepBg">
                <TopBar data-has-back="true">
                    <div data-title>我管理的标签</div>
                </TopBar>
                <div className="mainContent">
                    {listHtml}
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
    selectUserInfo(),
    (tags, userInfo) => ({tags, userInfo})
), mapDispatchToProps)(MyTagPage);
//export default connect(null, mapDispatchToProps)(MyTagPage);
