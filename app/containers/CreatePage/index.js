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
} from './selectors';

import {
    selectUserInfo,
} from '../App/selectors'

import {
    loadNotesData,
    loadNote,
    saveNote
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
        this.nEditor = null;
    }

    componentDidMount() {
        this.nMainContent = this.refs.J_MainContentWrap;
        this.J_EditorWrap = this.refs.J_EditorWrap;
    }

    openNote(id) {
        this.props.dispatch(hideNav());
        this.nMainContent.classList.add('hide');
        this.J_EditorWrap.classList.remove('hide');

        //修改
        if (id) {
            this.props.dispatch(loadNote(id));
        }
    }

    saveNote(id, content) {
        this.props.dispatch(showNav());
        this.J_EditorWrap.classList.add('hide');
        this.nMainContent.classList.remove('hide');

        this.props.dispatch(saveNote(id, content));
    }

    routeHandler(url) {
        this.context.router.push(url);
    }

    render() {
        var userInfo = this.props.userInfo;
        var userId = '';

        if (!userInfo) {
            this.routeHandler('/login?redirect=' + encodeURIComponent('/') + 'create');
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
                                <NotePane {...this.props} openNote={this.openNote.bind(this)}/>
                            </TabPane>
                        </Tabs>
                    </div>

                    <div ref="J_EditorWrap" className={`hide`}>
                        <NoteEditor ref="J_Editor" saveNote={this.saveNote.bind(this)}/>
                    </div>

                </div>
            </div>
        );
    }
}

CreatePage.contextTypes = {
    router: function contextType() {
        return React.PropTypes.func.isRequired;
    }
};

const mapStateToProps = createSelector(
    selectNotes(),
    selectUserInfo(),
    selectCurrentNote(),
    (notes, userInfo, currentNote) => {
        return {
            notes,
            userInfo,
            currentNote
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
