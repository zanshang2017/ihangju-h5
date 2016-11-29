import React from 'react';
import {Link} from 'react-router';
import style from './style.css';

import {
    locStorage
} from 'utils/util';

import ProjectSignLayer from 'components/ProjectDetailPage/ProjectSignLayer';

class ProjectFooterBar extends React.Component{
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
    signedWords() {
        this.refs.J_signLayer.showSignLayer();
    }
	render(){
        let cid = null;

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
        var _html = '';
        if(this._result) {
            _html = <Link to={`/readProjectChapter/${this._result.projectId}/${cid}`}>
                    <div className={style.listDiv}><i className={style.read}></i>阅读</div>
                </Link>
        }
		return(
			<div className={style.prodectFooterBar}>
				{_html}
                <div className={style.listDiv} onClick = {this.signedWords.bind(this)}><i className={style.signWork}></i>签作品</div>
                <ProjectSignLayer ref="J_signLayer" />
			</div>
		)
	}	
}

export default ProjectFooterBar;



