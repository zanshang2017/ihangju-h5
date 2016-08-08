/*
 *
 * CreatePage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createSelector} from 'reselect';

import {
    selectCreatePage,
    selectNotes,
    selectCurrentNote,
    selectNoteContent,
} from './selectors';

import {
    selectUserInfo,
} from '../App/selectors'

import {
    clearCurrentNote,
    loadNotesData,
    loadNote,
    saveNote,
    deleteNote,
} from './actions';

import {
    showNav,
    hideNav
} from 'containers/App/actions.js'

import ScanPane from 'components/CreatePage/ScanPane';
import NotePane from 'components/CreatePage/NotePane';
import NoteEditor from 'components/CreatePage/NoteEditor';

import styles from './styles.scss';

import {
    Tabs
} from 'antd';

const TabPane = Tabs.TabPane;

let hasInitLoaded = false;

export class CreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.nMainContent = null;
        this.J_EditorWrap = null;
    }

    componentDidMount() {
        console.log('#### did createpage');
        this.nMainContent = this.refs.J_MainContentWrap;
        this.J_EditorWrap = this.refs.J_EditorWrap;
    }

    openNoteHandler(id) {
        this.props.dispatch(hideNav());
        this.nMainContent.classList.add('hide');
        this.J_EditorWrap.classList.remove('hide');

        this.props.dispatch(clearCurrentNote());

        //修改
        if (id) {
            this.props.dispatch(loadNote(id));
        }
    }

    saveNoteHandler(id, content) {
        this.props.dispatch(showNav());
        this.J_EditorWrap.classList.add('hide');
        this.nMainContent.classList.remove('hide');

        this.props.dispatch(saveNote(id || null, content));
    }

    deleteNoteHandler(id){
        this.props.dispatch(showNav());
        this.J_EditorWrap.classList.add('hide');
        this.nMainContent.classList.remove('hide');

        this.props.dispatch(deleteNote(id || null));
    }

    routeHandler(url) {
        this.context.router.push(url);
    }

    render() {
        var userInfo = this.props.userInfo;
        var userId = '';
        var note = null;

        if (this.props.currentNote) {
            note = this.props.currentNote.toJS();
        } else {
            note = null;
        }

        if (!userInfo) {
            this.routeHandler('/login?redirect=' + encodeURIComponent('/') + 'create');
            // this.routeHandler('/login');
        } else {
            userId = userInfo.toJS().id;
        }

        return (
            <div className="pageInner">
                <div className="createPage">
                    <div ref="J_MainContentWrap">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="扫码创作" key="1">
                                <ScanPane userId={userId}/>
                            </TabPane>
                            <TabPane tab="灵感记录" key="2">
                                <NotePane {...this.props} openNote={this.openNoteHandler.bind(this)}/>
                            </TabPane>
                        </Tabs>
                    </div>

                    <div ref="J_EditorWrap" className={`hide`}>
                        <NoteEditor ref="J_Editor" note={note}
                                    saveNote={this.saveNoteHandler.bind(this)}
                                    deleteNote={this.deleteNoteHandler.bind(this)}
                                    {...this.props} />
                    </div>

                </div>
            </div>
        );
    }
}

CreatePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = createSelector(
    selectNotes(),
    selectUserInfo(),
    selectCurrentNote(),
    selectNoteContent(),
    (notes, userInfo, currentNote, noteContent) => {
        return {
            notes,
            userInfo,
            currentNote,
            noteContent
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        loadNoteList: (page) => {
            dispatch(loadNotesData(page));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
