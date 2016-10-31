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

var x = null;
var y = null;

const AREA = {
    HEAD: 'head',
    FOOT: 'foot'
};
var moveArea = '';

const TRIGGER_PAGE_DIST = 20;// 滑动距离

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

        that.resetScrollPage();

        // console.log(this.wrapH, this.wrapSH);

        this.nWrap.addEventListener('scroll', function (e) {
            console.log(that.nWrap.scrollTop);
            that.isTouchTop = (that.nWrap.scrollTop == 0);
            that.isTouchBottom = that.nWrap.scrollTop + that.wrapH >= that.wrapSH - 10;

            debugLog('that.nWrap.scrollTop:' + that.nWrap.scrollTop + ' that.wrapH:' + that.wrapH)
            debugLog("that.isTouchTop:" + that.isTouchTop + " that.isTouchBottom:" + that.isTouchBottom);

            if (that.isTouchTop || that.isTouchBottom) {
                debugLog('touch!');
                if (!that.isAddListener) {
                    that.nWrap.addEventListener('touchmove', that.touchmoveHandler);
                    that.isAddListener = true;
                }
            }
        });

        this.nWrap.addEventListener('touchstart', function (e) {
            that.touchStartY = e.touches[0].pageY;
            debugLog('touchStartY:' + that.touchStartY);
        });

        // var nwrap = that.refs.J_ChapterCont;
        // nwrap.addEventListener("touchstart", that.tStart.bind(that), false);
        // nwrap.addEventListener("touchmove", that.tMove.bind(that), false);
        // nwrap.addEventListener("touchend", that.tEnd.bind(that), false);
    }

    componentDidUpdate() {
        // alert('did Update!');
        this.resetScrollPage();
    }

    resetScrollPage() {
        debugLog('reset');
        this.nWrap = this.refs.J_ChapterWrap;
        // this.nCont = this.refs.J_ChapterCont;
        this.wrapH = this.nWrap.getBoundingClientRect().height;
        this.wrapSH = this.nWrap.scrollHeight;
        this.isTouchTop = true;
        this.isTouchBottom = false;
        this.isMoveTop = false;
        this.isMoveBottom = false;
        this.isMoveTopComplete = false;
        this.isMoveBottomComplete = false;
        this.touchStartY = 0;
        this.isAddListener = false;

        this.nWrap.removeEventListener('touchmove', this.touchmoveHandler);
    }

    touchmoveHandler(e) {
        let that = superThis;
        let dist = that.touchStartY - e.touches[0].pageY;
        debugLog('dist:' + dist + ' touchStartY:' + that.touchStartY + ' pageY:' + e.touches[0].pageY);

        if (dist < 0) {
            that.isMoveTop = true;
            that.isMoveBottom = false;
        } else {
            that.isMoveTop = false;
            that.isMoveBottom = true;
        }

        that.isMoveTopComplete = dist < 0 && dist < -TRIGGER_PAGE_DIST;
        that.isMoveBottomComplete = dist > 0 && dist > TRIGGER_PAGE_DIST;

        if (that.isMoveTopComplete || that.isMoveBottomComplete) {
            let _chapterContent = that.props.chapterContent.toJS();
            let _projectInfo = that.props.projectInfo.toJS();
            let locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
            let chapterIndex = null;

            if (that.isTouchTop) {
                if (that.isMoveTopComplete) {
                    debugLog('上一页');
                    that.nWrap.removeEventListener('touchmove', that.touchmoveHandler);
                    that.isAddListener = false;

                    for (let key = 0, len = _chapterContent.chapters.length; key < len; key++) {
                        let item = _chapterContent.chapters[key];

                        if (item.id == chapterId) {
                            if (key == 0) {
                                chapterIndex = null;
                                Toast.info("没有上一章节了", 1.5);
                                return;
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
                    }
                }

                if (that.isMoveBottom) {
                    that.nWrap.removeEventListener('touchmove', that.touchmoveHandler);
                    that.isAddListener = false;
                }
            }

            if (that.isTouchBottom) {
                if(that.isMoveBottomComplete) {
                    debugLog('下一页');
                    that.nWrap.removeEventListener('touchmove', that.touchmoveHandler);
                    that.isAddListener = false;

                    for (let key = 0, len = _chapterContent.chapters.length; key < len; key++) {
                        let item = _chapterContent.chapters[key];

                        if (item.id == chapterId) {
                            if (key >= _chapterContent.chapters.length - 1) {
                                chapterIndex = null;
                                Toast.info("没有下一章了", 1.5);
                                return;
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
                    }
                }

                if (that.isMoveTop) {
                    that.nWrap.removeEventListener('touchmove', that.touchmoveHandler);
                    that.isAddListener = false;
                }
            }

        }

        debugLog(e.touches[0].pageY + ":" + e.touches[0].clientY);
        e.preventDefault();
    }

    // tStart(event) {
    //
    //     debugLog('Start <<<<<<<<<<<');
    //     var nwrap = this.refs.J_ChapterWrap;
    //     var ncont = this.refs.J_ChapterCont;
    //     var ncontH = ncont.getBoundingClientRect().height;
    //     var nwrapH = nwrap.getBoundingClientRect().height;
    //     var touches = event.targetTouches;
    //
    //     if (touches.length == 1) {
    //         x = touches[0].pageX;
    //         y = touches[0].pageY;
    //
    //         // debugLog('start:' + y);
    //         console.log((nwrap.scrollTop + nwrapH) + ":" + ncontH);
    //         // debugLog(nwrap.scrollTop + '==' + (nwrap.scrollHeight - nwrapH) + '(' +nwrap.scrollHeight + '-' + nwrapH + ')');
    //
    //         if (nwrap.scrollTop == 0) {
    //             moveArea = AREA.HEAD;
    //         } else if ((nwrap.scrollTop + nwrapH) + 5 >= ncontH) {
    //             // } else if (Math.abs(nwrap.scrollHeight - nwrap.scrollTop - nwrapH) < 5) {
    //             moveArea = AREA.FOOT;
    //         } else {
    //             moveArea = '';
    //         }
    //     } else {
    //         moveArea = '';
    //     }
    //
    //     debugLog('moveArea:' + moveArea);
    //     console.log('moveArea:' + moveArea);
    // }
    //
    // tMove(event) {
    //     if (moveArea) {
    //         event.preventDefault();
    //         debugLog('move');
    //
    //         var that = this;
    //         var touches = event.targetTouches;
    //
    //         if (touches.length == 1) {
    //             var y1 = touches[0].pageY;
    //             var dist = y - y1;
    //             var nwrap = this.refs.J_ChapterWrap;
    //             var nwrapH = nwrap.getBoundingClientRect().height;
    //             var key = 0;
    //             var len = 0;
    //
    //             debugLog('move:' + dist);
    //             // console.log(dist);
    //
    //             var toNext = dist > 0 && dist > TRIGGER_PAGE_DIST && moveArea === AREA.FOOT,
    //                 toPrevious = dist < 0 && dist < -TRIGGER_PAGE_DIST && moveArea === AREA.HEAD;
    //
    //             if (toNext || toPrevious) {
    //
    //                 toNext && alert('toNext!');
    //                 toPrevious && alert('toPrevious!');
    //
    //                 moveArea = '';
    //
    //                 console.log('in moveY:', y - y1);
    //                 console.log(nwrap.scrollTop + ":" + nwrapH);
    //
    //                 let _chapterContent = this.props.chapterContent.toJS();
    //                 let _projectInfo = this.props.projectInfo.toJS();
    //                 let locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
    //                 let chapterIndex = null;
    //
    //                 // let projectInfoKey = null;
    //                 //  _projectInfo.map(function(item, key) {
    //                 // 	if(item.pid == projectId){
    //                 // 		projectInfoKey = key;
    //                 // 	}
    //                 // })
    //
    //                 if (toNext) {
    //                     for (key = 0, len = _chapterContent.chapters.length; key < len; key++) {
    //                         let item = _chapterContent.chapters[key];
    //
    //                         if (item.id == chapterId) {
    //                             if (key >= _chapterContent.chapters.length - 1) {
    //                                 chapterIndex = null;
    //                                 Toast.info("没有下一章了", 1.5);
    //                                 return;
    //                             }
    //                             chapterIndex = key + 1;
    //                             break;
    //                         }
    //                     }
    //
    //                     if (chapterIndex) {
    //                         console.log(chapterIndex);
    //                         chapterId = _chapterContent.chapters[chapterIndex].id;
    //                         locStorageProjectInfo[projectId].push(chapterId);
    //                         that.props.setProjectInfoStatus(_projectInfo);
    //                         locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));
    //
    //                         nwrap.scrollTop = 0;
    //                     }
    //                 }
    //
    //                 if (toPrevious) {
    //                     for (key = 0, len = _chapterContent.chapters.length; key < len; key++) {
    //                         let item = _chapterContent.chapters[key];
    //
    //                         if (item.id == chapterId) {
    //                             if (key == 0) {
    //                                 chapterIndex = null;
    //                                 Toast.info("没有上一章节了", 1.5);
    //                                 return;
    //                             }
    //                             chapterIndex = key - 1;
    //                             break;
    //                         }
    //                     }
    //
    //                     if (chapterIndex || chapterIndex === 0) {
    //                         chapterId = _chapterContent.chapters[chapterIndex].id;
    //                         locStorageProjectInfo[projectId].push(chapterId);
    //                         that.props.setProjectInfoStatus(_projectInfo);
    //                         locStorage.set('projectInfo', JSON.stringify(locStorageProjectInfo));
    //
    //                         nwrap.scrollTop = 0;
    //                     }
    //                 }
    //             }
    //
    //         }
    //     }
    // }
    //
    // tEnd(event) {
    //     debugLog('End >>>>>>>>>>>>>');
    // }

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
        var collectionClass = (_chapterContent.collection ? 'iconStar' : 'iconStaro');
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

                <div id="J_ChapterWrap" ref="J_ChapterWrap" className="mainContent" onClick={this.showReadTopbar.bind(this)}>
                    <div id="J_ChapterCont" ref="J_ChapterCont" className={styles.chpCon}
                         >
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
                                 dangerouslySetInnerHTML={{__html: `${this.chapterList}`}}/>
                        </div>
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