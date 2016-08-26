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

    if(userInfo.avatar){
        imageSrc = IMG_CDN_PATH + userInfo.avatar;
    }

    return (
        <div>
            <List>
                <List.Item
                    onClick={props.clickHandler}
                    arrow="horizontal">
                    <div className={styles.descWrap}>
                        <div className={styles.image}><img src={imageSrc}/></div>
                        <div className={styles.info}>
                            <div className={styles.username}>{userInfo.nickName || ''}</div>
                            <div className={styles.intro}>{userInfo.description || ''}</div>
                        </div>
                    </div>
                </List.Item>
            </List>

        </div>
    );
}

UserDesc.propTypes = {

};

export default UserDesc;


