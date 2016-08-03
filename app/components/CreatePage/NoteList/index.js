import styles from './styles.css';
import React from 'react';

import NoteItem from '../NoteItem';

/* eslint-disable react/prefer-stateless-function */
export default class NoteList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.notes) {
            this.props.loadNoteList();
        }

        this.openNote = this.props.openNote;
    }

    openNote() {
        alert(1);
        this.props.openNote();
    }

    render() {
        let that = this;
        let notes = this.props.notes;

        if (notes) {
            return (
                <div ref="J_NoteListWrap" className={styles.noteList}>
                    {

                        notes.map(function (item, key) {
                            return <NoteItem data-key={key} key={key} item={item} openNote={that.openNote} />;
                        })
                    }
                </div>
            );
        }

        return <div className={styles.noteList}></div>;

    }
}

NoteList.propTypes = {};
