import React from 'react';

import styles from './styles.css';

import {convertDate} from '../../../utils/util.js';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

/**
 * 作品列表-样式2
 *
 * 不显示更新人,带阅读数
 *
 * @param props
 * @returns {XML}
 * @constructor
 */

function ArticleListItem3(props) {
    let item = props.item;

    let modifyTime = convertDate(item.modifyTime);
    let authorAvatar = addImageParam(IMG_CDN_PATH + item.authorAvatar, IMAGE_SIZE_TYPE.AVATAR_SMALL);

    // "modifyTime": 1472177758308,
    // "authorName": "门神4",
    // "description": "",
    // "browseNumber": 95,
    // "followNumber": 0,
    // "projectName": "new12",
    // "authorId": "571dab71e4b0d50d21e7a9fc",
    // "projectId": "57a2e571e4b081dc933f733f",
    // "likeNumber": 0,
    // "authorAvatar": "/image/571df9f4e4b00659abde343d.jpg"

    return (
        <div className={styles.articleListItem3} data-id={item.projectId} onClick={props.articleClickHandler}>
            <div className={styles.header}>
                <div className={styles.author} data-id={item.authorId} onClick={props.authorClickHandler}>
                    <img src={authorAvatar}/>
                    <span>{item.authorName}</span>
                </div>
                <span className={styles.modifyTime}>{modifyTime}</span>
            </div>
            <h3>{item.projectName}</h3>
            <div className={styles.info}>
                <span>阅读 {item.browseNumber || 0}</span>
                <span>喜欢 {item.likeNumber || 0}</span>
                <span>关注 {item.followNumber || 0}</span>
            </div>
        </div>
    );
}

ArticleListItem3.propTypes = {};

export default ArticleListItem3;


