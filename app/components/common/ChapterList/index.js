import React from 'react';
import styles from './style.css';
import { Link } from 'react-router';
import {
    locStorage,
    unique
} from 'utils/util';

class ChapterList extends React.Component{
	constructor(props) {
        super(props);
    }
	hideChaterList (){
		let nChapterListWrap = this.refs.nChapterListWrap;
		nChapterListWrap.classList.add('hide');
	}
	showChapterList (){
		let nChapterListWrap = this.refs.nChapterListWrap;
		nChapterListWrap.classList.remove('hide');
	}
	chapterListClick(e) {
	}
	render() {
		var that = this;
		var _chapterMes = this.props.items.toJS();
		var _chapterList = '';
		var locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};

		let projectId = null;
		projectId = _chapterMes.projectId || _chapterMes.historyId;
		if(!_chapterMes.chapters || _chapterMes.chapters.length < 1){
			_chapterList = <li>没有章节</li>
		}else{
			var arr = [];
			for(var i in locStorageProjectInfo[projectId]){
				arr.push(i);	
			}
			var newArr = unique(arr);
			_chapterList =  _chapterMes.chapters.map(function(item, key){
				if(newArr.indexOf(item.id) === -1){
					return <Link key={key} to={`/readProjectChapter/${projectId}/${item.id}`}><li onClick={that.chapterListClick.bind(this)}><span className={styles.chapterLeft}>{item.title}</span><span className={styles.chapterRight}>未读</span></li></Link>
				}else{
					return <Link key={key} to={`/readProjectChapter/${projectId}/${item.id}`}><li onClick={that.chapterListClick.bind(this)}><span className={styles.chapterLeft}>{item.title}</span><span className={styles.chapterRight}>已读</span></li></Link>
				}
			})
		}
		return (
			<div ref="nChapterListWrap" className={`${styles.chapterListLayer} hide`}>
				<div className={styles.projectMes}>
					<span className={styles.projectTitle}>{_chapterMes.projectName}</span>
					<span className={styles.projectAuthor}>{_chapterMes.authorName}</span>
				</div>
				<ul>
					{_chapterList}
				</ul>
				<span className={styles.layerClose} onClick={this.hideChaterList.bind(this)}><img src="https://o82zr1kfu.qnssl.com/@/image/57bbb8f4e4b0f8166131f55d.png" /></span>
			</div>
		)
	}
}

export default ChapterList;