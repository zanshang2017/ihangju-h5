/*
 *
 * PushConfigPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {
    selectUserInfo,
} from 'containers/App/selectors';

import {
    updateUserInfo
} from 'containers/App/actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';
import Switch from 'antd-mobile/lib/switch';
import { createForm } from 'rc-form/lib';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

class PushConfigPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
    }

    componentDidMount() {
        console.warn('PushConfigPage DidMount');
    }

    commentChangeHandler(checked) {
        console.log('commentClickHandler', checked);
        this.props.dispatch(updateUserInfo({
            commentpush: checked
        }));

    }

    favoriteChangeHandler(checked) {
        console.log('favoriteClickHandler', checked);
        this.props.dispatch(updateUserInfo({
            favoritepush: checked
        }));
    }

    letterChangeHandler(checked) {
        console.log('letterClickHandler', checked);
        this.props.dispatch(updateUserInfo({
            letterpush: checked
        }));
    }

    render() {
        const { getFieldProps } = this.props.form;

        let that = this;
        let userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        let pushConfig = userInfo.pushConfig;
        this.id = userInfo.id;

        return (
            <div className="pageInner deepBg">
                <TopBar data-has-back="true">
                    <div data-title>推送通知</div>
                </TopBar>
                <List>
                    <List.Body>
                        <List.Item
                            extra={<Switch
                                {...getFieldProps('favorite', {
                                    initialValue: pushConfig.favoritePush,
                                    valuePropName: 'checked',
                                    onChange(checked) {
                                        that.favoriteChangeHandler(checked);
                                    }
                                })}
                            />}
                        >喜欢</List.Item>
                        <List.Item
                            extra={<Switch
                                {...getFieldProps('comment', {
                                    initialValue: pushConfig.commentPush,
                                    valuePropName: 'checked',
                                    onChange(checked) {
                                        that.commentChangeHandler(checked);
                                    }
                                })}
                            />}
                        >评论</List.Item>
                        <List.Item
                            extra={<Switch
                                {...getFieldProps('letter', {
                                    initialValue: pushConfig.letterPush,
                                    valuePropName: 'checked',
                                    onChange(checked) {
                                        that.letterChangeHandler(checked);
                                    }
                                })}
                            />}
                        >私信</List.Item>
                    </List.Body>
                </List>

            </div>
        );
    }
}

PushConfigPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

//const mapStateToProps = selectPushConfigPage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectUserInfo(),
    (userInfo) => ({userInfo})
), mapDispatchToProps)(createForm()(PushConfigPage));
//export default connect(null, mapDispatchToProps)(PushConfigPage);
