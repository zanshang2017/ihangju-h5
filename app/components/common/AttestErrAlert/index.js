import React from 'react';
import styles from './style.css';

class AttestErrAlert extends React.Component {
	constructor(props) {
		super(props);
		this.state = {errMes: '错误提示'}
	}
	showErrAlert(err) {
		let errDom = this.refs.j_errAlert;
		this.setState({errMes : err})
		errDom.classList.remove('hide');
	}
	hideErrAlert() {
		let errDom = this.refs.j_errAlert;
		errDom.classList.add('hide');
	}
	render() {
		return (
			<div ref="j_errAlert" className={`${styles.attestErrAlert} hide`}>{this.state.errMes}</div>
		)
	}
}

export default AttestErrAlert;