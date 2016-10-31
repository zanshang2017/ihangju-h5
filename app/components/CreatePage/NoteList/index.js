import styles from './styles.css';
import React from 'react';

import NoteItem from '../NoteItem';
import Result from 'antd-mobile/lib/page-result';


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

        let notesHtml = <Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png?imageMogr2/auto-orient/"
            title="还没有灵感记录哦~"
        />;

        if (notes) {
            notesHtml = notes.map(function (item, key) {
                return <NoteItem data-key={key} key={key} item={item} openNote={that.props.openNote}/>;
            });
        }

        if (notes) {
            return (
                <div ref="J_NoteListWrap" className={styles.noteList}>
                    {notesHtml}
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
