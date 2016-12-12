import React from 'react';
import styles from './style.css';
import {Link} from 'react-router';
import {
    locStorage,
    unique
} from 'utils/util';

import {
    TransitionEvents
} from 'utils/transitionEvents';

class ChapterList extends React.Component {
    constructor(props) {
        super(props);
        this.projectId = null;
        this._chapterMes = null;
        this._chapterList = [];
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.transitionHandler = this.transitionHandler.bind(this);
        TransitionEvents.addEndEventListener(this.refs.nChapterListWrap, this.transitionHandler);
    }

    componentWillUnmount() {
        TransitionEvents.removeEndEventListener(this.refs.nChapterListWrap, this.transitionHandler);
    }

    transitionHandler() {
        let nChapterListWrap = this.refs.nChapterListWrap;
        if (nChapterListWrap.classList.contains('transparent')) {
            nChapterListWrap.classList.add('hide');
        }
    }

    hideChaterList() {
        let nChapterListWrap = this.refs.nChapterListWrap;
        nChapterListWrap.classList.add('transparent');
    }

    showChapterList() {
        let nChapterListWrap = this.refs.nChapterListWrap;
        nChapterListWrap.classList.remove('hide');
        setTimeout(function () {
            nChapterListWrap.classList.remove('transparent');
        }, 10);
    }

    chapterListClick(e) {
        var chapterId = e.currentTarget.dataset['id'];
        var readUrl = `/readProjectChapter/${this.projectId}/${chapterId}`;
        if (location.href.indexOf('projectDetail') > -1) {
            this.context.router.push(readUrl);
        } else {
            this.context.router.replace(readUrl);
        }

    }

    render() {
        var that = this;
        var locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
        this._chapterMes = this.props.items.toJS();
        this.projectId = this._chapterMes.projectId || this._chapterMes.historyId;
        if (!this._chapterMes.chapters || this._chapterMes.chapters.length < 1) {
            this._chapterList = <li>没有章节</li>
        } else {
            var arr = [];
            for (var i in locStorageProjectInfo[this.projectId]) {
                arr.push(locStorageProjectInfo[this.projectId][i]);
            }
            var newArr = unique(arr);
            this._chapterList = this._chapterMes.chapters.map(function (item) {
                if (newArr.indexOf(item.id) === -1) {
                    return <li key={item.id} data-id={item.id} onClick={that.chapterListClick.bind(that)}><span
                        className={styles.chapterLeft}>{item.title}</span><span
                        className={styles.chapterRight}>未读</span></li>
                } else {
                    return <li key={item.id} data-id={item.id} onClick={that.chapterListClick.bind(that)}><span
                        className={styles.chapterLeft}>{item.title}</span><span
                        className={styles.chapterRight}>已读</span></li>
                }
            })
        }

        return (
            <div ref="nChapterListWrap" className={`${styles.chapterListLayer} hasTransition hide transparent`}>
                <div className={styles.projectMes}>
                    <span className={styles.projectTitle}>{this._chapterMes ? this._chapterMes.projectName : ''}</span>
                    <span className={styles.projectAuthor}>{this._chapterMes ? this._chapterMes.authorName : ''}</span>
                </div>
                <ul>
                    {this._chapterList}
                </ul>
                <span className={styles.layerClose} onClick={this.hideChaterList.bind(this)}><img
                    src="https://o82zr1kfu.qnssl.com/@/image/57bbb8f4e4b0f8166131f55d.png"/></span>
            </div>
        )
    }
}

ChapterList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ChapterList;