import React from 'react';

import styles from './styles.css';

import CommentListItem from '../CommentListItem';

function CommentList(props) {

    var items = (props.items && props.items.toJS) ? props.items.toJS() : [];

    return (
        <div className={styles.list}>
            {
                items.map(function (item, key) {
                    return <CommentListItem {...props} item={item} key={key} />
                })
            }
        </div>
    );
}

CommentList.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default CommentList;


