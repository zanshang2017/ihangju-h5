import React from 'react';
import style from './style.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

class ProjectDesc extends React.Component{

	render(){
    	let imageSrc = IMG_CDN_PATH + '/image/578d9219e4b06674859033d4.jpg';
		let headSrc = IMG_CDN_PATH + '/static/random3.png';
		return (
			<div className={style.projectDetails}>
				<div className={style.cover}>
					<img src={imageSrc} />
				</div>
				<div className={style.author}>
					<img src={headSrc} />
					<span className={style.name}>跳舞的裙子</span>
					<span className={style.date}>23小时前更新</span>
				</div>
				<div className={style.title}>
					这三位来自上海的学生想用自己的书为农村的孩子建一座足球场
				</div>
				<div className={style.num}>
					<ul>
						<li>阅读<em>301986</em></li>
						<li>喜欢<em>2114</em></li>
						<li>关注<em>804</em></li>
					</ul>
				</div>
			</div>
		)
	}
}
export default ProjectDesc;