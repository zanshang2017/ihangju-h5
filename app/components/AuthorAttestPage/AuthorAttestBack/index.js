import React from 'react';
import style from './style.css';

class AuthorAttestBack extends React.Component {

	showBackLayer() {
		let backDom = this.refs._backLayer;
        backDom.classList.remove('hide');
	}
	hideBackLayer() {
		let backDom = this.refs._backLayer;
        backDom.classList.add('hide');
	}
	leavBackLayer() {
		this.context.router.goBack();
	}
	render() {
		return (
			<div ref="_backLayer" className={`${style.backBg} hide`}>
				<div className={style.layerCon}>
					<span className={style.topText}>身份信息认证未完成，建议继续完善</span>
					<div className={style.btnList}>
						<span onClick={this.leavBackLayer.bind(this)} className={style.btnLeft}>中途放弃</span>
						<span onClick={this.hideBackLayer.bind(this)} className={style.btnRight}>继续完善</span>
					</div>	
				</div>
			</div>
		)
		
	}
}
AuthorAttestBack.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default AuthorAttestBack;