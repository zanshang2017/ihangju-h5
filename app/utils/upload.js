/**
 * Created by Howard on 16/9/26.
 *
 * 上传组件
 *
 */
import request from 'utils/request';

import {
    IMG_UPLOAD_TOKEN_API
} from 'apis';

function uploadImage(fileData) {
    let _resolve = null;
    let _reject = null;
    let _promise = new Promise(function (resolve, reject) {
        _resolve = resolve;
        _reject = reject;
    });

    request(IMG_UPLOAD_TOKEN_API, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-Version': 'v1.1'
        },
        credentials: 'include'
    }).then((resp) => {
        if (resp.err === undefined || resp.err === null) {
            if (resp.data.uptoken) {
                console.log(resp.data.uptoken);
                console.log(fileData);
                send(fileData, resp.data.uptoken, _resolve, _reject);
                return;
            }
        }

        _reject('token获取失败!');
    }, (error) => {
        console.log(error.err.response);
        _reject('token获取失败!');
    });

    return _promise;
}

function send(fileData, uptoken, _resolve, _reject) {
    let uploadAPI = (location.protocol.indexOf('https') > -1) ? 'https://up.qbox.me' : 'http://upload.qiniu.com/';

    var formData = new FormData();
    formData.append("token", uptoken);
    formData.append("file", fileData);

    request(uploadAPI, {
        method: 'POST',
        body: formData,
    }).then((resp) => {
        if (resp.err === undefined || resp.err === null) {
            if (resp.data.code == 'ok') {
                _resolve(resp.data.result);
                return;
            }
        }

        _reject('图片上传失败!');
    }, (error) => {
        _reject('图片上传失败!');
    });
}

export {
    uploadImage
}