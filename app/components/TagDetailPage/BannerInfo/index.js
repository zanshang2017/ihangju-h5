import React from 'react';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

export class BannerInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    showImageSelector() {
        let _file = this.refs.J_CameraFile;
        _file.dispatchEvent(new MouseEvent('click'));
    }

    render() {
        let browseHTML = <div className={styles.bannerInfo}></div>;

        if (this.props.detail) {
            let detail = this.props.detail;
            let _image = IMG_CDN_PATH + detail.tag_image;

            let wrapStyle = {
                background: 'url(' + _image + ') left top no-repeat',
                backgroundSize: 'cover'
            };

            let followText = '';
            let editBannerImage = '';

            if (detail.isFollow) {
                followText =
                    <div className={styles.followBtn} onClick={this.props.cancelSubTagHandler}><span
                        className={styles.followed}><i
                        className="iconfont icon-check"></i>已关注</span></div>;
            } else {
                followText =
                    <div className={styles.followBtn} onClick={this.props.subTagHandler}><span
                        className={styles.followed}>关注</span></div>;
            }

            if (this.props.isEditing) {
                editBannerImage = <div className={styles.editBannerImage} onClick={this.showImageSelector.bind(this)}>
                    更换图片
                    <input type="file" ref="J_CameraFile" accept="image/*" capture="camera" id="cameraFile"
                           className="hide"/>
                </div>;
            }

            browseHTML = <div className={styles.bannerInfo} style={wrapStyle}>
                <div className={styles.title}>{detail.tag_name}</div>
                <div className={styles.follow}>{detail.attention_number}人 已关注</div>
                {followText}
                {editBannerImage}
            </div>;
        }

        return (
            browseHTML
        )

    }


}

BannerInfo.propTypes = {
    detail: React.PropTypes.object,
    subTagHandler: React.PropTypes.func,
    cancelSubTagHandler: React.PropTypes.func,
    editBannerImageHandler: React.PropTypes.func
};

export default BannerInfo;


