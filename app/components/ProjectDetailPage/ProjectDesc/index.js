import React from 'react';
import style from './style.css';

import {Link} from 'react-router';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE,
    convertDate,
} from '../../../utils/util.js';

class ProjectDesc extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var _result = props.projectDetail.toJS();

        let imageSrc = _result.projectImage ? addImageParam(IMG_CDN_PATH + _result.projectImage) : '';
        let headSrc = _result.authorAvatar ? addImageParam(IMG_CDN_PATH + _result.authorAvatar, IMAGE_SIZE_TYPE.AVATAR_SMALL) : '';
        let modifyTime = convertDate(_result.modifyTime);
        let publisher = '';

        if (_result.tutorName) {
            publisher = <div className={style.publisher}>
                <span className={style.left}>{_result.tutorName}</span>
                <span className={style.right}>出版人</span>
            </div>;
        }

        return (
            <div className={style.projectDetails}>
                <div className={style.cover}>
                    <div className={style.coverImg}>
                        {
                            imageSrc && <img src={imageSrc}/>
                        }
                    </div>
                    {publisher}
                </div>
                <div className={style.author}>
                    <Link to={`/person/${_result.authorId}`}>
                        {
                            headSrc && <img src={headSrc}/>
                        }
                        <span className={style.name}>{_result.authorName}</span>
                    </Link>
                    <span className={style.date}>{modifyTime}更新</span>
                </div>
                <div className={style.title}>
                    {_result.projectName}
                </div>
                <div className={style.num}>
                    <ul>
                        <li>阅读<em>{_result.browseNumber}</em></li>
                        <li>喜欢<em>{_result.likeNumber}</em></li>
                        <li>关注<em>{_result.followNumber}</em></li>
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