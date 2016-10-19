import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import styles from './style.css';
import {
    selectReadChapter,
    selectProjectInfo,
    selectShareData,
} from './selectors';
import {
    loadReadChapterData,
    setProjectInfo,
    loadCollectionData,
    loadLikeData,
    setShareData,
} from './actions';

import {
    locStorage
} from 'utils/util';

import ReadContent from 'components/ReadProjectChapter/ReadContent';

class ReadProjectChapter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //获取保存的项目信息
        var projectInfo = null;

        try {
            projectInfo = JSON.parse(locStorage.get('projectInfo'));
        } catch (e) {
            alert(e);
        }

        //console.log(projectInfo);
        if (projectInfo) {
            this.props.dispach(setProjectInfo(projectInfo));
        }
    }

    componentDidMount() {
        if (this.props.routeParams) {
            var projectId = this.props.routeParams.projectId;
            var chapterId = this.props.routeParams.chapterId;
            this.props.dispach(loadReadChapterData(projectId || null, chapterId || null));
        }
    }

    render() {
        return (
            <ReadContent {...this.props} />
        )
    }
}

const mapStateToProps = createSelector(
    selectReadChapter(),
    selectProjectInfo(),
    selectShareData(),
    (chapterContent, projectInfo, shareData) => {
        return {
            chapterContent,
            projectInfo,
            shareData,
        }
    }
);
function mapDispatchToProps(dispach) {
    return {
        loadReadChapter: (projectId, chapterId) => {
            dispach(loadReadChapterData(projectId || null, chapterId || null))
        },
        setProjectInfoStatus: (projectInfo) => {
            dispach(setProjectInfo(projectInfo))
        },
        loadCollection: (url, method) => {
            dispach(loadCollectionData(url, method))
        },
        loadLike: (url, method) => {
            dispach(loadLikeData(url, method))
        },
        setShareStatus: (shareData) => {
            dispach(setShareData(shareData))
        },
        dispach,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadProjectChapter);
