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

    componentWillMount() {

    }

    componentDidMount() {
        this._result = this.props.projectDetail.toJS();
        this.locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
        this.newArr = this.locStorageProjectInfo[this._result.projectId];
        if (this._result.projectId) {
            this.props.loadChapter(this._result.projectId);
        }
    }

    render() {
        let readImgsrc = addImageParam(IMG_CDN_PATH + '/image/57b2ed2de4b0f816612df7d7.png');
        let cid = null;
        let tagList = '';

        if (this.newArr) {
            for (var i in this.newArr) {
                cid = this.newArr[i];
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

        var tags = (this._result && this._result.tagArray) || [];

        console.log(tags)
;
        if (!this._result || (this._result && this._result.size < 1)) {
            tagList = <li>空标签</li>;
        } else {
            tagList = tags.map(function (item, key) {
                return <li key={item.id + 'tag'}>
                    <Link to={`/tag/${item.id}`}>{item.name}</Link>
                </li>
            });
        }

        var _html = '';

        if (this._result) {
            _html = <div>
                <ul>
                    {tagList}
                </ul>
                <Link to={`/readProjectChapter/${this._result.projectId}/${cid}`}>
                    <img className={style.readImg} src={readImgsrc} data-hashover="true"/>
                </Link>
            </div>;
        }

        return (
            <div className={style.projectTag}>
                {_html}
            </div>
        )
    }
}

export default ProjectTag;