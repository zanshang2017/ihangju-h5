import React from 'react';

import styles from './styles.css';

function Banner(props) {
    return (
        <div className={styles.banner}>
            <img src="https://o82zr1kfu.qnssl.com/@/image/576cd5bce4b0b2aa0cf8690e.png" />
        </div>
    );
}

Banner.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default Banner;


