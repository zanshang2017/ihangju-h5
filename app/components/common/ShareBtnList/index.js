import React from 'react';
import styles from './style.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import bridge from 'utils/bridge';

class ShareBtnList extends React.Component {
    constructor(props) {
        super(props);
        this.copContent = {
            value: window.location.href,
            copied: false
        }
    }

    componentDidMount() {

    }

    shareWx() {
        alert("微信分享");
        console.log(this.shareMes);
        bridge.share.wechat(this.shareMes.url,
            this.shareMes.title,
            this.shareMes.content,
            this.shareMes.imgSrc,
            function (data) {
                console.log(data.code, data.resp);
            }
        );

    }

    shareFriend() {
        alert("朋友圈分享");
        bridge.share.wechatTimeline(this.shareMes.url,
            this.shareMes.title,
            this.shareMes.content,
            this.shareMes.imgSrc,
            function (data) {
                console.log(data.code, data.resp);
            }
        );
    }

    shareWb() {
        alert("微博分享");
        bridge.share.weibo(this.shareMes.title, function (data) {
            console.log(data.code, data.resp);
        });
    }

    shareInstation() {
        alert("站内分享");
    }

    report() {
        alert("举报成功");
        this.refs._sharelayer.classList.add('hide');
    }

    copyCon() {
        this.copContent.value = this.shareMes.url;
        this.copContent.copied = true;
        alert("拷贝成功");
        this.refs._sharelayer.classList.add('hide');
    }

    hideShareLayer() {
        let shareDom = this.refs._sharelayer;
        shareDom.classList.add('hide');
    }

    showShareLayer() {
        let shareDom = this.refs._sharelayer;
        shareDom.classList.remove('hide');
    }

    render() {
        var that = this;
        if (this.props.items) {
            that.shareMes = this.props.items.toJS();
        }
        return (
            <div ref="_sharelayer" className={`${styles.shareBg} hide`}>
                <div className={styles.share}>
                    <div className={`${styles.signProject} hide`}>
                        <span>签作品</span>
                    </div>

                    <div className={styles.sharebtnList}>
                        <ul>
                            <li onClick={this.shareWx.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.wx}></span>
                                </div>
                                <div>
                                    <span>微信</span>
                                </div>
                            </li>
                            <li onClick={this.shareFriend.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.wxFriend}></span>
                                </div>
                                <div>
                                    <span>朋友圈</span>
                                </div>
                            </li>
                            <li onClick={this.shareWb.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.wb}></span>
                                </div>
                                <div>
                                    <span>微博</span>
                                </div>
                            </li>
                            <li onClick={this.shareInstation.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.instation}></span>
                                </div>
                                <div>
                                    <span>站内分享</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.otherBtn}>
                        <ul>
                            <CopyToClipboard text={this.copContent.value} onCopy={this.copyCon.bind(this)}>
                                <li>
                                    <div className={styles.shareImg}>
                                        <span className={styles.copyLink}></span>
                                    </div>
                                    <div>
                                        <span>复制链接</span>
                                    </div>
                                </li>
                            </CopyToClipboard>
                            <li onClick={this.report.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.report}></span>
                                </div>
                                <div>
                                    <span>举报</span>
                                </div>
                            </li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div onClick={this.hideShareLayer.bind(this)} className={styles.cancelBtn}>取消</div>
                </div>
            </div>
        )
    }
}

export default ShareBtnList;