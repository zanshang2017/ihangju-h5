import React from 'react';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

function BannerInfo(props) {

    //if (!props.items) {
    //    return <div className={styles.bannerDesc}></div>;
    //}

    let imageSrc = IMG_CDN_PATH + '/image/578d9219e4b06674859033d4.jpg';

    let wrapStyle = {
        background: 'url(' + imageSrc + ') left top no-repeat'
    };

    let followText = <span className={styles.followed}><i className="iconfont icon-check"></i>已关注</span>; //<span>关注</span>

    let browseHTML = <div className={styles.bannerInfo} style={wrapStyle}>
                        <div className={styles.title}>收获</div>
                        <div className={styles.follow}>9999999人 已关注</div>
                        <div className={styles.followBtn}>{followText}</div>
                    </div>;

    return (
        browseHTML
    );
}

BannerInfo.propTypes = {
    //info: React.PropTypes.object
};

export default BannerInfo;


