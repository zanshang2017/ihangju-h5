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

function CommentListItem(props) {
    let item = props.item;
    let time = convertDate(item.time, 'YYYY-MM-DD hh:mm:ss');

    let imageSrc = addImageParam(IMG_CDN_PATH + item.user.avatar, IMAGE_SIZE_TYPE.AVATAR);

    // time": 1473065741681,
    // "projectName": "收藏夹",
    // "type": "comment" || "answer"
    // "user": {
    //     "name": "门神4",
    //     "id": "571dab71e4b0d50d21e7a9fc",
    //     "avatar": "/image/57c7e146e4b0ddd2e19eff99.jpg"
    // },
    // "projectId": "57956e59e4b019e1f4c15112",
    // "project_is_delete": false,
    // "content": "ooooo"

    let projNameHtml = '';
    let contentHtml = '';

    if (item.projectName) {
        projNameHtml = <div className={styles.projName}>
            《{item.projectName}》
        </div>
    }

    if (item.type === 'answer') {
        contentHtml = <div className={styles.comment}>回复了你: <span>{item.content}</span></div>;
    } else {
        contentHtml = <div className={styles.comment}><span>{item.content}</span></div>;
    }
    function clickHandler(e) {
        var id = e.currentTarget.dataset['id'];
        props.commentClickHandler(id);
    }

    return (
        <div className={styles.listItem} data-id={item.projectId} onClick={clickHandler}>
            <div className={styles.item}>
                <div className={styles.avatar}>
                    <img src={imageSrc}/>
                </div>
                <div className={styles.info}>
                    <h4>{item.user.name}</h4>
                    <p>{time}</p>
                </div>
            </div>
            {contentHtml}
            {projNameHtml}
        </div>
    );
}

CommentListItem.propTypes = {};

export default CommentListItem;


