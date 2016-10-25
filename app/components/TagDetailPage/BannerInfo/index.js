import React from 'react';

import styles from './styles.css';

import ImageUpload from 'components/common/ImageUpload';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

class BannerInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.refs.J_ImageUpload.hideSheet();
    }

    showEditBannerImageSheet() {
        this.refs.J_ImageUpload.showSheet();
    }

    onImageUploadComplete(base64Img) {
        // alert(base64Img.substring(20, 20));
    }

    render() {
        let browseHTML = <div className={styles.bannerInfo}></div>;

        if (this.props.detail) {
            let detail = this.props.detail;
            let _image = '';

            if (detail.tag_image.indexOf('data:image') == 0) {
                _image = detail.tag_image;
            } else {
                _image = addImageParam(IMG_CDN_PATH + detail.tag_image, IMAGE_SIZE_TYPE.TAG_IMAGE);
            }

            let wrapStyle = {
                backgroundImage: 'url(' + _image + ')'
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
                editBannerImage =
                    <div className={styles.editBannerImage} onClick={this.showEditBannerImageSheet.bind(this)}>
                        更换图片
                    </div>;
            }

            browseHTML = <div className={`${styles.bannerInfo} blockGap`} style={wrapStyle}>
                <div className={styles.title}>{detail.tag_name}</div>
                <div className={styles.follow}>{detail.attention_number}人 已关注</div>
                {followText}
                {editBannerImage}
                <ImageUpload ref="J_ImageUpload" onUploadComplete={this.props.editBannerImageHandler.bind(this)} />
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


