import React from 'react';
import {connect} from 'react-redux';
import {router} from 'react-router';

import styles from './style.css';

import TopBar from 'components/common/TopBar';
import {createSelector} from 'reselect';

import {
	loadServiceAgency,
    setServiceAgencyData,
    updateServiceAgencyData,
} from './actions';

import {
	selectServiceAgencyData,
    selectServiceAgencyDataSuccess
} from './selectors';

import AuthorAttestBack from 'components/AuthorAttestPage/AuthorAttestBack';
import AgencyForm from 'components/ServiceAgencyPage/AgencyForm';
import AgencyCompetence from 'components/ServiceAgencyPage/AgencyCompetence';
import AgencyImg from 'components/ServiceAgencyPage/AgencyImg';


class ServiceAgency extends React.Component {
	constructor(props) {
        super(props)
        this.emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        this.phoneReg = /^[0-9]{11}$/;
    }
    componentDidMount() {
        if (this.props.routeParams) {
            var id = this.props.routeParams.id;
            this.props.dispatch(loadServiceAgency(id));
        }

    }
    backBtnHandler() {
        this.refs.J_backLayer.showBackLayer();
    }
    submitClick() {
        let _result = this.props.serviceAgencyData.toJS();
        let data = _result.agency;
        if(this.testAll(data) == true) {
            this.props.dispatch(updateServiceAgencyData(_result));
        }
    }
    componentDidUpdate() {
        let _resultData = this.props.updateSuccess.toJS();
        console.log(_resultData);
        if(_resultData.data == true) {
            var id = this.props.routeParams.id;
            this.context.router.push('/attestState/' + id);
        }
    }
    testAll(data) {
        if(data.orgname == undefined || data.orgname == '' || data.orgname.length > 20) {
            this.refs.J_agencyForm.errAlert("公司名称不能超过20个字");
            return false;
        }else if(data.orgcode == undefined || data.orgcode == '' || data.orgcode.length > 18) {
            this.refs.J_agencyForm.errAlert("组织机构代码不能超过18个字");
            return false;
        }else if(data.contactperson == undefined || data.contactperson == '' || data.contactperson.length > 15) {
            this.refs.J_agencyForm.errAlert("联系人姓名不能超过15个字");
            return false;
        }else if(data.phonenumber == undefined || this.phoneReg.test(data.phonenumber) == false) {
            this.refs.J_agencyForm.errAlert("不是有效的手机号码");
            return false;
        }else if(data.email == undefined || this.emailReg.test(data.email) == false) {
            this.refs.J_agencyForm.errAlert("邮箱格式不正确");
            return false;
        }else if(data.businesslicense == undefined || data.businesslicense == '') {
            this.refs.J_agencyForm.errAlert("请添加营业执照");
            return false;
        }else if(data.competencepurview == undefined || data.competencepurview) {
            let arr = data.competencepurview || [];
            let boo = false;
            for(var i=0;i<arr.length;i++) {
                if(arr[i].select == 'enable'){
                   boo =true;
                }
            }
            if(boo == false) {
                this.refs.J_agencyForm.errAlert("至少选择一种签约权利");
                return false;    
            }else {
                this.refs.J_agencyForm.hideAlert();
                 return true;
            }
        }
        
    }
    render() {
		return (
			<div className="pageInner">
                <TopBar data-has-text-back="true"  backHandler={this.backBtnHandler.bind(this)}>
                    <div data-title>身份认证</div>
                    <div data-btns>
                        <span onClick={this.submitClick.bind(this)}>提交</span>
                    </div>
                </TopBar>
                 <div className={` ${styles.serviceAgenct} mainContent deepBg`}>
                    <AgencyForm ref="J_agencyForm" {...this.props} />
                    <AgencyCompetence {...this.props} />
                    <AgencyImg {...this.props} />
                 </div>
                <AuthorAttestBack ref="J_backLayer" />
            </div>
		)
	}
}

ServiceAgency.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps = createSelector(
    selectServiceAgencyData(),
    selectServiceAgencyDataSuccess(),
    (serviceAgencyData,updateSuccess) => {
        return {    
            serviceAgencyData,
            updateSuccess
        }
    }
);
function mapDispatchToProps(dispatch) {
    return {
        setAgencyData : (data) => {
            dispatch(setServiceAgencyData(data));
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAgency);