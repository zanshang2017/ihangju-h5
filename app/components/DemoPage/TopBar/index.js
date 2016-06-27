import React from 'react';

import styles from './styles.css';

import TopBarItem from 'components/DemoPage/TopBarItem';

function TopBar(props) {
    return (
        <ul className={styles.bg1}>
            {
                props.items.map(function (item, key) {
                    return <TopBarItem key={key} order={key} itemText={item} {...props}/>
                })
            }
        </ul>
    );
}

TopBar.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default TopBar;


