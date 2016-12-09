import React from 'react';
import {connect} from 'react-redux';
import {router} from 'react-router';

import styles from './style.css';

import TopBar from 'components/common/TopBar';

class SelectService extends React.Component {
	constructor(props) {
        super(props);
        this.personID = '';
    }
    componentWillMount() {
        if (this.props.routeParams) {
            this.personID = this.props.routeParams.id;
        }
    }
	personalClickHandler() {
		if (this.personID) {
			this.context.router.push('/servicPersonal/' + this.personID);
		}
	}
    agencyClickHandler() {
        if (this.personID) {
            this.context.router.push('/serviceAgency/' + this.personID);
        }
    }
	render() {
		return (
			<div className="pageInner">
              	<TopBar data-has-back="true">
                    <div data-title>选择服务商身份</div>
                </TopBar>
                <div className={` mainContent deepBg `}>
                	<div onClick={this.personalClickHandler.bind(this)} className={styles.selectIdentity}>
                		<img src="https://o82zr1kfu.qnssl.com/@/image/58466876e4b05c2d3be1c249.png?imageView2/2/w/300" />
                		<span>个人</span>
                	</div>
                	<div onClick={this.agencyClickHandler.bind(this)} className={styles.selectIdentity}>
                		<img src="https://o82zr1kfu.qnssl.com/@/image/5846688fe4b05c2d3be1c24b.png?imageView2/2/w/300" />
                		<span>机构</span>
                	</div>
                </div>
            </div>
		)
	}
}


SelectService.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(SelectService);