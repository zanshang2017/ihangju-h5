import React from 'react';
import {connect} from 'react-redux';
import {router} from 'react-router';

import styles from './style.css';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';
import InputItem from 'antd-mobile/lib/input-item';
import { createForm } from 'rc-form';
import {createSelector} from 'reselect';
import {
    addImageParam,
    IMAGE_SIZE_TYPE,
} from 'utils/util.js';

import {
    IMG_CDN_PATH
} from 'apis.js';
import ImageUpload from 'components/common/ImageUpload';

import {
    selectAuthorAttest,
    selectAuthorAttestSuccess,
} from './selectors';

import {
    loadAuthorAttestData,
    setAuthorAttestData,
    updateAuthorAttestData,
} from './actions';

import AuthorAttestBack from 'components/AuthorAttestPage/AuthorAttestBack';
import AuthorAttestForm from 'components/AuthorAttestPage/AuthorAttestForm';
import AuthorAttestImg from 'components/AuthorAttestPage/AuthorAttestImg';

class AuthorAtteset extends React.Component {
	constructor(props) {
        super(props);
        this.cardReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        this.emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    }
    componentWillMount() {
    	if (this.props.routeParams) {
            var id = this.props.routeParams.id;
            this.props.dispatch(loadAuthorAttestData(id));
        }

    }
    backBtnHandler() {
        this.refs.J_backLayer.showBackLayer();
    }
    submitClick() {
        let _result = this.props.authorAttestData.toJS();
        let data = _result.author;
        if(this.testAll(data) == true) {
            this.props.dispatch(updateAuthorAttestData(_result));
        }
    }
    componentDidUpdate() {
        let _resultData = this.props.updateSuccess.toJS();
        if(_resultData.data == true) {
            var id = this.props.routeParams.id;
            this.context.router.push('/attestState/' + id);
        }
    }
    testAll(data) {
        if(data.realname == undefined || data.realname == '' || data.realname.length > 15) {
            this.refs.J_formAlert.errAlert('姓名长度不能超过15个字');    
            return false;
        }else if(data.identitycard == undefined || data.identitycard == '' || this.cardReg.test(data.identitycard) == false) {
            this.refs.J_formAlert.errAlert('身份证号码长度不足18位');    
            return false;
        }else if(data.email == undefined || data.email == '' || this.emailReg.test(data.email) == false) {
            this.refs.J_formAlert.errAlert('邮箱格式不正确');    
            return false;
        }else if(data.identityimagefront == undefined || data.identityimagefront == '') {
            this.refs.J_formAlert.errAlert('请添加身份证正面照');    
            return false;
        }else if(data.identityimageback == undefined || data.identityimageback == '') {
            this.refs.J_formAlert.errAlert('请添加身份证反面照');    
            return false;
        }else {
            this.refs.J_formAlert.hideAlert();
            return true;
        }
        
    }
	render () {
		return (
			<div className="pageInner">
              	<TopBar data-has-text-back="true" backHandler={this.backBtnHandler.bind(this)}>
                    <div data-title>身份认证</div>
                    <div data-btns>
                    	<span onClick={this.submitClick.bind(this)}>提交</span>
                    </div>
                </TopBar>
                <div className={` ${styles.authorAttest} mainContent deepBg`}>
                	<AuthorAttestForm  ref="J_formAlert" {...this.props}/>
                    <AuthorAttestImg {...this.props} />
                </div>
                <AuthorAttestBack ref="J_backLayer" />
            </div>
		)
	}
}


AuthorAtteset.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = createSelector(
    selectAuthorAttest(),
    selectAuthorAttestSuccess(),
    (authorAttestData,updateSuccess) => {
        return {
            authorAttestData,
            updateSuccess
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        setAuthorAttestData: (data) => {
            dispatch(setAuthorAttestData(data))
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorAtteset);