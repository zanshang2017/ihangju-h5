import React from 'react';

import styles from './styles.css';

import CatelogListItem from '../CatelogListItem';

function CatelogList(props) {

    var items = props.items || [];

    return (
        <div className="ptr-container">
            <div className={styles.catelogList}>
                {
                    items.map(function (item, key) {
                        return <CatelogListItem key={key} item={item}/>
                    })
                }
            </div>
        </div>
    );
}

CatelogList.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default CatelogList;


