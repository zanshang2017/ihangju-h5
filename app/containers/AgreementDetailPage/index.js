/*
 *
 * AgreementDetailPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    selectAgreements,
} from './selectors';

import {
    loadAgreementsData,
    signAgreement,
    resetState,
} from './actions';

import styles from './styles.css';

import List from 'components/AgreementDetailPage/List';
import Toast from 'antd-mobile/lib/toast';
import TopBar from 'components/common/TopBar';

export class AgreementDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(loadAgreementsData(this.props.routeParams.id));
    }

    componentDidMount() {
        console.warn('AgreementDetailPage DidMount');
    }

    componentWillUnmount() {
        this.props.dispatch(resetState());
    }

    agreeHandler(e) {
        let id = e.currentTarget.dataset['id'];
        if (id) {
            console.log('同意' + id);
            Toast.loading('提交中...');
            this.props.dispatch(signAgreement(id, true, this.props.routeParams.id));
        } else {
            Toast.info('无协议ID,无法完成操作');
        }
    }

    disagreeHandler(e) {
        let id = e.currentTarget.dataset['id'];
        if (id) {
            console.log('拒绝' + id);
            Toast.loading('提交中...');
            this.props.dispatch(signAgreement(id, false, this.props.routeParams.id));
        } else {
            Toast.info('无协议ID,无法完成操作');
        }
    }

    render() {
        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>签约详情</div>
                </TopBar>
                <div className="mainContent">
                    <List {...this.props}
                          agreeHandler={this.agreeHandler.bind(this)}
                          disagreeHandler={this.disagreeHandler.bind(this)}></List>
                </div>
            </div>
        );
    }
}

AgreementDetailPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectUserInfo(),
    selectAgreements(),
    (userInfo, agreements) => ({userInfo, agreements})
), mapDispatchToProps)(AgreementDetailPage);

