import React from 'react';
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
			<img className={style.readImg} src={readImgsrc} />
		</div>
	);
}

export default ProjectTag;