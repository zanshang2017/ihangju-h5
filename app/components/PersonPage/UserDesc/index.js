import React from 'react';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

function UserDesc(props) {

    var descHTML = '';
    var imageSrc = '';
    var personInfo = props.personInfo || {};
    var id = personInfo.id;

    if (personInfo.avatar) {
        imageSrc = addImageParam(IMG_CDN_PATH + personInfo.avatar, IMAGE_SIZE_TYPE.AVATAR_BIG);
    }

    return (
        <div className={styles.descWrap}>
            <div className={styles.row}>
                <img className={styles.avatar} src={imageSrc}/>
            </div>
            <div className={styles.row}>
                <p className={styles.username}>
                    {personInfo.nickName}
                </p>
            </div>
            <div className={styles.row}>
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={props.fansClickHandler}><strong>{personInfo.fansNumber || 0}</strong><span>粉丝</span></button>
                    <span className={styles.divider}>|</span>
                    <button className={styles.btn} onClick={props.followsClickHandler}><strong>{personInfo.attentionNumber || 0}</strong><span>关注</span></button>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.description}>{personInfo.description}</p>
            </div>
        </div>
    );
}

UserDesc.propTypes = {};

export default UserDesc;


