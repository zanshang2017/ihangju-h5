import React from 'react';

import styles from './styles.css';

import CatelogListItem from '../CatelogListItem';


//todo 下拉刷新有bug
//import ReactPullToRefresh from 'components/common/ReactPullToRefresh/index';
//
//var refreshHandler = null;
//
//function handleRefresh(resolve, reject) {
//    let self = this;
//
//    if (refreshHandler) {
//        refreshHandler();
//    } else {
//        reject();
//    }
//}

function CatelogList(props) {

    var items = props.items || [];

    //refreshHandler = props.refreshHandler || null;

    return (
        <div className="ptr-container">
            {
                //<ReactPullToRefresh onRefresh={handleRefresh} style={{textAlign: 'center'}}>
            }
            <div className={styles.catelogList}>
                {
                    items.map(function (item, key) {
                        return <CatelogListItem key={key} item={item}/>
                    })
                }
            </div>
            {
                //</ReactPullToRefresh>
            }
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


