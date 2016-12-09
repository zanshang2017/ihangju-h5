/*
 *
 * AgreementLeavewordsPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {
    locStorage
} from 'utils/util';

import {
    SELECTED_COPYRIGHTS_LOCALSTORAGE
} from 'containers/ProjectDetailPage/constants';

import {
    selectDetailResult
} from '../selectors';

import {
    AGREEMENT_API,
} from '../../../apis.js';

import request from 'utils/request';

// import {
// } from './actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import Toast from 'antd-mobile/lib/toast';

export class AgreementLeavewordsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.selectedCopyrights = JSON.parse(locStorage.get(SELECTED_COPYRIGHTS_LOCALSTORAGE));
        this.selectedCopyrightsHtml = this.selectedCopyrights.map(function (v) {
            return <li key={v.id}>{v.title}</li>;
        });
    }

    componentDidMount() {
        console.warn('AgreementLeavewordsPage DidMount');
    }

    componentWillUnmount() {
    }

    send() {

        let that = this;

        //表单数据
        // competencepurview:57c79bbead81f618ec4a1a4d,57c79be0ad81f618ec4a1a50
        // content:yhhhh
        // projectid:583e7ea7e4b0fcdbd9f866af

        let competencepurview = this.selectedCopyrights.map(function (v) {
            return v.id;
        });

        let content = this.refs.J_Leavewords.value;

        if (content.trim() === '') {
            Toast.info('请给作者留言');
            return;
        }

        request(AGREEMENT_API, {
            method: 'PUT',
            body: `competencepurview=${competencepurview}&content=${encodeURIComponent(content)}&projectid=${this.props.routeParams.id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-Version': 'v1.1'
            },
            credentials: 'include'
        }).then(function (resp) {
            if(resp && resp.data) {
                if(resp.data.code == 'ok') {
                    Toast.info('发送成功');
                    setTimeout(function(){
                        that.context.router.goBack();
                    }, 2000);
                } else {
                    Toast.info(resp.data.message || '申请失败,请稍后再试');
                }
            } else {
                Toast.info('申请失败,请稍后再试');
            }
        }, function (error) {
            Toast.info('申请失败,请稍后再试');
        });
    }

    render() {
        var _detail = this.props.projectDetail.toJS();

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>给作者留言</div>
                    <div data-btns>
                        <div onClick={this.send.bind(this)}>发送</div>
                    </div>
                </TopBar>
                <div className="mainContent">
                    <div className={styles.wrap}>
                        <div className={styles.projectInfo}>
                            <h4>《{_detail.projectName}》</h4>
                            <span>作者: {_detail.authorName}</span>
                        </div>
                        <div className={styles.copyrights}>
                            <div className={styles.purview}>
                                <div className={`iconAuthorization ${styles.iconAuthorizationCfg}`}>
                                    作品授权
                                </div>
                                <ul>
                                    {this.selectedCopyrightsHtml}
                                </ul>
                            </div>
                        </div>

                        <div className={styles.leavewordsWrap}>
                            <textarea ref="J_Leavewords" className={styles.leavewords}
                                      placeholder="向作者介绍一下您自己以及关于作品的合作方式。"></textarea>
                        </div>

                    </div>
                    <div className={styles.bottomLine}></div>
                </div>
            </div>
        );
    }
}

AgreementLeavewordsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectDetailResult(),
    (projectDetail) => ({projectDetail})
), mapDispatchToProps)(AgreementLeavewordsPage);


