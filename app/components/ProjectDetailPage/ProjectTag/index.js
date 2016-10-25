import React from 'react';
import {Link} from 'react-router';
import style from './style.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE,
} from 'utils/util.js';

import {
    locStorage
} from 'utils/util';

class ProjectTag extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let readImgsrc = addImageParam(IMG_CDN_PATH + '/image/57b2ed2de4b0f816612df7d7.png');
        let tagList = '';
        var _result = this.props.projectDetail.toJS();
        var cid = null;
        var locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
        var newArr = locStorageProjectInfo[_result.projectId];
        if (_result.projectId) {
            this.props.loadChapter(_result.projectId);
        }
        if (newArr) {
            for (var i in newArr) {
                cid = newArr[i];
            }
        } else {
            let chaptersDetail = this.props.projectDetailChapter.toJS();
            let chaptersArr = chaptersDetail.chapters;
            if (chaptersArr) {
                chaptersArr.map(function (item, key) {
                    if (key === 0) {
                        return cid = item.id;
                    }
                })
            }
        }

        var tags = _result.tagArray || [];
        if (!_result || _result.size < 1) {
            tagList = <li>空标签</li>;
        } else {
            tagList = tags.map(function (item, key) {
                return <li key={item.id}>
                    <Link to={`/tag/${item.id}`}>{item.name}</Link>
                </li>
            });
        }
        return (
            <div className={style.projectTag}>
                <ul>
                    {tagList}
                </ul>
                <Link to={`/readProjectChapter/${_result.projectId}/${cid}`}>
                    <img className={style.readImg} src={readImgsrc}/>
                </Link>
            </div>
        )
    }
}

export default ProjectTag;