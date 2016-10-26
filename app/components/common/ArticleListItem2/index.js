import React from 'react';

import styles from './styles.css';

// import {convertDate} from '../../../utils/util.js';

/**
 * 作品列表-样式2
 *
 * 不显示更新人,带阅读数
 *
 * @param props
 * @returns {XML}
 * @constructor
 */

function ArticleListItem2(props) {
    let item = props.item;

    // "projectId": "57396352e4b09ee3fd82c27d",
    // "projectName": "行距使用说明书",
    // "description": "这个指南可以帮助你了解如何使用行距",
    // "browseNumber": 282,
    // "commentNumber": 5,
    // "modifyTime": 1465885172831,
    // "appreciateNumber": 0,
    // "projectIsDelete": false,
    // "image": "/image/573962ebe4b0a12f0a7e4b43.png?imageMogr2/thumbnail/!21.484375p/crop/!277x365.4861111111111a86a45",
    // "hasTutor": true,
    // "tutorId": "571dab71e4b0d50d21e7a9fc",
    // "likeNumber": 9

    return (
        <div className={styles.articleListItem2} data-id={item.projectId} data-hashover="true" onClick={props.articleClickHandler}>
            <h3>{item.projectName}</h3>
            <p>{item.description}</p>
            <div className={styles.info}>
                <div className="fl">
                    <span className="like"><i className="iconfont icon-hearto"></i> {item.likeNumber}</span>
                    <span className="comment"><i className="iconfont icon-message"></i> {item.commentNumber}</span>
                </div>
                <div className="read fr">阅读 {item.browseNumber || 0}</div>
            </div>
        </div>
    );
}

ArticleListItem2.propTypes = {};

export default ArticleListItem2;


