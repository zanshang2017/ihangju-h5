import React from 'react';
import bridge from '../../utils/bridge';


var fileStyle = {
    display: 'none'
}

/* eslint-disable react/prefer-stateless-function */
export default class BridgeTest extends React.Component {

    componentDidMount() {
        let cf = document.querySelector('#cameraFile');
        let showImg = document.querySelector('#showImg');

        let btn = document.querySelector('#cameraBtn');

        btn.addEventListener('click', function(e){
            cf.click();
        });

        cf.addEventListener('change', function (event) {
            showImg.onload = function () {
                //var canvas = document.querySelector("#c");
                //var ctx = canvas.getContext("2d");
                //ctx.drawImage(showPicture, 0, 0, showPicture.width, showPicture.height);
            }
            // Get a reference to the taken picture or chosen file
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;

                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);

                    // Set img src to ObjectURL
                    showPicture.src = imgURL;

                    // Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);
                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showImg.src = event.target.result;

                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        // Display error message
                        //var error = document.querySelector("#error");
                        //if (error) {
                        //    error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        //}

                        alert('error!');
                    }
                }
            }


        });

    }

    qrReader() {
        bridge.sys.qrReader(function (data) {
            //console.log(data.code, data.resp);
            alert(data.resp);
        });
    }

    //camera() {
    //    bridge.sys.camera(function (data) {
    //        //console.log(data.code, data.resp.substr(0, 100));
    //        alert(data.resp.substr(0, 100));
    //    });
    //
    //    //bridge.sys.camera();
    //}

    quit() {
        bridge.sys.quit(function (data) {
            console.log(data.code, data.resp);
        });
    }

    weibo() {
        bridge.share.weibo('分享到微博的文字', function (data) {
            console.log(data.code, data.resp);
        });
    }

    wechat() {
        bridge.share.wechat('https://www.ihangju.com/share/index.html?project=570c84ebe4b0128d8cbcafe5',
            '分享标题',
            '分享描述',
            function (data) {
                console.log(data.code, data.resp);
            });
    }

    wechatTimeline() {
        bridge.share.wechatTimeline('https://www.ihangju.com/share/index.html?project=570c84ebe4b0128d8cbcafe5',
            '分享标题',
            '分享描述',
            'https://o82zr1kfu.qnssl.com/@/image/5757af38e4b05d3f1c70e8e8.png',
            function (data) {
                console.log(data.code, data.resp);
            });
    }

    render() {
        return (
            <div className="page">
                <h1>Bridge测试</h1>
                <p>
                    <button onTouchStart={this.qrReader}>二维码</button>
                </p>
                <p><br/></p>
                <p>
                    <button onClick={this.camera}>照相机</button>
                </p>
                <p><br/></p>
                <p>
                    <button id="cameraBtn">拍照</button>
                    <input type="file" accept="image/*" capture="camera" id="cameraFile" style={fileStyle} />
                </p>
                <p><br/></p>
                <p>
                    <button onClick={this.quit}>退出</button>
                </p>
                <p><br/></p>
                <p>
                    <button onClick={this.weibo}>微博</button>
                </p>
                <p><br/></p>
                <p>
                    <button onClick={this.wechat}>微信</button>
                </p>
                <p><br/></p>
                <p>
                    <button onClick={this.wechatTimeline}>朋友圈</button>
                </p>
                <p><br/></p>
                <img src="about:blank" alt="" id="showImg" width="100%" />
            </div>
        );
    }
}
