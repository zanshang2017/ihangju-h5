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
        return (
            <div className={style.projectDetails}>
                <div className={style.cover}>
                    <div className={style.coverImg}>
                        {
                            imageSrc && <img src={imageSrc}/>
                        }
                    </div>
                </div>
                <div className={style.author}>
                    <div className={style.title}>
                        {_result.projectName}
                    </div>
                    <div className={style.authorImg}>    
                        <Link to={`/person/${_result.authorId}`}>
                            {
                                headSrc && <img src={headSrc}/>
                            }
                            <span className={style.name}>{_result.authorName}</span>
                        </Link>
                    </div>
                    <span className={style.date}><i></i>{modifyTime}更新</span>
                    <span className={style.readNum}><i></i>{_result.browseNumber}人阅读</span>
                    <span  onClick={props.showChapterListHandler} className={style.catalog}>查看目录</span>
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