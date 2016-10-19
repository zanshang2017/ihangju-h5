import React from 'react';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

import {convertDate} from '../../../utils/util.js';

function MessageListItem(props) {
    let item = props.item;
    let modifyTime = convertDate(item.modifyTime);

    let imageSrc = addImageParam(IMG_CDN_PATH + item.userAvatar, IMAGE_SIZE_TYPE.AVATAR);

    // "modifyTime": 1472535427961,
    // "userAvatar": "/static/random6.png",
    // "userName": "我的天",
    // "projectName": "",
    // "type": "favorite_user",
    // "userId": "56f1fb8de4b0bbf134d9cb57",
    // "projectId": ""

    let desc = ''

    switch (item.type) {
        case 'follow_project' :
            desc = '关注了你的作品' + '《' + (item.projectName || '') + '》';
            break;

        case 'project_update' :
            desc = '更新了作品' + '《' + item.projectName || '' + '》';
            break;

        case 'favorite_project' :
            desc = '喜欢了你的作品' + '《' + (item.projectName || '') + '》';
            break;

        case 'favorite_user' :
            desc = '关注了你';
            break;

        case 'tag_add_project' :
            desc = '新增了文章' + '《' + (item.projectName || '') + '》';
            break;
    }



    function clickHandler(e) {
        let id = e.currentTarget.dataset['id'];
        props.userClickHandler(id);
    }

    return (
        <div className={styles.listItem}>
            <div className={styles.item}>
                <div className={styles.avatar} data-id={item.userId} onClick={clickHandler}>
                    <img src={imageSrc}/>
                </div>
                <div className={styles.info}>
                    <h4>{item.userName}</h4>
                    <p>{desc}</p>
                </div>
                <div className={styles.time}>{modifyTime}</div>
            </div>
        </div>
    );
}

MessageListItem.propTypes = {};

export default MessageListItem;


