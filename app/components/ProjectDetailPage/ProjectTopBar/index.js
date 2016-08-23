import React from 'react';
import style from './style.css';
import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import $ from 'jquery';
import ChapterList from '../../common/ChapterList';
import TopBar from '../../common/TopBar';

class  ProjectTopBar extends React.Component{
    constructor(props) {
        super(props);
    }
	showChapterListHandler (){
        this.props.loadChapter("57a941f4e4b0ab2d4f0d14cd");
        this.refs.J_ChapterList.showChapterList();
    }
	render() {
		return (
			<div>
            	<TopBar data-has-back="true">
                    <div data-title>作品详情</div>
                    <div data-btns>
                        <span onClick={this.showChapterListHandler.bind(this)} className={style.catalog}></span>
						<span className={style.share}></span>
                    </div>
                </TopBar>
            	<ChapterList ref="J_ChapterList" items={this.props.projectDetailChapter}  />
            </div>
		)
	}
};

export default ProjectTopBar;