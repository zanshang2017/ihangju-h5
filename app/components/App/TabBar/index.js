import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function TabBar(props) {

    let tabClass = styles.tabBar;

    if (!props.showNav) {
        tabClass += ' none';
    }

    return (
        <nav id="nav" className={tabClass}>
            <ul className="clearfix">
                <li><Link to={'/login'}><span className={styles.write}></span><strong>登录</strong></Link></li>
                <li><Link to={'/create#fliproute'}><span className={styles.write}></span><strong>创作</strong></Link></li>
                <li><Link to={'/follow#fliproute'}><span className={styles.follow}></span><strong>关注</strong></Link></li>
                <li><Link to={'/found#fliproute'}><span className={styles.found}></span><strong>发现</strong></Link></li>
                <li><Link to={'/tag/123456#fliproute'}><span className={styles.my}></span><strong>Tag</strong></Link></li>

                {/*<li><Link to={'/demo#fliproute'}><span className="follow"></span><strong>Demo</strong></Link></li>*/}
                <li><Link to={'/bridgeTest'}><span className="follow"></span><strong>Bridge</strong></Link></li>
                <li><Link to={'/projectDetail/57a941f4e4b0ab2d4f0d14cd#fliproute'}><span className="follow"></span><strong>Detail</strong></Link></li>
                {/*<li><a href="javascript:window.history.back();"><span className="follow"></span><strong>返回</strong></a></li>*/}
            </ul>
        </nav>
    );
}

TabBar.propTypes = {
    showNav: React.PropTypes.bool,
};

export default TabBar;

