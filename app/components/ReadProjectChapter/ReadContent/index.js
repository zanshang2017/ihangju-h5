/**
 *
 * todo: 上拉加载下一章有bug,先调整为点击按钮加载下一章,下拉加载上一章功能保留。
 */

import React from 'react';
import styles from './style.css';
import ChapterList from '../../common/ChapterList';
import ShareBtnList from '../../common/ShareBtnList';
import {take, call, put, select} from 'redux-saga/effects';
import {Env} from 'utils/env';

import {
    locStorage,
    convertDate
} from 'utils/util';
import TopBar from '../../common/TopBar';

import LazyLoad from 'react-lazy-load';

import {
    IMG_CDN_PATH,
    COLLECTION_API,
    FAVORITE_API,
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE,
} from 'utils/util'

import Toast from 'antd-mobile/lib/toast';
import {Link} from 'react-router';

import PullRefresh from 'components/common/ReactPullRefresh';
import TopGapForIOS from 'components/common/TopGapForIOS';

var projectId = null;
var chapterId = null;
var superThis = null;

class ReadContent extends React.Component {
    constructor(props) {
        super(props);
        this.chapterTitle = '';
        this.chapterList = '';
        this.shareData = {};
        this.topBarPositionOutCls = (Env.isIOSShell) ? 'topBarPositionOut_ios' : 'topBarPositionOut';
    }

