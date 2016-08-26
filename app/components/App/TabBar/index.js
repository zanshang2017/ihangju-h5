import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function TabBar(props) {

    let tabClass = styles.tabBar;

    if (!props.showNav) {
        tabClass += ' none';
    }

    tabClass += ' ' + (styles[props.curPage] || '');

    return (
        <nav id="nav" className={tabClass}>
            <ul className="clearfix">
                <li><Link to={'/follow'}><span className={`${styles.follow}`}></span><strong>关注</strong></Link></li>
                <li><Link to={'/found'}><span className={`${styles.found}`}></span><strong>发现</strong></Link></li>
                <li><Link to={'/create'}><span className={styles.write}></span><strong>创作</strong></Link></li>
                <li><Link to={'/my'}><span className={styles.my}></span><strong>我的</strong></Link></li>

                <li><Link to={'/bridgeTest'}><span className="follow"></span><strong>Bridge</strong></Link></li>

                <li><Link to={'/projectDetail/57a941f4e4b0ab2d4f0d14cd'}><span className="follow"></span><strong>Detail</strong></Link></li>
                {/*<li><a href="javascript:window.history.back();"><span className="follow"></span><strong>返回</strong></a></li>*/}

                {/*<li><Link to={'/login'}><span className={styles.write}></span><strong>登录</strong></Link></li>*/}
                <li><Link to={'/demo#fliproute'}><span className="follow"></span><strong>Demo</strong></Link></li>
                
            </ul>
        </nav>
    );
}

TabBar.propTypes = {
    showNav: React.PropTypes.bool,
    curPage: React.PropTypes.string,
};

export default TabBar;

