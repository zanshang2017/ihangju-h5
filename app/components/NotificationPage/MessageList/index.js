import React from 'react';

import styles from './styles.css';

import MessageListItem from '../MessageListItem';

function MessageList(props) {

    var items = (props.items && props.items.toJS) ? props.items.toJS() : [];

    return (
        <div className={styles.list}>
            {
                items.map(function (item, key) {
                    return <MessageListItem {...props} item={item} key={key} />
                })
            }
        </div>
    );
}

MessageList.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default MessageList;


