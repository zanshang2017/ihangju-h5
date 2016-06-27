import React from 'react';
import styles from './styles.css';

function DemoList(props) {

    let listContent = '';

    if(!props.items || props.items.size < 1){
        listContent = <li>加载中...</li>
    } else {
        listContent = (
            props.items.map(function (item, key) {
                return <li key={key}>{item.description}</li>
            })
        )
    }

    return (
        <ul className={styles.myUL}>
            {listContent}
        </ul>
    );
}

DemoList.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default DemoList;


