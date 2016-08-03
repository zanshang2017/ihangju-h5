import styles from './styles.css';
import React from 'react';
import {router} from 'react-router';

import TopBar from 'components/common/TopBar';

import {
    convertDate
} from '../../../utils/util.js';

/* eslint-disable react/prefer-stateless-function */
export default class NoteEditor extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var nContent = this.refs.J_Content;
        var contentH = document.body.clientHeight - document.getElementById('nav').getBoundingClientRect().height;
        nContent.style.height = contentH + 'px';
    }

    save() {
        var nContent = this.refs.J_Content;
        this.props.saveNote(this.note.id || -1, nContent.value);
    }

    render() {
        var content = '',
            modifyTime = '';

        if (this.props.note) {
            this.note = this.props.note;
            content = this.note.content || '';
            modifyTime = convertDate(this.note.modifyTime) || '';
        }

        console.log(content);

        return (
            <div className={styles.noteEditor}>
                <TopBar data-has-back="true" backHandler={this.save.bind(this)}>
                    <div data-btns>
                        <div onClick={this.save.bind(this)}>保存</div>
                    </div>
                </TopBar>
                <div className="hasTopBar">
                    <div className={styles.savedTime}>{modifyTime}</div>
                    <textarea ref="J_Content" className={styles.content} />
                    <div className={styles.deleteNote}><i className="iconfont icon-delete"></i></div>
                </div>
            </div>
        );
    }
}

NoteEditor.propTypes = {};

