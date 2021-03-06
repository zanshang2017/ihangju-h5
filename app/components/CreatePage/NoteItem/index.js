import styles from './styles.css';
import React from 'react';
import {
    convertDate
} from '../../../utils/util.js';

import {router} from 'react-router';

/* eslint-disable react/prefer-stateless-function */
export default class NoteItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    handlerClick(e) {
        var node = e.currentTarget;
        var id = this.item.id || 0;
        this.props.openNote(id);
    }

    render() {
        this.item = this.props.item.toJS();
        var time = convertDate(this.item.modifyTime, 'YYYY/MM/DD');

        return (
            <li data-hashover="true" className={`${styles.noteItem}`} onClick={this.handlerClick.bind(this)}>
                <span className={styles.content}>{this.item.content}</span>
                <div className={styles.right}>
                    <span className={styles.time}>{time}</span>
                    <i className="iconRight"></i>
                </div>
            </li>
        );
    }
}

NoteItem.propTypes = {
    openNote: React.PropTypes.func,
    item: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ]),
};

NoteItem.contextTypes = {
    router: React.PropTypes.object.isRequired
};

