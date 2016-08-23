import React from 'react';
import style from './style.css';
import {
	IMG_CDN_PATH
} from '../../../apis.js'

class ProjectComment extends React.Component{
	constructor(props) {
        super(props);
    }
	render(){
		var _result = this.props.items.toJS();
		let contentList = '';
		if(!_result.comments || _result.comments.length < 1){
			contentList = <li>加载中...</li>
		} else {
			contentList = _result.comments.map(function (item, key) {			
				return <li key={key}>
							<div className={style.top}>
								<div className={style.name}>
									<img src={item.commentUser.avatar} />
									<span>{item.commentUser.nickName}</span>
								</div>
								<div className={style.time}>{item.createTime}</div>
							</div>
							<div className={style.content}>
								{item.content}
							</div>
						</li>
			})
		}
		let headSrc = IMG_CDN_PATH + '/static/random3.png';
		return(
			<div className={style.projectComment}>
				<div className={style.commentNum}>评论<em>({_result.commentNumber})</em></div>
				<ul>
					{contentList}
				</ul>
				<span className={style.commentBtn}>查看更多评论</span>
			</div>
		)
	}
}

export default ProjectComment;