    componentWillMount() {
        superThis = this;

        if (this.props.routeParams) {
            projectId = this.props.routeParams.projectId;
            chapterId = this.props.routeParams.chapterId;
        }
        this.shareData = {
            url: `https://${Env.shareHost}/share/index.html?project=${projectId}&chapter=${chapterId}`,
            title: this.chapterTitle,
            content: '',
            imgSrc: IMG_CDN_PATH + '/image/5743b85fe4b00243fbd23456.jpg'
        }
        this.props.setShareStatus(this.shareData);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    prevChapterHandler(e) {

        let that = this;

        return new Promise((resolve, reject) => {
            // let flag = setTimeout(() => {
                

                let _chapterContent = that.props.chapterContent.toJS();
                let _projectInfo = that.props.projectInfo.toJS();
                let locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
                let locStorageUserInfo = JSON.parse(locStorage.get('userInfo')) || {};
                let userInfoId = locStorageUserInfo.id;
                let chapterIndex = null;


                for (let key = 0, len = _chapterContent.chapters.length; key < len; key++) {
                    let item = _chapterContent.chapters[key];

                    if (item.id == chapterId) {
                        if (key == 0) {
                            chapterIndex = null;
                            Toast.info("没有上一章了", 1.5);
                            reject();
                            break;
                        }
                        chapterIndex = key - 1;
                        break;
                    }
                }

                if (chapterIndex || chapterIndex === 0) {
                    chapterId = _chapterContent.chapters[chapterIndex].id;
                    locStorageProjectInfo[userInfoId][projectId].push(chapterId);
                    that.props.setProjectInfoStatus(_projectInfo);
                    locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));
                    resolve();
                } else {
                    reject();
                }


            // }, .6 * 1e3);
        });
    }

    nextChapterHandler(e) {

        let that = this;

        if(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        let _chapterContent = that.props.chapterContent.toJS();
        let _projectInfo = that.props.projectInfo.toJS();
        let locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
        let locStorageUserInfo = JSON.parse(locStorage.get('userInfo')) || {};
        let userInfoId = locStorageUserInfo.id;
        let chapterIndex = null;

        for (let key = 0, len = _chapterContent.chapters.length; key < len; key++) {
            let item = _chapterContent.chapters[key];

            if (item.id == chapterId) {
                if (key >= _chapterContent.chapters.length - 1) {
                    chapterIndex = null;
                    Toast.info("没有下一章了", 1.5);
                    break;
                }
                chapterIndex = key + 1;
                break;
            }
        }
        if (chapterIndex) {
            console.log(chapterIndex);
            chapterId = _chapterContent.chapters[chapterIndex].id;
            locStorageProjectInfo[userInfoId][projectId].push(chapterId);
            that.props.setProjectInfoStatus(_projectInfo);
            locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));
        }


        that.refs.J_ChapterWrap.scrollTop = 0;
    }

    showReadTopbar() {
        let _redTopdom = this.refs._readTopbar;
        let _redBottomdom = this.refs._readBottombar;
        if(Env.isIOSShell) {
            _redTopdom.classList.toggle(this.topBarPositionOutCls);
        } else {
            _redTopdom.classList.toggle(this.topBarPositionOutCls);
        }

        _redBottomdom.classList.toggle('readPage__BottomBarPositionOut');
    }

    showChapterList() {
        this.refs.J_ChapterList.showChapterList();
    }

    likeHeart() {
        //作品点赞 埋点
        zhuge.track('作品点赞数');
        let _chapterContent = this.props.chapterContent.toJS();
        let url = FAVORITE_API + '?projectid=' + projectId;
        let method = '';
        if (_chapterContent.like) {
            method = 'DELETE';
        } else {
            method = 'PUT';
        }
        this.props.loadLike(url, method);
    }

    shareShow() {
        // let oldHref = window.location.href;
        // let lastIndex = oldHref.lastIndexOf('/') + 1;
        // let newHref = oldHref.substring(0, lastIndex) + chapterId;
        this.shareData.url = `https://${Env.shareHost}/share/index.html?project=${projectId}&chapter=${chapterId}`;
        this.shareData.title = this.chapterTitle;
        this.props.setShareStatus(this.shareData);
        this.refs.J_ShareBtnListRead.showShareLayer();
    }

    readStar() {
        //收藏埋点
        zhuge.track('作品收藏');
        let readStardom = this.refs._readStar;
        let method = '';
        let url = COLLECTION_API + projectId + '/project';

        if (readStardom.classList.contains('iconStaro')) {
            method = 'DELETE';
        } else {
            method = 'PUT';
        }

        this.props.loadCollection(url, method);
    }
    commentClick() {
        //查看评论数 埋点
        zhuge.track('查看评论数');   
    }

    processCont(_html) {
        // + img param
        const imgReg = /<img [^>]*>/gi;
        const srcReg = /src=['"]{1}([^'"]*)['"]{1}/gi;
        let imgs = _html.match(imgReg);

        if (imgs && imgs.length > 0) {
            let newImgs = imgs.map(function (img) {
                return img.replace(srcReg, function (v) {
                    return 'src=\"' + addImageParam(RegExp.$1, IMAGE_SIZE_TYPE.PORJ_CONTENT_IMG) + '\"';
                });
            });

            let index = 0;
            _html = _html.replace(imgReg, function () {
                return newImgs[index++];
            });
        }

        return _html;
    }

    render() {
        var props = this.props;
        var _chapterContent = props.chapterContent.toJS();
        //var projectInfo =  props.projectInfo.toJS();
        let authorAvatar = _chapterContent.authorAvatar ? addImageParam(IMG_CDN_PATH + _chapterContent.authorAvatar, IMAGE_SIZE_TYPE.AVATAR_SMALL) : '';
        let modifyTime = convertDate(_chapterContent.modifyTime);

        let processedCont = '';

        var chapterIndex = null;
        try {
            if (projectId && chapterId && _chapterContent.chapters && _chapterContent.chapters.length > 0) {

                _chapterContent.chapters.map(function (item, key) {
                    if (item.id == chapterId) {
                        chapterIndex = key;
                        return chapterIndex;  // ??? ...
                    }
                })
                // projectInfo.map(function(item, key) {
                // 	if(item.pid == projectId){
                // 		item.cid  = chapterId;
                // 		locStorage.set('projectInfo', JSON.stringify(projectInfo));
                // 	}
                // })

                if (chapterIndex !== null) {
                    let _authorMesdom = this.refs._authorMes;
                    if (chapterIndex === 0) {
                        if (_authorMesdom) {
                            _authorMesdom.classList.remove('hide');
                        }
                    } else {
                        if (_authorMesdom) {
                            _authorMesdom.classList.add('hide');
                        }
                    }
                    this.chapterList = _chapterContent.chapters[chapterIndex].content || '';
                    this.chapterTitle = _chapterContent.chapters[chapterIndex].title || '无题';

                    processedCont = this.processCont(this.chapterList || '');

                }
            }
        } catch (e) {
            console.log(e);
        }

        var collectionClass = (_chapterContent.collection ? 'iconStaro' : 'iconStar'); // 选择 : 未选择
        var likeClass = (_chapterContent.like ? (
            <img src='https://o82zr1kfu.qnssl.com/@/image/57c64c9fe4b073472e7954e7.png'></img>) : (
            <img src='https://o82zr1kfu.qnssl.com/@/image/57c6400be4b073472e79312f.png'></img>));

        var isEndChapter = (_chapterContent && _chapterContent.chapters && _chapterContent.chapters.length - 1 === chapterIndex);
        //文章被完全阅读次数 埋点
        if(isEndChapter) {
            zhuge.track('文章阅读');
        }
        return (
            <div className={`pageInner`}>
                <TopGapForIOS />
                <div ref="_readTopbar" className={`hasTransition ${styles.topbar} ${this.topBarPositionOutCls}`}>
                    <TopBar data-has-back="true">
                        <div data-title>
                            <div onClick={this.showChapterList.bind(this)} className={styles.chapterTitle}>
                                <span>{this.chapterTitle}</span>
                                <i className="iconDown"></i>
                            </div>
                            <div className={styles.rightStar}>
                                <i onClick={this.readStar.bind(this)} ref="_readStar"
                                   className={`${collectionClass}`}></i>
                            </div>
                        </div>
                        <div data-btns>
                            <span className={styles.share}></span>
                        </div>
                    </TopBar>
                </div>

                <ChapterList ref="J_ChapterList" items={this.props.chapterContent}/>

                <div id="J_ChapterWrap" ref="J_ChapterWrap" className={`${styles.chpWrap} mainContent whiteBg`}
                     onClick={this.showReadTopbar.bind(this)}>
                    <PullRefresh refreshCallback={this.prevChapterHandler.bind(this)}>
                    <div id="J_ChapterCont" ref="J_ChapterCont" className={styles.chpCon}>
                        <div ref="_authorMes" className={`${styles.authorMes} hide`}>
                            <img src={authorAvatar}/>
                            <span className={styles.left}>{_chapterContent.authorUserName}</span>
                            <span className={styles.right}>{modifyTime}更新</span>
                        </div>
                        <div className={styles.contentWrap}>
                            <div className={styles.contentTitle}>
                                {this.chapterTitle}
                            </div>
                            <div className={styles.contentMes}
                                 dangerouslySetInnerHTML={{__html: `${processedCont}`}}>
                            </div>
                            {/*<div className={styles.contentMes}*/}
                                 {/*dangerouslySetInnerHTML={{__html: `${this.chapterList}`}}>*/}
                            {/*</div>*/}
                            {/*<div className={styles.contentMes}>*/}
                                {/*{processedCont}*/}
                            {/*</div>*/}
                        </div>
                        {
                            (this.chapterList) ?
                                ((!isEndChapter) ?
                                        <div className={styles.bottomBtn}>
                                            <div ref="J_NextChapterBtn" data-hashover="true"
                                                 onClick={this.nextChapterHandler.bind(this)}
                                                 className={styles.nextChapterBtn}>下一章
                                            </div>
                                        </div>
                                        :
                                        <div className={styles.bottomBtn}>
                                            <div className={styles.lastChapterNotice}>已读完</div>
                                        </div>
                                ) : ''
                        }

                    </div>
                    </PullRefresh>
                </div>


                <div ref="_readBottombar" className={`${styles.bottomBar} hasTransition`}>
                    <ul>
                        <li onClick={this.commentClick.bind(this)}><Link to={`/comments/${projectId}#fliproute`}><i
                            className={styles.i1}></i><span>{_chapterContent.commentNumber || 0}</span></Link></li>
                        <li><i ref="_readLike" onClick={this.likeHeart.bind(this)}>
                            {likeClass}
                        </i></li>
                        <li><i onClick={this.shareShow.bind(this)} className={styles.i3}></i></li>
                    </ul>
                </div>
                <ShareBtnList ref="J_ShareBtnListRead" items={this.props.shareData}/>

            </div>
        )
    };
}

ReadContent.propTypes = {};

export default ReadContent;