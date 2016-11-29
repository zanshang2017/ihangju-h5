import React from 'react';
import style from './style.css';

class ProjectSignLayer extends React.Component {
	showSignLayer() {
        let signDom = this.refs._signLayer;
        signDom.classList.remove('hide');
    }
    hideSignLayer() {
        let signDom = this.refs._signLayer;
        signDom.classList.add('hide');
    }
	render() {
		return (
			<div ref="_signLayer" className={`${style.signBg} hide`}>
				<div className={style.layerCon}>
					<p>通过服务商认证后，您才可以购买版权</p>
					<div className={style.btnList}>
						<span onClick={this.hideSignLayer.bind(this)} className={style.btnLeft}>再想想</span>
						<span className={style.btnRight}>去认证</span>
					</div>	
				</div>
			</div>
		)
	}
}
export default ProjectSignLayer;