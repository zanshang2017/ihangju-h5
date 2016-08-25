/**
 * Created by Howard on 16/6/21.
 */
import React from 'react';
import styles from './styles.css';

import Button from 'antd-mobile/lib/button';

// import { Button } from 'antd-mobile';


function TopBarItem(props) {
    let delItem = () => {
        props.delItemHandler(props.order);
    }

    return (
        <div>
            <Button>Start</Button>
            <li className={styles.bg1}>{props.itemText}  |  <div className={styles.del} onClick={delItem}>删除</div></li>
        </div>
    );
}

export default TopBarItem;

