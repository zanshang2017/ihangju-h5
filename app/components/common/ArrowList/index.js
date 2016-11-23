/**
 * 带箭头的列表,可以指定icon
 */


import React from 'react';

import styles from './styles.css';

import ArrowListItem from '../ArrowListItem';

function ArrowList(props) {
    var items = props.items || [];

    return (
        <div className={styles.list}>
            {
                items.map(function (item, key) {
                    return <ArrowListItem {...props} item={item} key={key} />
                })
            }
        </div>
    );
}

ArrowList.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default ArrowList;


