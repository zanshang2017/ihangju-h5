import React from 'react';
import styles from  './style.css'


import List from 'antd-mobile/lib/list';
import InputItem from 'antd-mobile/lib/input-item';
import AttestErrAlert from 'components/common/AttestErrAlert';

class AgencyForm extends React.Component {
    constructor(props) {
        super(props);
        this._resultJS = {};
        this._resultData = {};
        this.assignObj = {agency : {}}
        this.emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        this.phoneReg = /^[0-9]{11}$/;
    }
    errAlert(err) {
        this.refs.J_errAlert.showErrAlert(err);
    }
    hideAlert() {
        this.refs.J_errAlert.hideErrAlert();
    }
    realnameChange(e) {
        // if(e.length > 15){
        //     this.refs.J_errAlert.showErrAlert("姓名长度不能超过15个字");
        // }else {
        //     this.refs.J_errAlert.hideErrAlert();
        // }
        // this._resultData.realname = e;
        // this.dispatchData();
    }
    orgnameChange(e) {
        if(e.length > 20) {
            this.errAlert('公司名称不能超过20个字');
        }else {
            this.hideAlert();
        }
        this._resultData.orgname = e;
        this.dispatchData();
    }
    orgcodeChange(e) {
        if(e.length > 18) {
            this.errAlert('不是有效的组织机构代码');
        }else {
            this.hideAlert();
        }
        this._resultData.orgcode = e;
        this.dispatchData();
    }
    contactpersonChange(e) {
        if(e.length > 15) {
            this.errAlert('联系人姓名不能超过15个字');
        }else {
            this.hideAlert();
        }
        this._resultData.contactperson = e;
        this.dispatchData();
    }
    phonenumberChange(e) {
        if(e.length > 11) {
            this.errAlert('不是有效的手机号码');
        }else {
            this.hideAlert();
        }
        this._resultData.phonenumber = e;
        this.dispatchData();
    }
    phonenumberBlur(e) {
        if(this.phoneReg.test(e) == false) {
            this.errAlert('不是有效的手机号码');
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
            this.errAlert('邮箱格式不正确');
        }else {
            this.hideAlert();
        }
    }
    dispatchData() {
        this.assignObj.agency = this._resultData;
        let obj = Object.assign({}, this._resultJS, this.assignObj); 
        this.props.setAgencyData(obj);
    }
    render () {
        var _result = this.props.serviceAgencyData;
        if(_result.size < 1 ){
            return false; 
        }
        this._resultJS = _result.toJS();
        this._resultData = this._resultJS.agency;
        return (
            <div className={styles.agencyForm}>
                <div className={styles.title}>基本信息</div>
                    <List>
                        <List.Body>
                            <InputItem
                                placeholder="与营业执照保持一致"
                                value={this._resultData.orgname || ''}
                                onChange = {this.orgnameChange.bind(this)}
                            >公司名称</InputItem>
                            <InputItem
                                placeholder="组织机构代码或社会信用代码"
                                value={this._resultData.orgcode || ''}
                                onChange = {this.orgcodeChange.bind(this)}
                            >组织机构代码</InputItem>
                            <InputItem
                                placeholder="联系人名称，最多15字"
                                value={this._resultData.contactperson || ''}
                                onChange = {this.contactpersonChange.bind(this)}
                            >联系人</InputItem>
                        </List.Body>
                    </List>
                    <List>
                        <List.Body>
                            <InputItem
                                placeholder="联系人手机号码"
                                value={this._resultData.phonenumber}
                                onChange = {this.phonenumberChange.bind(this)}
                                onBlur = {this.phonenumberBlur.bind(this)}
                            >手机</InputItem>
                            <InputItem
                                placeholder="对公业务联络邮箱地址"
                                value={this._resultData.email}
                                onChange = {this.emailChange.bind(this)}
                                onBlur = {this.emailBlur.bind(this)}
                            >公司邮箱</InputItem>
                        </List.Body>
                    </List>
                    <AttestErrAlert ref="J_errAlert" />
            </div>
        )
    }
}

export default AgencyForm;


