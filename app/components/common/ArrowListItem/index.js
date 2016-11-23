import React from 'react';

import styles from './styles.css';

import {convertDate} from '../../../utils/util.js';


function ArrowListItem(props) {
    let item = props.item;
    let _icon = <i></i>;
    let _html = <div></div>;

    // 除text外,其余字段可以指定,在点击触发后回传给回调函数
    // {
    //     text: '文字', //必填
    //     id: 41234123123,
    // }

    if (props.icon) {
        _icon = <i className={`${styles.beforeIcon} ${props.icon}`}></i>
    }

    if (item) {
        _html = <div className={styles.textWrap}>
            {_icon}
            {item.text}
        </div>
    }

    function clickHandler() {
        props.clickHandler(item);
    }

    return (
        <div className={`${styles.item}`} data-hashover="true" data-id={item.id} onClick={clickHandler}>
            {_html}
            <i className={`${styles.afterIcon} iconRight`}></i>
        </div>
    );
}

ArrowListItem.propTypes = {};

export default ArrowListItem;


