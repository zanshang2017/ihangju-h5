import React from 'react';
import styles from './styles.css';

import ArticleList2 from 'components/common/ArticleList2';

import Result from 'antd-mobile/lib/page-result';

import Tabs from 'antd-mobile/lib/tabs';
const TabPane = Tabs.TabPane;

function UserArticle(props) {

    var userInfo = props.userInfo || {};

    var taProjectNumber = userInfo.projects ? userInfo.projects.length : 0;
    var taProjectTitle = `TA创作的作品(${taProjectNumber})`;

    var taContractNumber = userInfo.contractProjects ? userInfo.contractProjects.length : 0;
    var taContractTitle = `TA签约的作品(${taContractNumber})`;

    var projectContent = '';
    var contractProjectsContent = '';
    var nullContent = <Result imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png" title="内容为空"/>;

    if (userInfo.projects && userInfo.projects.length > 0) {
        projectContent = <ArticleList2 {...props} items={userInfo.projects}/>;
    } else {
        projectContent = nullContent;
    }

    if (userInfo.contractProjects && userInfo.contractProjects.length > 0) {
        contractProjectsContent = <ArticleList2 {...props} items={userInfo.contractProjects}/>;
    } else {
        contractProjectsContent = nullContent;
    }

    return (
        <div className={styles.descWrap}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={taProjectTitle} key="1">
                    {projectContent}
                </TabPane>
                <TabPane tab={taContractTitle} key="2">
                    {contractProjectsContent}
                </TabPane>
            </Tabs>
        </div>
    );
}

UserArticle.propTypes = {};

export default UserArticle;


