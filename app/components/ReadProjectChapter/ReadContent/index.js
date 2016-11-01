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

import {
    IMG_CDN_PATH,
    COLLECTION_API,
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE,
} from 'utils/util'

import Toast from 'antd-mobile/lib/toast';
import {Link} from 'react-router';
import _ from 'underscore';

var TRIGGER_PAGE_DIST = 150;// 滑动距离
// var TRIGGER_PAGE_DIST = document.documentElement.clientHeight / 5;// 滑动距离
// TRIGGER_PAGE_DIST = TRIGGER_PAGE_DIST > 160 ? 160 : TRIGGER_PAGE_DIST < 80 ? 80 : TRIGGER_PAGE_DIST;

var projectId = null;
var chapterId = null;
var superThis = null;

class ReadContent extends React.Component {
    constructor(props) {
        super(props);
        this.chapterTitle = '';
        this.chapterList = '';
        this.shareData = {};
    }

    componentWillMount() {
        if (this.props.routeParams) {
            projectId = this.props.routeParams.projectId;
            chapterId = this.props.routeParams.chapterId;
        }
        this.shareData = {
            url: `https://${Env.shareHost}/share/index.html?project=${projectId}&chapter=${chapterId}`,
            title: this.chapterTitle,
            content: '',
            imgSrc: IMG_CDN_PATH + 'image/5743b85fe4b00243fbd23456.jpg'
        }
        this.props.setShareStatus(this.shareData);
    }

    componentDidMount() {
        var that = this;
        superThis = this;

        this.nWrap = this.refs.J_ChapterWrap;
        this.nCont = this.refs.J_ChapterCont;

        that.resetScrollPage();

        // console.log(this.wrapH, this.wrapSH);

        this.scrollHanderBinded = _.throttle(this.scrollHandler.bind(this), 300, {leading: false});
        this.touchStartBinded = this.touchStartHandler.bind(this);
        this.nWrap.addEventListener('scroll', this.scrollHanderBinded);
        this.nWrap.addEventListener('touchstart', this.touchStartBinded);
    }

    componentDidUpdate() {
        this.resetScrollPage();
    }

    componentWillUnmount() {
        this.nWrap.removeEventListener('scroll', this.scrollHanderBinded);
        this.nWrap.removeEventListener('touchstart', this.touchStartBinded);
        this.nWrap.removeEventListener('touchmove', this.touchmoveHandler);
    }

    resetScrollPage() {
        var that = this;

        debugLog('reset');
        // this.nNextPull = this.refs.J_NextPull;
        this.wrapH = this.nWrap.getBoundingClientRect().height;
        this.wrapSH = this.nWrap.scrollHeight;
        this.isTouchTop = true;
        this.isTouchBottom = false;
        this.isMoveTop = false;
        this.isMoveBottom = false;
        this.isMoveTopComplete = false;
        this.isMoveBottomComplete = false;
        this.isTriggerTurnToPage = false;
        this.touchStartY = 0;
        this.isAddListener = false;

        this.nWrap.removeEventListener('touchend', this.touchendHandler);

        this.nCont.style.webkitTransform = 'translate3d(0, 0, 0)';
        this.nCont.style.transform = 'translate3d(0, 0, 0)';

        this.bindTouchMove();
    }

    scrollHandler(e) {
        var that = this;

        console.log(that.nWrap.scrollTop);
        that.isTouchTop = (that.nWrap.scrollTop == 0);
        that.isTouchBottom = that.nWrap.scrollTop + that.wrapH >= that.wrapSH - 10;

        debugLog('that.nWrap.scrollTop:' + that.nWrap.scrollTop + ' that.wrapH:' + that.wrapH)
        debugLog("that.isTouchTop:" + that.isTouchTop + " that.isTouchBottom:" + that.isTouchBottom);

        // if (that.isTouchTop || that.isTouchBottom) {
        //     debugLog('touch!');
        //     that.bindTouchMove();
        // }

        if (that.isTouchTop) {
            debugLog('touch!');
            that.bindTouchMove();
        }
    }

    bindTouchMove() {
        if (!this.isAddListener) {
            this.nWrap.addEventListener('touchmove', this.touchmoveHandler);
            this.isAddListener = true;
        }
    }

