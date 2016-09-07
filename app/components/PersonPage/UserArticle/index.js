import React from 'react';
import styles from './styles.css';

import ArticleList2 from 'components/common/ArticleList2';

import Tabs from 'antd-mobile/lib/tabs';
const TabPane = Tabs.TabPane;

function UserArticle(props) {

    var imageSrc = '';
    var userInfo = props.userInfo || {};

    var taProjectNumber = userInfo.projects ? userInfo.projects.length : 0;
    var taProjectTitle = `TA创作的作品(${taProjectNumber})`;

    var taContractNumber = userInfo.contractProjects ? userInfo.contractProjects.length : 0;
    var taContractTitle = `TA签约的作品(${taContractNumber})`;

    return (
        <div className={styles.descWrap}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={taProjectTitle} key="1">
                    <ArticleList2 items={userInfo.projects || []} />
                </TabPane>
                <TabPane tab={taContractTitle} key="2">
                    <ArticleList2 items={userInfo.contractProjects || []} />
                </TabPane>
            </Tabs>
        </div>
    );
}

UserArticle.propTypes = {};

export default UserArticle;


