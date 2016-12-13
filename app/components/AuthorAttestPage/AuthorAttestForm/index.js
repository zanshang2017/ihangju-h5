import React from 'react';
import styles from  '../../ServicePersonalpage/PersonalForm/style.css';


import List from 'antd-mobile/lib/list';
import InputItem from 'antd-mobile/lib/input-item';
import AttestErrAlert from 'components/common/AttestErrAlert';

class AuthorAttestForm extends React.Component {
    constructor(props) {
        super(props);
        this._resultJS = {};
        this._resultData = {};
        this.assignObj = {author : {}}
        this.cardReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        this.emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    }
    realnameChange(e) {
        if(e.length > 15){
            this.errAlert("姓名长度不能超过15个字");
        }else {
            this.hideAlert();
        }
        this._resultData.realname = e;
        this.dispatchData();
    }
    identitycardChange(e) {
        if(e.length > 18) {
            this.errAlert("身份证号码长度不能大于18位");
        }else {
             this.hideAlert();
        }
        this._resultData.identitycard = e;
        this.dispatchData();
    }
    identitycardBlur(e) {
        if(this.cardReg.test(e) == false) {
            this.errAlert("不是有效的身份证号");
        }else {
             this.hideAlert();
        }
    }
    emailChange(e) {
        if(this.emailReg.test(e) == true) {
             this.hideAlert();
        }
        this._resultData.email = e;
        this.dispatchData();
    }
    emailBlur(e) {
        if(this.emailReg.test(e) == false) {
            this.errAlert("邮箱格式不正确");
        }else {
             this.hideAlert();
        }
    }
    dispatchData() {
        this.assignObj.author = this._resultData;
        let obj = Object.assign({}, this._resultJS, this.assignObj); 
        this.props.setAuthorAttestData(obj);
    }
    errAlert(err) {
        this.refs.J_errAlert.showErrAlert(err);
    }
    hideAlert() {
        this.refs.J_errAlert.hideErrAlert();
    }
    render () {
        var _result = this.props.authorAttestData;
        if(_result.size < 1 ){
            return false; 
        }
        this._resultJS = _result.toJS();
        this._resultData = this._resultJS.author;
        return (
            <div className={styles.personalForm}>
                <div className={styles.title}>基本信息</div>
                    <List>
                        <List.Body>
                            <InputItem
                                placeholder="姓名，最多15字"
                                value = {this._resultData.realname}
                                onChange = {this.realnameChange.bind(this)}
                            >姓名</InputItem>
                            <InputItem
                                placeholder="身份证号码"
                                value={this._resultData.identitycard}
                                onChange = {this.identitycardChange.bind(this)}
                                onBlur = {this.identitycardBlur.bind(this)}
                            >身份证号码</InputItem>
                            <InputItem
                                placeholder="常用邮箱地址"
                                value={this._resultData.email}
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