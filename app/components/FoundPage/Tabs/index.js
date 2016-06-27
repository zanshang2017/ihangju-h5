import React from 'react';

import styles from './styles.css';

function Tabs(props) {
    return (
        <div className={styles.tabs}>
            <ul>
                <li className={styles.active}>推荐</li>
                <li>分类</li>
            </ul>
        </div>
    );
}

Tabs.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default Tabs;


