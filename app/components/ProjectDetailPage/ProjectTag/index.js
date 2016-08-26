import React from 'react';
import { Link } from 'react-router';
import style from './style.css';
import {
	IMG_CDN_PATH
} from '../../../apis.js';

function ProjectTag(props){
	let readImgsrc = IMG_CDN_PATH + '/image/57b2ed2de4b0f816612df7d7.png';
	let tagList = '';
	var _result = props.items.toJS();
	var tags = _result.tags || [];
	if(!_result || _result.size < 1){
		tagList =  <li>空标签</li>
	} else {
		tagList = tags.map(function (item,key){
			return <li key={key}>{item}</li>
		})
	}
	return(
		<div className={style.projectTag}>
			<ul>
				{tagList}
			</ul>
			<Link to={'/readProjectChapter/57a941f4e4b0ab2d4f0d14cd/57a94289e4b0ab2d4f0d1507'}><img className={style.readImg} src={readImgsrc} /></Link>
		</div>
	);
}

export default ProjectTag;