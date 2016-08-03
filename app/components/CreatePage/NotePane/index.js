import styles from './styles.css';
import React from 'react';
import NoteList from 'components/CreatePage/NoteList';

/* eslint-disable react/prefer-stateless-function */
export default class NotePane extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    noteClickHander(e) {
        this.props.openNote();
    }

    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.noteBtn} onClick={this.noteClickHander.bind(this)}></div>
                <NoteList {...this.props} />
            </div>
        );
    }
}

NotePane.propTypes = {};


