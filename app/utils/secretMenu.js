/**
 * Created by Howard on 2016/11/24.
 */

import ActionSheet from 'antd-mobile/lib/action-sheet';

export default {
    doListen: function (dom) {
        this.dom = dom;
        this.tapCount = 0;

        if (this.dom) {
            this.dom.addEventListener('touchstart', this.secretMenuHandler.bind(this));
        }
    },

    removeListen: function () {
        this.dom.removeEventListener('touchstart', this.secretMenuHandler.bind(this));
    },

    secretMenuHandler: function () {
        this.tapCount++;

        if (this.tapCount >= 6) {
            this.tapCount = 0;
            this.showSecretMenu();
        } else {
            window.clearTimeout(this.tapCountTimeout);
            this.tapCountTimeout = window.setTimeout(function () {
                this.tapCount = 0;
            }.bind(this), 500);
        }
    },
    showSecretMenu: function () {
        const BUTTONS = [
            'h5.dev.ihangju.com',
            'h5.dev.ihangju.com/?debug',
            'testh5.app.ihangju.com',
            'h5app.ihangju.com?debug',
            '取消'];

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                title: '隐藏工具',
                maskClosable: false,
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        location.href = 'http://h5.dev.ihangju.com/';
                        break;

                    case 1:
                        location.href = 'http://h5.dev.ihangju.com/?debug';
                        break;

                    case 2:
                        location.href = 'http://testh5.app.ihangju.com/';
                        break;

                    case 3:
                        location.href = 'http://h5app.ihangju.com?debug';
                        break;

                    default:
                        break;
                }
            }
        );
    }
};


