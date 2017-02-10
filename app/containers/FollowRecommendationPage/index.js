/*
 *
 * FollowRecommendationPage
 *
 * 关注推荐页
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
    selectRecommendation,
    selectChoiceType,
} from './selectors';

import {
    loadRecommendationData,
    changeChoiceType,
    toggleSelect,
    settingFollow,
} from './actions';

import {
    CHOICE_TYPE
} from './constants';

import styles from './styles.css';

import signals from './signals';

import TopBar from 'components/common/TopBar';
import UserList from 'components/FollowRecommendationPage/UserList';
import TagList from 'components/FollowRecommendationPage/TagList';

import {goBackAndReplace} from 'utils/util';

import Toast from 'antd-mobile/lib/toast';

const TAGS_NUMBER_LIMIT = 3;
const USERS_NUMBER_LIMIT = 3;

export class FollowRecommendationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.choiceType = CHOICE_TYPE.TAGS;
    }

    componentWillMount() {
        this.props.dispatch(loadRecommendationData());
    }

    componentDidMount() {
        console.warn('FollowRecommendationPage DidMount');

        signals.putFollowSuccess.add(()=> {
            setTimeout(function () {
                Toast.hide();
                signals.putFollowSuccess.removeAll();
                signals.putFollowError.removeAll();
                goBackAndReplace(-2, '/');
            }, 1200);
        });

        signals.putFollowError.add(()=> {
            Toast.hide();
            Toast.fail('请求失败!', 1);
        });
    }

    componentWillUnmount() {
        signals.putFollowSuccess.removeAll();
        signals.putFollowError.removeAll();
    }

    onNextBtnClick() {
        let _tags = [];

        this.props.recommendation.data.tags.map(function (v) {
            if (v.selected) {
                _tags.push(v.id);
            }
        });

        if(_tags.length < TAGS_NUMBER_LIMIT) {
            Toast.info(`请至少关注${TAGS_NUMBER_LIMIT}个标签!`, 2);
            return;
        }

        this.props.dispatch(changeChoiceType(CHOICE_TYPE.USERS));
    }

    onEnterBtnClick() {
        let _tags = [],
            _users = [];

        this.props.recommendation.data.tags.map(function (v) {
            if (v.selected) {
                _tags.push(v.id);
            }
        });

        this.props.recommendation.data.users.map(function (v) {
            if (v.selected) {
                _users.push(v.id);
            }
        });

        if(_users.length < USERS_NUMBER_LIMIT) {
            Toast.info(`请至少关注${USERS_NUMBER_LIMIT}个用户!`, 2);
            return;
        }

        Toast.loading('请稍后...', 10, ()=> {
            Toast.fail('请求超时,请检查网络');
        });

        this.props.dispatch(settingFollow(_tags, _users));
        // console.log(_tags, _users);
    }

    backHandler() {
        this.props.dispatch(changeChoiceType(CHOICE_TYPE.TAGS));
    }

    toggleSelect(id, type) {
        this.props.dispatch(toggleSelect(id, type));
    }

    render() {
        var topBar = null;
        var btn = null;
        var list = null;

        var choiceType = this.props.choiceType;

        if (this.props.recommendation.data) {
            var tags = this.props.recommendation.data.tags || [];
            var users = this.props.recommendation.data.users || [];
        }

        if (choiceType == CHOICE_TYPE.TAGS) {
            topBar = <TopBar data-has-back="false">
                <div data-title>推荐关注标签</div>
            </TopBar>;

            list = <TagList ref="J_TagList" items={tags} toggleSelect={this.toggleSelect.bind(this)}></TagList>;

            btn = <button onClick={this.onNextBtnClick.bind(this)}>下一步</button>;

        } else {
            topBar = <TopBar data-has-back="true" backHandler={this.backHandler.bind(this)}>
                <div data-title>推荐关注用户</div>
            </TopBar>;

            list = <UserList ref="J_UserList" items={users} toggleSelect={this.toggleSelect.bind(this)}></UserList>;

            btn = <button onClick={this.onEnterBtnClick.bind(this)}>进入行距</button>;
        }

        return (
            <div className="pageInner">
                {topBar}
                <div className={`${styles.wrap} mainContent`}>
                    {list}
                </div>
                <div className={styles.btnBar}>
                    {btn}
                </div>
            </div>
        );
    }
}

FollowRecommendationPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectRecommendation(),
    selectChoiceType(),
    (recommendation, choiceType) => ({recommendation, choiceType})
), mapDispatchToProps)(FollowRecommendationPage);


