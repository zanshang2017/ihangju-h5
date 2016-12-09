/**
 * @author 大鹏
 */

import React from 'react';
import styles from './style.css';

class ImageWithDescPanel extends React.Component {

    show() {
        this.refs.J_Wrap.classList.remove('hide');
    }

    hide() {
        this.refs.J_Wrap.classList.add('hide');
    }

    render() {
        return (
            <div ref="J_Wrap" className={`${styles.completePersonal} hide`}>
                <div className={styles.layerCon}>
                    <div className={styles.topImg}>
                        {this.props.image && <img src={this.props.image} />}
                    </div>
                    <div className={styles.centerText}>
                        <span className={styles.text1}>{this.props.title}</span>
                        <span className={styles.text2}>{this.props.desc}</span>
                    </div>
                    <div className={styles.footerBtn} onClick={this.props.onClick}>
                        {this.props.okText}
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageWithDescPanel;
