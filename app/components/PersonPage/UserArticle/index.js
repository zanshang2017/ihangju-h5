import React from 'react';
import styles from './styles.css';

import ArticleList2 from 'components/common/ArticleList2';

import Result from 'antd-mobile/lib/page-result';

import Tabs from 'antd-mobile/lib/tabs';
const TabPane = Tabs.TabPane;


class UserArticle extends React.Component {

    componentDidMount() {
        this.forceUpdate();
    }

    render() {

        var personInfo = this.props.personInfo || {};

        var taProjectNumber = personInfo.projects ? personInfo.projects.length : 0;
        var taProjectTitle = `TA创作的作品(${taProjectNumber})`;

        var taContractNumber = personInfo.contractProjects ? personInfo.contractProjects.length : 0;
        var taContractTitle = `TA签约的作品(${taContractNumber})`;

        var projectContent = '';
        var contractProjectsContent = '';
        var nullContent = <Result imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png"
                                  title="还没有内容哦~"/>;

        console.log('personInfo.projects:', personInfo.projects, taProjectNumber, taProjectTitle);

        if (!personInfo || (personInfo.projects && personInfo.projects.length <= 0)) {
            projectContent = nullContent;
        } else {
            projectContent = <ArticleList2 {...this.props} items={personInfo.projects}/>;
        }

        if (!personInfo || (personInfo.contractProjects && personInfo.contractProjects.length <= 0)) {
            contractProjectsContent = nullContent;
        } else {
            contractProjectsContent = <ArticleList2 {...this.props} items={personInfo.contractProjects}/>;
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
}

UserArticle.propTypes = {};

export default UserArticle;


