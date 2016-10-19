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
    var userInfo = props.userInfo || {};
    var id = userInfo.id;

    if (userInfo.avatar) {
        imageSrc = addImageParam(IMG_CDN_PATH + userInfo.avatar, IMAGE_SIZE_TYPE.AVATAR_BIG);
    }

    return (
        <List>
            <List.Body>
                <List.Item
                    onClick={props.clickHandler}
                    arrow="horizontal">
                    <div className={styles.descWrap}>
                        <div className={styles.image}>{
                            imageSrc ? <img src={imageSrc}/> : ''
                        }
                        </div>
                        <div className={styles.info}>
                            <div className={styles.username}>{userInfo.nickName || ''}</div>
                            <div className={styles.intro}>{userInfo.description || ''}</div>
                        </div>
                    </div>
                </List.Item>
            </List.Body>
        </List>
    );
}

UserDesc.propTypes = {};

export default UserDesc;


