import React from 'react';
import styles from './style.css';
import ChapterList from '../../common/ChapterList';

import {
    locStorage
} from 'utils/util';
import TopBar from '../../common/TopBar';

var x = null;
var y = null;
var	isMoved = true;

export default class ReadContent extends React.Component {
	constructor(props) {
        super(props);
        this.touchMove = null;
    }
	componentDidMount() {
        var that = this;
        document.addEventListener("touchstart", that.tStart.bind(that), false);
		document.addEventListener("touchmove", that.tMove.bind(that), false);
		document.addEventListener("touchend", that.tEnd.bind(that), false);
    }

    tStart(event) {
    	if(isMoved) {
			var touches = event.targetTouches;
                if (touches.length == 1) {
                    x = touches[0].pageX;
                    y = touches[0].pageY;
                }
                    isMoved = false;
		}
    }
    tMove(event) {
    	event.preventDefault();
		if(!isMoved) {
			var touches = event.targetTouches;
			let _chapterContent = this.props.chapterContent.toJS();
			let _projectInfo = this.props.projectInfo.toJS();
			let chapterIndex = null
			let cid = null;
			let projectInfoKey = null
			_projectInfo.map(function(item, key) {		
				if(item.pid == _chapterContent.historyId){
					cid = item.cid;
						projectInfoKey = key;
						return;
					}
			})
			var nwrap = this.refs.nFollowListWrap;
			var nwrapH = nwrap.getBoundingClientRect().height;
			var bodyH = document.body.clientHeight;
			var bodyS = document.body.scrollTop
			if(touches.length == 1){
				var x1 = touches[0].pageX, 
		            y1 = touches[0].pageY;
				if (((y1 + 40) < y)) {;
                    isMoved = true;
					// console.log(bodyH + bodyS > nwrapH + 50);
					// console.log(bodyS,bodyH,nwrapH);
					if(bodyH + bodyS > nwrapH + 40){
						alert("上滑");
						var that = this;
						_chapterContent.chapters.map(function(item, key) {
							if(item.id == cid){
								chapterIndex =  key + 1;
								if(chapterIndex >= _chapterContent.chapters.length){
									alert("没有下一章了");
									return;
								}
								_projectInfo[projectInfoKey].cid = _chapterContent.chapters[chapterIndex].id;
								that.props.setProjectInfoStatus(_projectInfo);
								locStorage.set('projectInfo', JSON.stringify(_projectInfo));
							}
						})
					}
               }
			   if (((y1 - 40) > y)) {
                	isMoved = true;
					if(document.body.scrollTop === 0){
						alert("下滑");
						var that = this;
						_chapterContent.chapters.map(function(item, key) {
							if(item.id == cid){
								chapterIndex =  key - 1;
								if(key < 1){
									alert("没有上一章节了");
									return;
								}
								_projectInfo[projectInfoKey].cid = _chapterContent.chapters[chapterIndex].id;
								that.props.setProjectInfoStatus(_projectInfo);
								locStorage.set('projectInfo', JSON.stringify(_projectInfo));
							}
						})  	
					}
                 
					    
               }
			}
		}
    }
    tEnd(event) {

    } 
    showReadTopbar() {
    	let _redTopdom = this.refs._readTopbar;
    	 _redTopdom.classList.toggle('hide');
    }
    showChapterList() {

        this.refs.J_ChapterList.showChapterList();
    }
	render(){
		var props = this.props;
		var _chapterContent = props.chapterContent.toJS();
		var projectInfo =  props.projectInfo.toJS();
		var _chapterList = '';
		var chapterIndex = null;
		var cid = null;
		var _chapterTitle = '';
		if(!_chapterContent || _chapterContent.size < 1){
			_chapterList = "1111111111111";
		}else if(_chapterContent.chapters && projectInfo){
			projectInfo.map(function(item, key) {		
				if(item.pid == _chapterContent.historyId){
					cid = item.cid;
					return cid;
				}
			})
			_chapterContent.chapters.map(function(item,key){
				if(item.id == cid){
					chapterIndex =  key;
					return chapterIndex;
				}
			})
			_chapterList = _chapterContent.chapters[chapterIndex].content;
			_chapterTitle = _chapterContent.chapters[chapterIndex].title;
		}
		return (
			<div>
				<div ref="_readTopbar" className="hide">
					<TopBar data-has-back="true">
                    <div data-title>
                    	<span onClick={this.showChapterList.bind(this)}>{_chapterTitle}</span>
                    </div>
                    <div data-btns>
						<span className={styles.share}></span>
                    </div>
                </TopBar>
				</div>
            	<ChapterList ref="J_ChapterList" items={this.props.chapterContent}  />
								
				<div className={styles.chpCon} onClick={this.showReadTopbar.bind(this)} ref="nFollowListWrap">
					<div dangerouslySetInnerHTML={{__html: `${_chapterList}`}} /> 
				</div>
			</div>
		)
	};
}

ReadContent.propTypes = {};

export default ReadContent;