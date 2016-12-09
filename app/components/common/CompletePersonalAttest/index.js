import React from 'react';
import styles from './style.css';

class CompletePersonalAttest extends React.Component{
	render() {
		return (
			<div className={styles.completePersonal}>
				<div className={styles.layerCon}>
					<div className={styles.topImg}>
						<img src="https://o82zr1kfu.qnssl.com/@/image/5848cefae4b05c2d3be5390a.png?imageView2/2/w/300" />
					</div>
					<div className={styles.centerText}>
						<span className={styles.text1}>服务商想签你的作品</span>
						<span className={styles.text2}>需要完善信息认证，才能完成签约</span>
					</div>
					<div className={styles.footerBtn}>
						去完善
					</div>
				</div>
			</div>
		)
	}
}

export default CompletePersonalAttest;