    touchStartHandler(e) {
        var that = this;
        that.isMoveComplete = false;
        that.touchStartY = e.touches[0].pageY;
        debugLog('touchStartY:' + that.touchStartY);
    }

    touchmoveHandler(e) {
        let that = superThis;
        let dist = that.touchStartY - e.touches[0].pageY;

        debugLog('touchStartY:' + that.touchStartY + ' pageY:' + e.touches[0].pageY);

        if (dist < 0) {
            that.isMoveTop = true;
            that.isMoveBottom = false;
        } else {
            that.isMoveTop = false;
            that.isMoveBottom = true;
        }

        if ((that.isTouchTop && that.isMoveBottom) || (that.isTouchBottom && that.isMoveTop)) {
            debugLog('方向相反,解绑!');
            console.log('方向相反,解绑!');
            that.nWrap.removeEventListener('touchmove', that.touchmoveHandler);
            that.isAddListener = false;
            return;
        }

        that.nWrap.addEventListener('touchend', that.touchendHandler);
        console.log('dist:', Math.abs(dist));

        that.isMoveTopComplete = dist < -TRIGGER_PAGE_DIST;
        that.isMoveBottomComplete = dist > TRIGGER_PAGE_DIST;


        if ((that.isMoveTopComplete || that.isMoveBottomComplete)) {
            if (!that.isTriggerTurnToPage) {
                let _chapterContent = that.props.chapterContent.toJS();
                let _projectInfo = that.props.projectInfo.toJS();
                let locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
                let chapterIndex = null;

                that.isMoveComplete = true;

                if (that.isTouchTop && that.isMoveTopComplete) {
                    debugLog('上一页');

                    for (let key = 0, len = _chapterContent.chapters.length; key < len; key++) {
                        let item = _chapterContent.chapters[key];

                        if (item.id == chapterId) {
                            if (key == 0) {
                                chapterIndex = null;
                                Toast.info("没有上一章了", 1.5);
                                break;
                            }
                            chapterIndex = key - 1;
                            break;
                        }
                    }

                    if (chapterIndex || chapterIndex === 0) {
                        chapterId = _chapterContent.chapters[chapterIndex].id;
                        locStorageProjectInfo[projectId].push(chapterId);
                        that.props.setProjectInfoStatus(_projectInfo);
                        locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));

                        that.nWrap.scrollTop = 0;
                        that.resetScrollPage();
                    }

                    that.isTriggerTurnToPage = true;
                    setTimeout(function () {
                        that.isTriggerTurnToPage = false;
                    }, 1.5 * 1e3);

                }

                // if (that.isTouchBottom && that.isMoveBottomComplete) {
                //     debugLog('下一页');
                //
                //     for (let key = 0, len = _chapterContent.chapters.length; key < len; key++) {
                //         let item = _chapterContent.chapters[key];
                //
                //         if (item.id == chapterId) {
                //             if (key >= _chapterContent.chapters.length - 1) {
                //                 chapterIndex = null;
                //                 Toast.info("没有下一章了", 1.5);
                //                 break;
                //             }
                //             chapterIndex = key + 1;
                //             break;
                //         }
                //     }
                //
                //     if (chapterIndex) {
                //         console.log(chapterIndex);
                //         chapterId = _chapterContent.chapters[chapterIndex].id;
                //         locStorageProjectInfo[projectId].push(chapterId);
                //         that.props.setProjectInfoStatus(_projectInfo);
                //         locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));
                //
                //         that.nWrap.scrollTop = 0;
                //         that.resetScrollPage();
                //     }
                //
                //     that.isTriggerTurnToPage = true;
                //     setTimeout(function () {
                //         that.isTriggerTurnToPage = false;
                //     }, 1.5 * 1e3);
                // }
            }
        } else { // 未达触发翻页的距离,添加拖动动画
            let _dist = -(dist / 2);
            that.nCont.style.webkitTransform = 'translate3d(0, ' + (_dist) + 'px, 0)';
            that.nCont.style.transform = 'translate3d(0, ' + (_dist) + 'px, 0)';
        }

        debugLog(e.touches[0].pageY + ":" + e.touches[0].clientY);
        e.preventDefault();
    }

    touchendHandler(e) {
        var that = superThis;
        that.nCont.classList.add('hasTransition');
        that.nCont.style.webkitTransform = 'translate3d(0, 0, 0)';
        that.nWrap.removeEventListener('touchend', that.touchendHandler);
        setTimeout(function () {
            that.nCont.classList.remove('hasTransition');
        }, 500);
    }

    nextChapterHandler(e) {
        e.preventDefault();
        e.stopPropagation();

        let that = this;

        let _chapterContent = that.props.chapterContent.toJS();
        let _projectInfo = that.props.projectInfo.toJS();
        let locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
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
            locStorageProjectInfo[projectId].push(chapterId);
            that.props.setProjectInfoStatus(_projectInfo);
            locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));

            that.nWrap.scrollTop = 0;
            that.resetScrollPage();
        }
    }

    showReadTopbar() {
        let _redTopdom = this.refs._readTopbar;
        let _redBottomdom = this.refs._readBottombar
        _redTopdom.classList.toggle('hide');
        _redBottomdom.classList.toggle('hide');
    }

    showChapterList() {
        this.refs.J_ChapterList.showChapterList();
    }

    likeHeart() {
        let _chapterContent = this.props.chapterContent.toJS();
        let url = COLLECTION_API + projectId + '/project';
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
        this.shareData.url = `https://${Env.shareHost}/share/index.html?project=${projectId}&chapter=${chapterId}`,
            this.shareData.title = this.chapterTitle;
        this.props.setShareStatus(this.shareData);
        this.refs.J_ShareBtnListRead.showShareLayer();
    }

    readStar() {
        let readStardom = this.refs._readStar;
        let method = '';
        let url = COLLECTION_API + projectId + '/project';

        if (readStardom.classList.contains('iconStaro')) {
            method = 'PUT';
        } else {
            method = 'DELETE';
        }

        this.props.loadCollection(url, method);
    }

    render() {
        var props = this.props;
        var _chapterContent = props.chapterContent.toJS();
        //var projectInfo =  props.projectInfo.toJS();
        let authorAvatar = addImageParam(IMG_CDN_PATH + _chapterContent.authorAvatar, IMAGE_SIZE_TYPE.AVATAR_SMALL);
        let modifyTime = convertDate(_chapterContent.modifyTime)
        var chapterIndex = null;
        try {
            if (projectId && chapterId && _chapterContent.chapters && _chapterContent.chapters.length > 0) {
                _chapterContent.chapters.map(function (item, key) {
                    if (item.id == chapterId) {
                        chapterIndex = key;
                        return chapterIndex;
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
                    this.chapterTitle = _chapterContent.chapters[chapterIndex].title || '';
                }
            }
        } catch (e) {
        }
        var collectionClass = (_chapterContent.collection ? 'iconStaro' : 'iconStar');
        var likeClass = (_chapterContent.like ? (
            <img src='https://o82zr1kfu.qnssl.com/@/image/57c64c9fe4b073472e7954e7.png'></img>) : (
            <img src='https://o82zr1kfu.qnssl.com/@/image/57c6400be4b073472e79312f.png'></img>));

        return (
            <div className="pageInner">
                <div ref="_readTopbar" className="hide">
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

                <div id="J_ChapterWrap" ref="J_ChapterWrap" className={`${styles.chpWrap} mainContent`}
                     onClick={this.showReadTopbar.bind(this)}>
                    <div id="J_ChapterCont" ref="J_ChapterCont" className={styles.chpCon}
                    >
                        <div ref="J_PreviourPull" className={styles.toPreviourPageNotice}><i
                            className={styles.loading}></i>加载上一章
                        </div>

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
                                 dangerouslySetInnerHTML={{__html: `${this.chapterList}`}}>
                            </div>
                        </div>
                        <div ref="J_NextChapterBtn" data-hashover="true" onClick={this.nextChapterHandler.bind(this)}
                             className={styles.nextChapterBtn}>下一章
                        </div>
                        {/*<div ref="J_NextPull" className={styles.toNextPageNotice}><i className={styles.loading}></i>加载下一章</div>*/}
                    </div>


                </div>
                <div ref="_readBottombar" className={`${styles.bottomBar} hide`}>
                    <ul>
                        <li><Link to={`/comments/${projectId}#fliproute`}><i
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