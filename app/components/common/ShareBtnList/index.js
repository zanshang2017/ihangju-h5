import React from 'react';
import styles from './style.css';
import bridge from 'utils/bridge';

import Toast from 'antd-mobile/lib/toast';
import ActionSheet from 'antd-mobile/lib/action-sheet';

class ShareBtnList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    shareWx() {
        console.log(this.shareMes);
        var that = this;
        bridge.share.wechat(this.shareMes.url,
            this.shareMes.title,
            this.shareMes.content,
            this.shareMes.imgSrc,
            function (data) {
                ActionSheet.close();
                console.log(data.code, data.resp);
                zhuge.track('作品分享到微信');
            }
        );

    }

    shareFriend() {
        var that = this;
        bridge.share.wechatTimeline(this.shareMes.url,
            this.shareMes.title,
            this.shareMes.content,
            this.shareMes.imgSrc,
            function (data) {
                ActionSheet.close();
                console.log(data.code, data.resp);
                zhuge.track('作品分享到朋友圈');
            }
        );
    }

    shareWb() {
        var that = this;
        var shareText = this.shareMes.title + ' ' + this.shareMes.url;
        bridge.share.weibo(shareText, function (data) {
            ActionSheet.close();
            console.log(data.code, data.resp);
            zhuge.track('作品分享到微博');
        });
    }

    shareInstation() {
        // alert("站内分享");
    }

    copyToClipboard() {
        bridge.sys.copyToClipboard(this.shareMes.url, function () {
            Toast.info('已复制到剪切板');
            ActionSheet.close();
            zhuge.track('作品复制链接');
        }.bind(this));
    }

    report() {
        Toast.info("举报成功");
        ActionSheet.close();
    }

    hideShareLayer() {
        ActionSheet.close();
    }

    render() {
        var that = this;
        if (this.props.items) {
            that.shareMes = this.props.items;
        }

        return (
            <div ref="_sharelayer" className={`${styles.shareBg}`}>
                <div className={styles.share}>
                    <div className={`${styles.signProject} hide`}>
                        <span>签作品</span>
                    </div>

                    <div className={styles.sharebtnList}>
                        <ul>
                            <li data-hashover="true" onClick={this.shareWx.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.wx}></span>
                                </div>
                                <div>
                                    <span>微信</span>
                                </div>
                            </li>
                            <li data-hashover="true" onClick={this.shareFriend.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.wxFriend}></span>
                                </div>
                                <div>
                                    <span>朋友圈</span>
                                </div>
                            </li>
                            <li data-hashover="true" onClick={this.shareWb.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.wb}></span>
                                </div>
                                <div>
                                    <span>微博</span>
                                </div>
                            </li>
                            {/*<li data-hashover="true" onClick={this.shareInstation.bind(this)}>*/}
                                {/*<div className={styles.shareImg}>*/}
                                    {/*<span className={styles.instation}></span>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                    {/*<span>站内分享</span>*/}
                                {/*</div>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                    <div className={styles.otherBtn}>
                        <ul>
                            <li data-hashover="true" onClick={this.copyToClipboard.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.copyLink}></span>
                                </div>
                                <div>
                                    <span>复制链接</span>
                                </div>
                            </li>
                            <li data-hashover="true"onClick={this.report.bind(this)}>
                                <div className={styles.shareImg}>
                                    <span className={styles.report}></span>
                                </div>
                                <div>
                                    <span>举报</span>
                                </div>
                            </li>
                            <li></li>
                        </ul>
                    </div>
                    <div onClick={this.hideShareLayer.bind(this)} data-hashover="true" className={styles.cancelBtn}>取消</div>
                </div>
            </div>
        )
    }
}

export default ShareBtnList;