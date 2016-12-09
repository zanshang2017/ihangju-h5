import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {
    selectDetail,
    selectDetailResult,
    selectDetailProjectChapter,
    selectProjectCopyright,
    selectShareData,
} from './selectors';

import LoadingBar from 'components/common/LoadingBar';
import ProjectDesc from 'components/ProjectDetailPage/ProjectDesc';
import ProjectTag from 'components/ProjectDetailPage/ProjectTag';
import ProjectIntro from 'components/ProjectDetailPage/ProjectIntro';
import ProjectComment from 'components/ProjectDetailPage/ProjectComment';
import ProjectTopBar from 'components/ProjectDetailPage/ProjectTopBar';
import ProjectSign from 'components/ProjectDetailPage/ProjectSign';
import ProjectFooterBar from 'components/ProjectDetailPage/ProjectFooterBar';

import style from './style.css';

import {
    loadProjectDetailData,
    loadProjectChapterData,
    loadProjectCopyrightData,
    setShareData,
    resetState,
    resetCopyright,
} from './actions';

import Toast from 'antd-mobile/lib/toast';


/* eslint-disable react/prefer-stateless-function */
class DetailPage extends React.Component {
    componentWillMount() {
        if (this.props.routeParams) {
            var id = this.props.routeParams.id;
            this.props.loadProjectDetail(id || null);
        }
    }

    componentDidMount() {
        this.isGotoAgreementLeavewords = false;
    }

    componentWillUnmount() {
        if (!this.isGotoAgreementLeavewords) {
            this.props.dispatch(resetState());
        } else {
            this.props.dispatch(resetCopyright());
        }
    }

    submitAgreementHandler() {
        this.isGotoAgreementLeavewords = true;
        this.context.router.push(`/projectDetail/${this.props.routeParams.id}/agreementLeavewords`);
    }

    render() {
        let _content = '';
        let _data = this.props.projectDetail.toJS();

        if (_data.projectId) { //内容下载到时展示
            _content = <div className="mainContent deepBg">
                <ProjectDesc {...this.props} />
                <ProjectIntro items={this.props.projectDetail}/>
                <ProjectTag {...this.props}/>
                <ProjectSign {...this.props}/>
                <ProjectComment items={this.props.projectDetail}/>
                <p className={style.copyrightText}>版权声明：一切权利归作者／著作权人所有，未经许可，不得转载或以任何商业用途使用。</p>
                <ProjectFooterBar {...this.props} submitAgreement={this.submitAgreementHandler.bind(this)} />
            </div>;
        } else {
            _content = <LoadingBar />;
        }

        return (
            <div className="pageInner">
                <ProjectTopBar {...this.props} />
                {_content}
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    selectDetailResult(),
    selectDetailProjectChapter(),
    selectProjectCopyright(),
    selectShareData(),
    (projectDetail, projectDetailChapter, projectCopyright, shareData) => {
        return {
            projectDetail,
            projectDetailChapter,
            projectCopyright,
            shareData
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        loadProjectDetail: (id) => {
            dispatch(loadProjectDetailData(id || null));
        },
        loadChapter: (id) => {
            dispatch(loadProjectChapterData(id || null))
        },
        loadProjectCopyrightData: function () {
            dispatch(loadProjectCopyrightData(this.routeParams.id || null));
        },
        setShareStatus: (shareData) => {
            dispatch(setShareData(shareData))
        },
        dispatch,
    };
}

DetailPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
