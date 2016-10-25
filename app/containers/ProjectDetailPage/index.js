import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {
    selectDetail,
    selectDetailResult,
    selectDetailProjectChapter,
    selectShareData,
} from './selectors';

import ProjectDesc from 'components/ProjectDetailPage/ProjectDesc';
import ProjectTag from 'components/ProjectDetailPage/ProjectTag';
import ProjectIntro from 'components/ProjectDetailPage/ProjectIntro';
import ProjectComment from 'components/ProjectDetailPage/ProjectComment';
import ProjectTopBar from 'components/ProjectDetailPage/ProjectTopBar';

// import styles from './style.css';

import {
    loadProjectDetailData,
    loadProjectChapterData,
    setShareData,
    resetState,
} from './actions';


/* eslint-disable react/prefer-stateless-function */
class DetailPage extends React.Component {
    componentWillMount() {
        if (this.props.routeParams) {
            var id = this.props.routeParams.id;
            // this.props.dispatch(loadProjectDetailData(id || null));
            this.props.loadProjectDetail(id || null);
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetState());
    }

    render() {
        return (
            <div className="pageInner">
                <ProjectTopBar {...this.props} />
                <div className="mainContent">
                    <ProjectDesc {...this.props} />
                    <ProjectTag {...this.props}/>
                    <ProjectIntro items={this.props.projectDetail}/>
                    <ProjectComment items={this.props.projectDetail}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    selectDetailResult(),
    selectDetailProjectChapter(),
    selectShareData(),
    (projectDetail, projectDetailChapter, shareData) => {
        return {
            projectDetail,
            projectDetailChapter,
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
        setShareStatus: (shareData) => {
            dispatch(setShareData(shareData))
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
