import React from 'react';

import ActionSheet from 'antd-mobile/lib/action-sheet';

import {uploadImage} from 'utils/upload';

import bridge from 'utils/bridge'

import Toast from 'antd-mobile/lib/toast';


class ImageUpload extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._albumFile = this.refs.J_AlbumFile;
        this._cameraFile = this.refs.J_CameraFile;

        this.installFileReader();
    }

    componentWillUnmount() {
        this.uninstallFileReader();
    }

    installFileReader() {
        let that = this;

        this._fileReader = new FileReader();

        that._fileReader.onload = function (oFREvent) {
            console.log('onload!');
            // alert(oFREvent.target.result.length);
            // upload(oFREvent.target.result);
        };

        that._fileReader.onloadstart = function (e) {
            console.log('loadstart.');
        };

        that._fileReader.onloadprogress = function (e) {
            console.log('loading...');
        };

        that._fileReader.onloadend = function (e) {
            console.log('loadend.');
        };

        that._fileReader.onerror = function (e) {
            console.log('onerror.');
        };

        this._albumFile.addEventListener('change', this.loadAlbumFileHandler.bind(this));
        this._cameraFile.addEventListener('change', this.loadCameraFileHandler.bind(this));
    }

    loadAlbumFileHandler() {
        if (this._albumFile.files.length === 0) {
            return;
        }

        Toast.loading('上传中,请稍后...');

        var that = this;
        var oFile = this._albumFile.files[0];

        uploadImage(oFile).then(function (imgUrl) {
            // console.log('上传成功!' + imgUrl);
            try {
                Toast.hide();
            }catch(e){
            }

            Toast.success('上传成功!', 2);
            that.props.onUploadComplete && that.props.onUploadComplete(imgUrl);
        }, function (error) {
            console.log('上传失败!');

            try {
                Toast.hide();
            }catch(e){
            }

            Toast.fail('上传失败,请检查网络!', 3);
            that.props.onUploadError && that.props.onUploadError(error);
        });
        // this._fileReader.readAsDataURL(oFile);
    }

    loadCameraFileHandler(imgData) {
        var that = this;

        // if (this._cameraFile.files.length === 0) {
        //     return;
        // }
        //
        // var oFile = this._albumFile.files[0];
        // alert('获取文件成功');

        // uploadImage(oFile).then(function (imgUrl) {
        uploadImage(imgData).then(function (imgUrl) {
            console.log('上传成功!' + imgUrl);
            that.props.onUploadComplete && that.props.onUploadComplete(imgUrl);
        }, function (error) {
            console.log('上传失败!');
            that.props.onUploadError && that.props.onUploadError(error);
        });
        // this._fileReader.readAsDataURL(oFile);
    }

    uninstallFileReader() {
        this._albumFile.removeEventListener('change', this.loadAlbumFileHandler.bind(this));
        this._cameraFile.removeEventListener('change', this.loadCameraFileHandler.bind(this));
    }

    showSheet() {
        let that = this;
        // const BUTTONS = ['拍照', '从相册选取', '取消'];
        const BUTTONS = ['从相册选取', '取消'];

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                title: '上传图片',
                message: '请从下面选择您的图片来源',
                maskClosable: true,
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    // case 0:
                    //     that.showCameraSelector();
                    //     break;
                    // case 1:
                    //     that.showAlbumSelector();
                    //     break;

                    case 0:
                        that.showAlbumSelector();
                        break;

                    default:
                        break;
                }
            }
        );
    }

    hideSheet() {
        ActionSheet.close();
    }

    showAlbumSelector() {
        this._albumFile.dispatchEvent(new MouseEvent('click'));
    }

    showCameraSelector() {
        var that = this;
        // this._cameraFile.dispatchEvent(new MouseEvent('click'));

        bridge.sys.camera(function (data) {
            //console.log(data.code, data.resp.substr(0, 100));
            // alert(data.resp.substr(0, 100));
            that.loadCameraFileHandler(data.resp);
        });

    }

    render() {
        return <div>
            <input ref="J_AlbumFile" type="file"
                   accept="image/png,image/jpeg,image/jpg,image/gif"
                   className="hide"/>

            <input ref="J_CameraFile" type="file" capture="camera"
                   accept="image/png,image/jpeg,image/jpg,image/gif"
                   className="hide"/>
        </div>;
    }
}

ImageUpload.propTypes = {
    detail: React.PropTypes.object,
    subTagHandler: React.PropTypes.func,
    cancelSubTagHandler: React.PropTypes.func,
    onUploadComplete: React.PropTypes.func,
    onUploadError: React.PropTypes.func
};

export default ImageUpload;

