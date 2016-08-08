import styles from './styles.css';
import React from 'react';

import NoteItem from '../NoteItem';

/* eslint-disable react/prefer-stateless-function */
export default class NoteList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('noteList Did');
        this.fetchNoteList();
    }

    fetchNoteList() {
        this.props.loadNoteList();
    }

    render() {
        let that = this;
        let notes = this.props.notes;

        if (notes) {
            return (
                <div ref="J_NoteListWrap" className={styles.noteList}>
                    {
                        notes.map(function (item, key) {
                            return <NoteItem data-key={key} key={key} item={item} openNote={that.props.openNote}/>;
                        })
                    }
                </div>
            );
        }

        return <div className={styles.noteList}></div>;

    }
}

NoteList.propTypes = {
    loadNoteList: React.PropTypes.func,
    openNote: React.PropTypes.func,
    notes: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
        React.PropTypes.bool,
    ])
};
