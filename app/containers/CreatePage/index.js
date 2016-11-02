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
    selectIdentify,
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
    identifyAuth,
} from './actions';

import {
    showNav,
    hideNav
} from 'containers/App/actions.js'

import ScanPane from 'components/CreatePage/ScanPane';
import NotePane from 'components/CreatePage/NotePane';
import NoteEditor from 'components/CreatePage/NoteEditor';

// import styles from './styles.scss';

import Tabs from 'antd-mobile/lib/tabs';

const TabPane = Tabs.TabPane;

export class CreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.nMainContent = null;
        this.J_EditorWrap = null;
        this.userId = '';
    }

    componentWillMount() {
        var userInfo = this.props.userInfo;

        if (!userInfo) {
            this.routeHandler('/login?redirect=' + encodeURIComponent('/') + 'create');
            return;
        } else {
            this.userId = userInfo.toJS().id;
            this.props.dispatch(identifyAuth());
        }
    }

    componentDidMount() {
        this.nMainContent = this.refs.J_MainContentWrap;
        this.J_EditorWrap = this.refs.J_EditorWrap;
        console.warn('CreatePage DidMount');
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

    backFromNote() {
        this.props.dispatch(showNav());
        this.J_EditorWrap.classList.add('hide');
        this.nMainContent.classList.remove('hide');
    }

    saveNoteHandler(id, content) {
        this.backFromNote();
        this.props.dispatch(saveNote(id || null, content));
    }

    deleteNoteHandler(id) {
        this.props.dispatch(showNav());
        this.J_EditorWrap.classList.add('hide');
        this.nMainContent.classList.remove('hide');

        this.props.dispatch(deleteNote(id || null));
    }

    routeHandler(url) {
        this.context.router.replace(url);
    }

    render() {
        let note = null;

        if (this.props.currentNote) {
            note = this.props.currentNote.toJS();
        } else {
            note = null;
        }

        if (this.props.identify) {
            this.identify = this.props.identify;
            if (this.identify.type === 'author' || this.identify.type === null) {
                this.isAuthor = true;
            }
        } else {
            this.isAuthor = false;
        }

        return (
            <div className="pageInner">
                <div className="mainContent">
                    <div ref="J_MainContentWrap">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="扫码创作" key="1">
                                <ScanPane userId={this.userId} isAuthor={this.isAuthor}/>
                            </TabPane>
                            <TabPane tab="灵感记录" key="2">
                                <NotePane {...this.props} openNote={this.openNoteHandler.bind(this)}/>
                            </TabPane>
                        </Tabs>
                    </div>

                    <div ref="J_EditorWrap" className={` hide`}>
                        <NoteEditor ref="J_Editor" note={note}
                                    saveNote={this.saveNoteHandler.bind(this)}
                                    deleteNote={this.deleteNoteHandler.bind(this)}
                                    backFromNote={this.backFromNote.bind(this)}
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
    selectIdentify(),
    (notes, userInfo, currentNote, noteContent, identify) => {
        return {
            notes,
            userInfo,
            currentNote,
            noteContent,
            identify,
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
