/*
 *
 * PersonPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectPersonInfo,
} from './selectors';

import {
    loadPersonData,
} from './actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import UserDesc from 'components/PersonPage/UserDesc';
import UserArticle from 'components/PersonPage/UserArticle';
import List from 'antd-mobile/lib/list';

class PersonPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.personID = '';
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.personID = this.props.routeParams.id;
        }

        this.props.dispatch(loadPersonData(this.personID));
    }

    componentDidMount() {
        console.warn('PersonPage DidMount');
    }

    componentWillUnmount() {
    }

    fansClickHandler() {
        if (this.personID) {
            this.context.router.push('/fanslist/' + this.personID);
        }
    }

    followsClickHandler() {
        console.log('click followsClickHandler', this.personID);
        if (this.personID) {
            this.context.router.push('/followslist/' + this.personID);
        }
    }

    articleClickHandler(e) {
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    render() {
        let personInfo = this.props.personInfo || {};

        return (
            <div className="pageInner">
                <TopBar data-has-back="true">
                    <div data-title>个人主页</div>
                    <div data-btns>
                        {/*<div>关注</div>*/}
                    </div>
                </TopBar>
                <div className="mainContent">
                    <UserDesc personInfo={personInfo}
                              fansClickHandler={this.fansClickHandler.bind(this)}
                              followsClickHandler={this.followsClickHandler.bind(this)}
                    />
                    <UserArticle personInfo={personInfo}
                                 articleClickHandler={this.articleClickHandler.bind(this)}></UserArticle>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

PersonPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(createSelector(
    selectPersonInfo(),
    (personInfo) => ({personInfo})
), mapDispatchToProps)(PersonPage);
