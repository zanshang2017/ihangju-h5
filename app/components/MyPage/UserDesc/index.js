import React from 'react';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

import List from 'antd-mobile/lib/list';

function UserDesc(props) {

    var descHTML = '';
    var imageSrc = '';
    var userInfomation = props.userInfomation || {};
    var id = userInfomation.id;

    if (userInfomation.avatar) {
        imageSrc = addImageParam(IMG_CDN_PATH + userInfomation.avatar, IMAGE_SIZE_TYPE.AVATAR_BIG);
    }
    return (
        <List>
            <List.Body>
                <List.Item
                    onClick={props.clickHandler}
                    arrow="horizontal">
                    <div className={styles.descWrap}>
                        <div className={`${styles.image}`}>{
                            imageSrc ? <img src={imageSrc}/> : <div className={styles.noAvatar}></div>
                        }
                        </div>
                        <div className={styles.info}>
                            <div className={styles.username}>{userInfomation.name || ''}</div>
                            <div className={styles.intro}>{userInfomation.description || ''}</div>
                        </div>
                    </div>
                </List.Item>
            </List.Body>
        </List>
    );
}

UserDesc.propTypes = {};

export default UserDesc;


