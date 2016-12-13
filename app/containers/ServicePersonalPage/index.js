import React from 'react';
import {connect} from 'react-redux';
import {router} from 'react-router';

import styles from './style.css';

import TopBar from 'components/common/TopBar';
import {createSelector} from 'reselect';

import {
    loadServicePersonal,
    setServicePersonalData,
    updateServicePersonalData,
} from './actions';

import {
    selectServicePersonalData
} from './selectors';

import PersonalForm from 'components/ServicePersonalpage/PersonalForm';
import PersonalImg from 'components/ServicePersonalpage/PersonalImg';
import PersonalCompetence from 'components/ServicePersonalpage/PersonalCompetence';

import AuthorAttestBack from 'components/AuthorAttestPage/AuthorAttestBack';

class ServicePersonal extends React.Component {
    constructor(props) {
        super(props);
        this.cardReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        this.emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    }
    componentDidMount() {
        if (this.props.routeParams) {
            var id = this.props.routeParams.id;
            this.props.dispatch(loadServicePersonal(id));
        }

    }
    submitClick() {
        let _result = this.props.servicePersonalData.toJS();
        let _individual = _result.individual;
        if(this.testAll(_individual) == true) {
            this.props.dispatch(updateServicePersonalData(_result));
            var id = this.props.routeParams.id;
            this.context.router.push('/attestState/' + id);
        }

    }
    backBtnHandler() {
        this.refs.J_backLayer.showBackLayer();
    }
    testAll(data) {
        if(data.realname == undefined || data.realname == "" || data.realname.length >15) {
            this.refs.J_fromAlert.errAlert("姓名长度不能超过15个字");
            return false;
        }else if(data.identitycard == undefined || data.identitycard == "" || this.cardReg.test(data.identitycard) == false) {
            this.refs.J_fromAlert.errAlert("身份证号码长度不足18位");
            return false;
        }else if(data.companyname == undefined || data.companyname == "" || data.companyname.length > 20) {
            this.refs.J_fromAlert.errAlert("公司名称长度不能超过20个字");
            return false;
        }else if(data.post == undefined || data.post == "" || data.post.length > 20) {
            this.refs.J_fromAlert.errAlert("职务长度不能超过20个字");
            return false;
        }else if(data.email == undefined || data.email == "" || this.emailReg.test(data.email) == false) {
            this.refs.J_fromAlert.errAlert("邮箱格式不正确");
            return false;
        }else if(data.identityimagefront == undefined || data.identityimagefront == "") {
            this.refs.J_fromAlert.errAlert("请添加身份证正面照");
            return false;
        }else if(data.identityimageback == undefined || data.identityimageback == "") {
            this.refs.J_fromAlert.errAlert("请添加身份证反面照");
            return false;
        }else if(data.businesscard == undefined || data.businesscard == ""){
            this.refs.J_fromAlert.errAlert("请添加证件照");
            return false;
        } else if(data.competencepurview == undefined || data.competencepurview){
            let arr = data.competencepurview || [];
            let boo = false;
            for(var i=0;i<arr.length;i++) {
                if(arr[i].select == 'enable'){
                   boo =true;
                }
            }
            if(boo == false) {
                this.refs.J_fromAlert.errAlert("至少选择一种签约权利");
                return false;    
            }else {
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
                <div className={` ${styles.servicePersonal} mainContent deepBg`}>
                    <PersonalForm ref="J_fromAlert" {...this.props}/>
                    <PersonalCompetence   {...this.props}/>
                    <PersonalImg   {...this.props}/>
                    <AuthorAttestBack ref="J_backLayer" />
                </div>
            </div>
		)
	}
}


ServicePersonal.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = createSelector(
    selectServicePersonalData(),
    (servicePersonalData) => {
        return {    
            servicePersonalData
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        setPersonalData: (data) => {
            dispatch(setServicePersonalData(data))
        },
        updatePersonalData: (data) => {
            dispatch(updateServicePersonalData(data))
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePersonal);