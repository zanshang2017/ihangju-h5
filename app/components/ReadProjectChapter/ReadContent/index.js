import React from 'react';
import styles from './style.css';
import ChapterList from '../../common/ChapterList';
import ShareBtnList from '../../common/SharebtnList';
import {take, call, put, select} from 'redux-saga/effects';

import {
    locStorage,
    convertDate
} from 'utils/util';
import TopBar from '../../common/TopBar';

import {
    IMG_CDN_PATH,
    COLLECTION_API,
} from '../../../apis.js';

var x = null;
var y = null;
var	isMoved = true;
var projectId  = null;
var chapterId = null;
export default class ReadContent extends React.Component {
	constructor(props) {
        super(props);
        this.chapterTitle = '';
        this.chapterList = '';
        this.shareData = {};
    }
    componentWillMount() {
    	if (this.props.routeParams) {
           	projectId = this.props.routeParams.projectId;
            chapterId = this.props.routeParams.chapterId;
        }
        this.shareData = {
    		url: window.location.href,
    		title : this.chapterTitle,
    		content: '',
    		imgSrc: IMG_CDN_PATH + 'image/5743b85fe4b00243fbd23456.jpg'
    	}
    	this.props.setShareStatus(this.shareData);
    }
	componentDidMount() {
        var that = this;
        var touchDom = that.refs.nFollowListWrap;
        touchDom.addEventListener("touchstart", that.tStart.bind(that), false);
		touchDom.addEventListener("touchmove", that.tMove.bind(that), false);
		touchDom.addEventListener("touchend", that.tEnd.bind(that), false);
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
			let locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
			let chapterIndex = null;
			// let projectInfoKey = null;
			//  _projectInfo.map(function(item, key) {		
			// 	if(item.pid == projectId){
			// 		projectInfoKey = key;
			// 	}
			// })

			var nwrap = this.refs.nFollowListWrap;
			var nwrapH = nwrap.getBoundingClientRect().height;
			var bodyH = document.body.clientHeight;
			var bodyS = document.body.scrollTop
			if(touches.length == 1){
				var x1 = touches[0].pageX, 
		            y1 = touches[0].pageY;
				if (((y1 + 40) < y)) {;
                    isMoved = true;
					if(bodyH + bodyS >= nwrapH){
						alert("上滑");
						 var that = this;
						 _chapterContent.chapters.map(function(item, key) {
							if(item.id == chapterId){
								if(key > _chapterContent.chapters.length){
									chapterIndex = null;
									alert("没有下一章了");
									return;
								}
								chapterIndex =  key + 1;
								return chapterIndex;		
							}
						})
						 if(chapterIndex){
						 	chapterId = _chapterContent.chapters[chapterIndex].id;
							locStorageProjectInfo[projectId].push(chapterId);
							that.props.setProjectInfoStatus(_projectInfo);
							locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));
						 }
						
						
					}
               }
			   if (((y1 - 40) > y)) {
                	isMoved = true;
					if(document.body.scrollTop === 0){
						alert("下滑");
						var that = this;
						_chapterContent.chapters.map(function(item, key) {
							if(item.id == chapterId){
								if(key < 1){
									chapterIndex = null;
									alert("没有上一章节了");
									return;
								}
								chapterIndex =  key - 1;
								return chapterIndex;
							}
						})
						if(chapterIndex || chapterIndex === 0){
							chapterId = _chapterContent.chapters[chapterIndex].id;
							locStorageProjectInfo[projectId].push(chapterId);
							that.props.setProjectInfoStatus(_projectInfo);
							locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));
						}
							
					}
                 
					    
               }
			}
		}
    }
    tEnd(event) {

    } 
    showReadTopbar() {
    	let _redTopdom = this.refs._readTopbar;
    	let _redBottomdom = this.refs._readBottombar
    	 _redTopdom.classList.toggle('hide');
    	 _redBottomdom.classList.toggle('hide');

    }
    showChapterList() {
        this.refs.J_ChapterList.showChapterList();
    }
    likeHeart() {
    	let _chapterContent = this.props.chapterContent.toJS();
    	let url =  COLLECTION_API + projectId+'/project';
    	let method = '';
    	if(_chapterContent.like){
    		method = 'DELETE';
    	}else{
    		method = 'PUT';
    	}
    	this.props.loadLike(url,method);
    }
    shareShow() {
    	let oldHref = window.location.href;
    	let lastIndex = oldHref.lastIndexOf('/') +1;
    	let newHref = oldHref.substring(0,lastIndex) + chapterId;
    	this.shareData.url = newHref;
    	this.shareData.title = this.chapterTitle;
    	this.props.setShareStatus(this.shareData);
    	this.refs.J_ShareBtnListRead.showShareLayer();
    }
    readStar() {
    	let readStardom = this.refs._readStar;
    	let method = '';
        let url =  COLLECTION_API + projectId+'/project';

    	if(readStardom.classList.contains('icon-staro')){
    		method = 'PUT';
    	}else{
    		method = 'DELETE';
    	};
    	this.props.loadCollection(url , method);
    }
	render(){
		var props = this.props;
		var _chapterContent = props.chapterContent.toJS();
		//var projectInfo =  props.projectInfo.toJS();
		let authorAvatar = IMG_CDN_PATH + _chapterContent. authorAvatar;
		let modifyTime = convertDate(_chapterContent.modifyTime)
		var chapterIndex = null;
		if(projectId && chapterId && _chapterContent.chapters){
			_chapterContent.chapters.map(function(item, key) {
				if(item.id == chapterId){
					chapterIndex =  key;
					return chapterIndex;
				}
			})
			// projectInfo.map(function(item, key) {
			// 	if(item.pid == projectId){
			// 		item.cid  = chapterId;
			// 		locStorage.set('projectInfo', JSON.stringify(projectInfo));
			// 	}
			// })
			let _authorMesdom = this.refs._authorMes;
			if(chapterIndex === 0){	
				if(_authorMesdom){
					_authorMesdom.classList.remove('hidden');
				}
			}else{
				if(_authorMesdom){
					_authorMesdom.classList.add('hidden');
				}
			}
			this.chapterList = _chapterContent.chapters[chapterIndex].content;
			this.chapterTitle = _chapterContent.chapters[chapterIndex].title;
		}else{
			this.chapterList = "暂无章节内容";
		}
		var collectionClass = (_chapterContent.collection ? 'icon-star' : 'icon-staro');
		var likeClass = (_chapterContent.like ? (<img src='https://o82zr1kfu.qnssl.com/@/image/57c64c9fe4b073472e7954e7.png'></img>) : (<img src='https://o82zr1kfu.qnssl.com/@/image/57c6400be4b073472e79312f.png'></img>));
		return (
			<div>
				<div ref="_readTopbar" className="hide">
					<TopBar data-has-back="true">
	                    <div data-title>
	                    	<div onClick={this.showChapterList.bind(this)} className={styles.chapterTitle}>
	                    		<span>{this.chapterTitle}</span>
	                    		<i className="icon-down iconfont"></i>
	                    	</div>
	                    	<div  className={styles.rightStar}>
	                    	   <i onClick={this.readStar.bind(this)} ref="_readStar" className={`${collectionClass} iconfont`}></i>
	                    	</div>
	                    </div>
	                    <div data-btns>
							<span className={styles.share}></span>
	                    </div>
                	</TopBar>
				</div>
            	<ChapterList ref="J_ChapterList" items={this.props.chapterContent}  />
								
				<div ref="nFollowListWrap" className={styles.chpCon} onClick={this.showReadTopbar.bind(this)}>
					<div ref="_authorMes" className={`${styles.authorMes} hidden`}>
							<img src={authorAvatar} />
							<span className={styles.left}>{_chapterContent.authorUserName}</span>
							<span className={styles.right}>{modifyTime}更新</span>
					</div>
					<p className={styles.contentTitle}>{this.chapterTitle}</p>
					<div className={styles.contentMes} dangerouslySetInnerHTML={{__html: `${this.chapterList}`}} /> 
				</div>
				<div ref="_readBottombar" className={`${styles.bottomBar} hide`}>
					<ul>
						<li><i className={styles.i1}></i><span>8</span></li>
						<li><i ref="_readLike" onClick={this.likeHeart.bind(this)} >
								{likeClass}
						</i></li>
						<li><i onClick={this.shareShow.bind(this)} className={styles.i3}></i></li>
					</ul>
				</div>
				<ShareBtnList ref="J_ShareBtnListRead" items={this.props.shareData} /> 
			</div>
		)
	};
}

ReadContent.propTypes = {};

export default ReadContent;