/**
 * Created by Howard on 16/6/21.
 */
import React from 'react';
import styles from './styles.css';

function TopBarItem(props) {
    let delItem = () => {
        props.delItemHandler(props.order);
    }

    return (
        <li className={styles.bg1}>{props.itemText}  |  <div className={styles.del} onClick={delItem}>删除</div></li>
    );
}

export default TopBarItem;

