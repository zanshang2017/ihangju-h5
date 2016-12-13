import React from 'react';
import styles from  './style.css'


import List from 'antd-mobile/lib/list';
import InputItem from 'antd-mobile/lib/input-item';
import AttestErrAlert from 'components/common/AttestErrAlert';

class AuthorAttestForm extends React.Component {
    constructor(props) {
        super(props);
        this._resultJS = {};
        this._resultData = {};
        this.assignObj = {individual : {}}
        this.cardReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        this.emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    }
    errAlert(err) {
        this.refs.J_errAlert.showErrAlert(err);
    }
    hideErrAlert() {
        this.refs.J_errAlert.hideErrAlert();
    }
    realnameChange(e) {
        if(e.length > 15){
            this.refs.J_errAlert.showErrAlert("姓名长度不能超过15个字");
        }else {
            this.refs.J_errAlert.hideErrAlert();
        }
        this._resultData.realname = e;
        this.dispatchData();
    }
    identitycardChange(e) {
        if(e.length > 18) {
            this.refs.J_errAlert.showErrAlert("身份证号码长度不能大于18位");
        }else {
             this.refs.J_errAlert.hideErrAlert();
        }
        this._resultData.identitycard = e;
        this.dispatchData();
    }
    identitycardBulr(e) {
        if(this.cardReg.test(e) == false) {
            this.refs.J_errAlert.showErrAlert("不是有效的身份证号");
        }else {
             this.refs.J_errAlert.hideErrAlert();
        }
    }
    companynameChange(e) {
        if(e.length > 20){
            this.refs.J_errAlert.showErrAlert("公司名称长度不能超过20个字");
        }else {
            this.refs.J_errAlert.hideErrAlert();
        }
        this._resultData.companyname = e;
        this.dispatchData();
    }
    postChange(e) {
        if(e.length > 20){
            this.refs.J_errAlert.showErrAlert("职务长度不能超过20个字");
        }else {
            this.refs.J_errAlert.hideErrAlert();
        }
        this._resultData.post = e;
        this.dispatchData();   
    }
    emailChange(e) {
        if(this.emailReg.test(e) == true) {
            this.refs.J_errAlert.hideErrAlert();
        }
        this._resultData.email = e;
        this.dispatchData();
    }
    emailBlur(e) {
        if(this.emailReg.test(e) == false) {
            this.refs.J_errAlert.showErrAlert("邮箱格式不正确");
        }else {
             this.refs.J_errAlert.hideErrAlert();
        }
    }
    dispatchData() {
        this.assignObj.individual = this._resultData;
        let obj = Object.assign({}, this._resultJS, this.assignObj); 
        this.props.setPersonalData(obj);
    }
    render () {
        var _result = this.props.servicePersonalData;
        if(_result.size < 1 ){
            return false; 
        }
        this._resultJS = _result.toJS();
        this._resultData = this._resultJS.individual;

        return (
            <div className={styles.personalForm}>
                <div className={styles.title}>基本信息</div>
                    <List>
                        <List.Body>
                            <InputItem
                                placeholder="真实姓名，最多15字"
                                value={this._resultData.realname || ''}
                                onChange = {this.realnameChange.bind(this)}
                            >姓名</InputItem>
                            <InputItem
                                placeholder="　请输入身份证号"
                                value={this._resultData.identitycard || ''}
                                onChange = {this.identitycardChange.bind(this)}
                                onBlur = {this.identitycardBulr.bind(this)}
                            >身份证号</InputItem>
                            <InputItem
                                placeholder="请输入任职公司名称"
                                value={this._resultData.companyname || ''}
                                onChange = {this.companynameChange.bind(this)}
                            >任职公司</InputItem>
                            <InputItem
                                placeholder="目前在公司担任的职务"
                                value={this._resultData.post || ''}
                                onChange = {this.postChange.bind(this)}
                            >担任职务</InputItem>
                            <InputItem
                                placeholder="请输入常用邮箱地址"
                                value={this._resultData.email || ''}
                                onChange = {this.emailChange.bind(this)}
                                onBlur = {this.emailBlur.bind(this)}
                            >邮箱</InputItem>
                        </List.Body>
                    </List>
                    <AttestErrAlert ref="J_errAlert" />
            </div>
        )
    }
}

export default AuthorAttestForm;