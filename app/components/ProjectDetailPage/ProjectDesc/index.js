import React from 'react';
import style from './style.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    convertDate
} from '../../../utils/util.js';

class ProjectDesc extends React.Component{
	constructor(props) {
        super(props);
    }
	render(){
		var props = this.props;
		var _result = props.projectDetail.toJS();
    	let imageSrc = IMG_CDN_PATH + _result.projectImage;
		let headSrc = IMG_CDN_PATH + _result.authorAvatar;
		let modifyTime =  convertDate(_result.modifyTime);
		return (
			<div className={style.projectDetails}>
				<div className={style.cover}>
					<div className={style.coverImg}>
						<img  src={imageSrc} />
					</div>
					<div className={style.publisher}>
						<span className={style.left}>{_result.tutorName}</span>
						<span className={style.right}>出版人</span>
					</div>
				</div>
				<div className={style.author}>
					<img src={headSrc} />
					<span className={style.name}>{_result.authorName}</span>
					<span className={style.date}>{modifyTime}更新</span>
				</div>
				<div className={style.title}>
					{_result.projectName}
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

ProjectDesc.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};




export default ProjectDesc;