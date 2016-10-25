import styles from './styles.css';
import React from 'react';
import {router} from 'react-router';

import TopBar from 'components/common/TopBar';

import {
    updateEditNoteContent,
} from '../../../containers/CreatePage/actions'

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

        this.refs.J_Content.addEventListener('focus', function(){
            this.refs.J_DeleteBtn.classList.add('hide');
        }.bind(this));

        this.refs.J_Content.addEventListener('blur', function(){
            this.refs.J_DeleteBtn.classList.remove('hide');
        }.bind(this));
    }

    save() {
        var nContent = this.refs.J_Content;
        var id = this.note ? this.note.id : null;
        this.props.saveNote(id, nContent.value);
    }

    delete() {
        var id = this.note ? this.note.id : null;
        this.props.deleteNote(id);
    }

    focusEditor() {
        this.refs.J_Content.focus();
    }

    changeHandler(e) {
        this.props.dispatch(updateEditNoteContent(e.target.value));
    }

    render() {
        var modifyTime = '';

        if (this.props.note) {
            this.note = this.props.note;
            modifyTime = convertDate(this.note.modifyTime) || '';
        } else {
            this.note = null;
        }

        return (
            <div className={styles.noteEditor}>
                <TopBar data-has-back="true" backHandler={this.props.backFromNote.bind(this)}>
                    <div data-btns>
                        <div onClick={this.save.bind(this)}>保存</div>
                    </div>
                </TopBar>
                <div className="mainContent">
                    <div className={styles.savedTime}>{modifyTime}</div>
                    <textarea ref="J_Content" className={styles.content} value={this.props.noteContent}
                              onChange={this.changeHandler.bind(this)}/>
                    <div ref="J_DeleteBtn" className={styles.deleteNote} onClick={this.delete.bind(this)}><i className="iconfont icon-delete"></i></div>
                </div>
            </div>
        );
    }
}

NoteEditor.propTypes = {
    saveNote: React.PropTypes.func,
    deleteNote: React.PropTypes.func,
    backFromNote: React.PropTypes.func,
    note: React.PropTypes.object,
    noteContent: React.PropTypes.string,
};

