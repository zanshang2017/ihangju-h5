import React from 'react';
import style from './style.css';
import {Link} from 'react-router';
import {
    IMG_CDN_PATH
} from '../../../apis.js'
import {
    convertDate,
    addImageParam,
    IMAGE_SIZE_TYPE,
} from '../../../utils/util.js';

class ProjectComment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var _result = this.props.items.toJS();
        let contentList = '';
        if (!_result.comments) {
            contentList = <li>加载中...</li>
        } else if (_result.comments.length < 1) {
            contentList = <li>暂无评论</li>;
        } else {
            let createTime = null;
            let imageUrl = '';
            contentList = _result.comments.map(function (item, key) {
                createTime = convertDate(item.createTime);
                imageUrl = item.commentUser.avatar ? addImageParam(IMG_CDN_PATH + item.commentUser.avatar, IMAGE_SIZE_TYPE.AVATAR_SMALL) : '';

                return <li key={key}>
                    <div className={style.top}>
                        <div className={style.name}>
                            <Link to={`/person/${item.commentUser.id}`}>
                                {
                                    imageUrl ? <img src={imageUrl}/> : ''
                                }
                                <span>{item.commentUser.nickName}</span>
                            </Link>
                        </div>
                        <div className={style.time}>{createTime}</div>
                    </div>
                    <div className={style.content}>
                        {item.content}
                    </div>
                </li>
            })
        }
        return (
            <div className={style.projectComment}>
                <div className={style.commentNum}>评论<em>({_result.commentNumber})</em></div>
                <ul>
                    {contentList}
                </ul>
                <span data-hashover="true" className={style.commentBtn}><Link to={`/comments/${_result.projectId}`}>查看更多评论</Link></span>
            </div>
        )
    }
}

export default ProjectComment;