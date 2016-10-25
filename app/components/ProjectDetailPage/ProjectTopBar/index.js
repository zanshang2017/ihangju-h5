import React from 'react';
import style from './style.css';

import {Env} from 'utils/env';

import ChapterList from '../../common/ChapterList';
import TopBar from '../../common/TopBar';
import ShareBtnList from '../../common/ShareBtnList';
import {
    IMG_CDN_PATH
} from '../../../apis.js';

class ProjectTopBar extends React.Component {
    constructor(props) {
        super(props);
        this.shareData = {};
    }

    componentWillMount() {
    }

    showChapterListHandler() {
        let _conMes = this.props.projectDetail.toJS();
        this.props.loadChapter(_conMes.projectId);
        this.refs.J_ChapterList.showChapterList();
    }

    shareProject() {
        let _conMes = this.props.projectDetail.toJS();

        this.shareData = {
            url: `https://${Env.shareHost}/share/index.html?project=${_conMes.projectId}`,
            title: _conMes.projectName,
            content: _conMes.description,
            imgSrc: IMG_CDN_PATH + 'image/5743b85fe4b00243fbd23456.jpg'
        };

        this.props.setShareStatus(this.shareData);
        this.refs.J_ShareBtnList.showShareLayer();
    }

    render() {
        return (
            <div className={style.topBar}>
                <TopBar data-has-back="true">
                    <div data-title>作品详情</div>
                    <div data-btns>
                        <span onClick={this.showChapterListHandler.bind(this)} className={style.catalog}></span>
                        <span onClick={this.shareProject.bind(this)} className={style.share}></span>
                    </div>
                </TopBar>
                <ChapterList ref="J_ChapterList" items={this.props.projectDetailChapter}/>
                <ShareBtnList ref="J_ShareBtnList" items={this.props.shareData}/>
            </div>
        )
    }
}
;

export default ProjectTopBar;