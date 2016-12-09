import React from 'react';
import {connect} from 'react-redux';
import {router} from 'react-router';

import styles from './style.css';

import TopBar from 'components/common/TopBar';

class SelectIdentPage extends React.Component {
	
	constructor(props) {
        super(props);
        this.personID = '';
    }

    componentWillMount() {
        if (this.props.routeParams) {
            this.personID = this.props.routeParams.id;
        }
    }

	authorClickHandler () {
		if (this.personID) {
			this.context.router.push('/authorAttest/' + this.personID);
		}
	}
    serviceClickhandler () {
        if (this.personID) {
            this.context.router.push('/selectService/' + this.personID);
        }
    }
    render() {
        return (
            <div className="pageInner">
              	<TopBar data-has-text-back="true">
                    <div data-title>选择身份</div>
                </TopBar>
                <div className={` mainContent deepBg `}>
                	<div onClick={this.serviceClickhandler.bind(this)} className={styles.selectIdentity}>
                		<img src="https://o82zr1kfu.qnssl.com/@/image/583e6bf3e4b0d2bddbea3698.png?imageView2/2/w/300" />
                		<span>我是服务商</span>
                	</div>
                	<div onClick={this.authorClickHandler.bind(this)} className={styles.selectIdentity}>
                		<img src="https://o82zr1kfu.qnssl.com/@/image/583e6e27e4b0d2bddbea3fa7.png?imageView2/2/w/300" />
                		<span>我是作者</span>
                	</div>
                </div>
            </div>
        )
    }
}

SelectIdentPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(SelectIdentPage);
