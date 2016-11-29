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
        let contentNum = '';
        if(_result.professionalreviews.length < 1) {
            contentNum = '0';
        }else {
            contentNum = _result.professionalreviews.length;
        }
        if (!_result.comments) {
            contentList = <li>加载中...</li>
        } else if (_result.professionalreviews.length < 1) {
            contentList = <li>暂无点评</li>;
        } else {
            let createTime = null;
            let imageUrl = '';

            // authorid: "56efa629e4b047ac630824ae"
            // authorname: "走走"
            // avatar: "/image/571997ace4b0f9d7904da63d.jpg"
            // coment: "多久更新一次？"
            // createtime: 1470156261980

            contentList = _result.professionalreviews.map(function (item, key) {
                if(key > 9) return '';

                createTime = convertDate(item.createtime);
                imageUrl = item.avatar ? addImageParam(IMG_CDN_PATH + item.avatar, IMAGE_SIZE_TYPE.AVATAR_SMALL) : '';

                return <li key={key}>
                    {/*<div className={style.top}>
                        <div className={style.name}>
                            <Link to={`/person/${item.authorid}`}>
                                {
                                    imageUrl ? <img src={imageUrl}/> : ''
                                }
                                <span>{item.authorname}</span>
                            </Link>
                        </div>
                        <div className={style.time}>{createTime}</div>
                    </div>
                    <div className={style.content}>
                        {item.content}
                    </div>*/}
                    <div className={style.left}>
                        <Link to={`/person/${item.authorid}`}>
                            {
                                imageUrl ? <img src={imageUrl}/> : ''
                            }
                        </Link>
                    </div>
                    <div className={style.right}>
                        <div className={style.top}>
                            <span>{item.authorname}</span>
                            <div className={style.time}>{createTime}</div>
                        </div>
                        <div className={style.content}>
                            {item.coment}
                        </div>
                    </div>
                </li>
            })
        }
        return (
            <div className={style.projectComment}>
                <div className={style.commentNum}>专业点评<em>({contentNum})</em></div>
                <ul>
                    {contentList}
                </ul>
                {/*<span data-hashover="true" className={style.commentBtn}><Link to={`/comments/${_result.projectId}`}>查看更多评论</Link></span>*/}
            </div>
        )
    }
}

export default ProjectComment;