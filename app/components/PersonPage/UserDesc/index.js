import React from 'react';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import List from 'antd-mobile/lib/list';

function UserDesc(props) {

    var descHTML = '';
    var imageSrc = '';
    var userInfo = props.userInfo || {};
    var id = userInfo.id;

    if (userInfo.avatar) {
        imageSrc = IMG_CDN_PATH + userInfo.avatar;
    }

    return (
        <div className={styles.descWrap}>
            <div className={styles.row}>
                <img className={styles.avatar} src={imageSrc}/>
            </div>
            <div className={styles.row}>
                <p className={styles.username}>
                    {userInfo.nickName}
                </p>
            </div>
            <div className={styles.row}>
                <div className={styles.btns}>
                    <button className={styles.btn}><strong>{userInfo.fansNumber || 0}</strong><span>粉丝</span></button>
                    <span className={styles.divider}>|</span>
                    <button className={styles.btn}><strong>{userInfo.attentionNumber || 0}</strong><span>关注</span></button>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.description}>{userInfo.description}</p>
            </div>
        </div>
    );
}

UserDesc.propTypes = {};

export default UserDesc;


