import React from 'react';
import {Link} from 'react-router';
import style from './style.css';

import {
    locStorage
} from 'utils/util';

import {
    SELECTED_COPYRIGHTS_LOCALSTORAGE
} from 'containers/ProjectDetailPage/constants';

import signals from 'containers/ProjectDetailPage/signals';

import Modal from 'antd-mobile/lib/modal';
import Button from 'antd-mobile/lib/button';
import Toast from 'antd-mobile/lib/toast';
import ActionSheet from 'antd-mobile/lib/action-sheet';

class ProjectFooterBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.userInfo = this.props.userInfo.toJS();
        signals.loadCopyrightSuccess.add(this.onCopyrightLoaded.bind(this));
    }

    componentDidMount() {
        this._result = this.props.projectDetail.toJS();
        this.locStorageProjectInfo = JSON.parse(locStorage.get('projectInfo')) || {};
        this.newArr = this.locStorageProjectInfo[this._result.projectId];
        if (this._result.projectId) {
            this.props.loadChapter(this._result.projectId);
        }

        // "accessuserhasidentityauthentication": true, 当前用户是否认证
        // "accessuserhasserviceprovider": false, 当前用户是否认证为服务商
        // "authoruserhasidentityauthentication": true, 作者是否通过认证审核(此项一般不需要)

        this.isAccessUserIdentify = false;
        this.isProvider = false;

        if (this._result) {
            //当前用户需要认证
            if (this._result.accessuserhasidentityauthentication) {
                this.isAccessUserIdentify = true;
            }

            //认证且具备服务商资质
            if (this._result.accessuserhasserviceprovider) {
                this.isProvider = true;
            }
        }
    }

    onCopyrightLoaded(data) {
        var that = this;
        var cr = data;

        if (cr) {
            if (cr.code == 'ok' && cr.result) {
                if (cr.result.length > 0) {
                    that.showActionSheet(cr.result);
                } else {
                    Toast.info('没有可以签的权利');
                }
            } else if (cr.code == 'fail') {
                if (cr.message) {
                    Toast.info(cr.message);
                } else {
                    Toast.info('请求异常,请稍后再试!');
                }
            } else {
                Toast.info('请求异常,请稍后再试!');
            }
        }
    }

    componentWillUnmount() {
        signals.loadCopyrightSuccess.removeAll();
        ActionSheet.close();
    }

    showActionSheet(result) {
        var that = this;
        var selectedCls = style.selected;
        var selectedCopyright = {};
        var _html = result.map(function (v) {
            return <button key={v.id} onClick={btnClick} data-id={v.id} data-title={v.title}>{v.title}</button>
        });

        ActionSheet.showActionSheetWithCustom({
            title: <div><div className={`${style.copyrightTitle} fl`}>签约的权利</div><div onClick={closeClick} className={`${style.copyrightCloseBtn} fr`}><i className="anticon anticon-cross"></i></div></div>,
            maskClosable: false,
            component: <div className={style.copyrightWrap}>
                <div className={style.copyrightBtns}>{_html}</div>
                <Button type="primary" onClick={submit}>提交</Button>
            </div>
        });

        function btnClick(e) {
            let _node = e.target;
            let clses = _node.classList;
            clses.toggle(selectedCls);

            if (clses.contains(selectedCls)) {
                selectedCopyright[_node.dataset['id']] = {
                    id: _node.dataset['id'],
                    title: _node.dataset['title']
                };
            } else {
                delete selectedCopyright[_node.dataset['id']];
            }
        }

        function submit() {
            //写入localStorage,跳转到留言页
            let _v = [];
            for (let k in selectedCopyright) {
                if (selectedCopyright.hasOwnProperty(k)) {
                    _v.push(selectedCopyright[k]);
                }
            }

            if(_v.length == 0) {
                Toast.info('请选择签约的权利', 2);
                return;
            }

            locStorage.set(SELECTED_COPYRIGHTS_LOCALSTORAGE, JSON.stringify(_v));
            that.props.submitAgreement();
            ActionSheet.close();
        }

        function closeClick() {
            ActionSheet.close();
        }

    }

    goSignPanel() {
        let that = this;

        Modal.alert('去认证', '通过服务商认证后，您才可以购买版权', [
            {
                text: '再想想',
                onPress: function () {
                    console.log('再想想');
                }
            },
            {
                text: '去认证',
                onPress: function () {
                    console.log('去认证');
                    that.context.router.push(`/selectService/${that.userInfo.id}`);
                }
            },
        ]);
    }

    signClickHandler() {
        if (this.isProvider) {
            this.copyrightHandler();
        } else if (this.isAccessUserIdentify) {
            Toast.info('您已认证为作者,无法申请服务商认证', 2.5);
        } else {
            this.goSignPanel();
        }
    }

    copyrightHandler() {
        Toast.loading();
        this.props.loadProjectCopyrightData();
    }

    render() {
        let cid = null;

        if (this.newArr) {
            for (var i in this.newArr) {
                cid = this.newArr[i];
            }
        } else {
            let chaptersDetail = this.props.projectDetailChapter.toJS();
            let chaptersArr = chaptersDetail.chapters;
            if (chaptersArr) {
                chaptersArr.map(function (item, key) {
                    if (key === 0) {
                        return cid = item.id;
                    }
                })
            }
        }
        var _html = '';
        if (this._result) {
            _html = <Link to={`/readProjectChapter/${this._result.projectId}/${cid}`}>
                <div className={style.listDiv}><i className={style.read}></i>阅读</div>
            </Link>
        }

        return (
            <div className={style.prodectFooterBar}>
                {_html}
                <div className={style.listDiv} onClick={this.signClickHandler.bind(this)}><i
                    className={style.signWork}></i>签作品
                </div>
            </div>
        )
    }
}

ProjectFooterBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ProjectFooterBar;



