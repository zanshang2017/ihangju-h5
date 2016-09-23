import React from 'react';

import styles from './styles.css';

import ActionSheet from 'antd-mobile/lib/action-sheet';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

class BannerInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initFileReader();
    }

    initFileReader() {
        // debugger;

        let that = this;
        let _file = this.refs.J_CameraFile;

        let rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

        this.oFReader = new FileReader();

        this.oFReader.onload = function (oFREvent) {
            console.log('onload!');
            that.props.editBannerImageHandler(oFREvent.target.result);
            // document.getElementById("uploadPreview").src = oFREvent.target.result;
        };

        this.oFReader.onloadstart = function (e) {
            console.log('loadstart.');
        }

        this.oFReader.onloadprogress = function (e) {
            console.log('loading...');
        }

        this.oFReader.onloadend = function (e) {
            console.log('loadend.');
        }

        _file.addEventListener('change', function loadImageFile() {
            if (_file.files.length === 0) {
                return;
            }
            var oFile = _file.files[0];
            // 图片
            that.oFReader.readAsDataURL(oFile);
        });
    }

    showEditBannerImageSheet() {
        let that = this;
        const BUTTONS = ['拍照', '从相册选区', '取消'];

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                title: '上传图片',
                message: '请从下面选择您的图片来源',
                maskClosable: true,
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        alert('拍照');
                        break;
                    case 1:
                        that.showImageSelector();
                        break;
                    default:
                        break;
                }

            });
    }

    showImageSelector() {
        let _file = this.refs.J_CameraFile;
        _file.dispatchEvent(new MouseEvent('click'));
    }

    render() {
        let browseHTML = <div className={styles.bannerInfo}></div>;

        if (this.props.detail) {
            let detail = this.props.detail;
            let _image = '';

            if (detail.tag_image.indexOf('data:image') == 0) {
                _image = detail.tag_image;
            } else {
                _image = IMG_CDN_PATH + detail.tag_image;
            }

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
                editBannerImage =
                    <div className={styles.editBannerImage} onClick={this.showEditBannerImageSheet.bind(this)}>
                        更换图片
                    </div>;
            }

            browseHTML = <div className={styles.bannerInfo} style={wrapStyle}>
                <div className={styles.title}>{detail.tag_name}</div>
                <div className={styles.follow}>{detail.attention_number}人 已关注</div>
                {followText}
                {editBannerImage}
                <input type="file" ref="J_CameraFile" accept="image/png,image/jpeg,image/jpg,image/gif"
                       capture="camera" id="cameraFile"
                       className="hide"/>
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


