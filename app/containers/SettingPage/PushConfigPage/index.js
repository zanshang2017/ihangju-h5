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
    loadUserInfo,
    updateUserInfo,
} from 'containers/App/actions';

import styles from './styles.css';

import TopBar from 'components/common/TopBar';
import List from 'antd-mobile/lib/list';
import Switch from 'antd-mobile/lib/switch';
import {createForm} from 'rc-form/lib';

class PushConfigPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.id = '';
    }

    componentWillMount() {
        this.userInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
        this.pushConfig = this.userInfo.pushConfig;
    }

    componentDidMount() {
        console.warn('PushConfigPage DidMount');
    }

    commentChangeHandler(checked) {
        console.log('commentClickHandler', checked);
        this.dispatchConfig('commentPush', checked);
    }

    favoriteChangeHandler(checked) {
        console.log('favoriteClickHandler', checked);
        this.dispatchConfig('favoritePush', checked);
    }

    letterChangeHandler(checked) {
        console.log('letterClickHandler', checked);
        this.dispatchConfig('letterPush', checked);
    }

    dispatchConfig(key, checked) {
        if (typeof key === 'string' && (key in this.pushConfig)) {
            this.pushConfig[key] = checked;
            console.log('推送:', this.pushConfig);
            this.props.dispatch(updateUserInfo(this.pushConfig));
        }
    }

    render() {
        const {getFieldProps} = this.props.form;

        let that = this;
        let pushConfig = this.userInfo.pushConfig;
        this.id = this.userInfo.id;

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
