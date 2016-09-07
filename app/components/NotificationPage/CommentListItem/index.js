import React from 'react';

import styles from './styles.css';

import {convertDate} from '../../../utils/util.js';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

function CommentListItem(props) {
    let that = this;
    let item = props.item;
    let time = convertDate(item.time, 'YYYY-MM-DD hh:mm:ss');

    let imageSrc = IMG_CDN_PATH + item.user.avatar;

    // time": 1473065741681,
    // "projectName": "收藏夹",
    //     "type": "comment",
    //     "user": {
    //     "name": "门神4",
    //         "id": "571dab71e4b0d50d21e7a9fc",
    //         "avatar": "/image/57c7e146e4b0ddd2e19eff99.jpg"
    // },
    // "projectId": "57956e59e4b019e1f4c15112",
    // "project_is_delete": false,
    // "content": "ooooo"

    let projNameHtml = '';
    if (item.projectName) {
        projNameHtml = <div className={styles.projName}>
            《{item.projectName}》
        </div>
    }

    function clickHandler(e){
        var id = e.currentTarget.dataset['id'];
        props.commentClickHandler(id);
    }

    return (
        <div className={styles.listItem}>
            <div className={styles.item} data-id={item.projectId} onClick={clickHandler}>
                <div className={styles.avatar}>
                    <img src={imageSrc}/>
                </div>
                <div className={styles.info}>
                    <h4>{item.user.name}</h4>
                    <p>{time}</p>
                </div>
            </div>
            <div className={styles.comment}>
                回复了你: <span>{item.content}</span>
            </div>
            {projNameHtml}
        </div>
    );
}

CommentListItem.propTypes = {};

export default CommentListItem;


