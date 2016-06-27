import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function NavBar(props) {

    let navClass = styles.nav;

    if (!props.showNav) {
        navClass += ' none';
    }

    return (
        <nav id="nav" className={navClass}>
            <ul className="clearfix">
                <li><Link to={'/'}><span className={styles.write}></span><strong>登录</strong></Link></li>
                <li><Link to={'/follow#fliproute'}><span className={styles.follow}></span><strong>关注</strong></Link></li>
                <li><Link to={'/found#fliproute'}><span className={styles.found}></span><strong>发现</strong></Link></li>
                <li><Link to={'/my#fliproute'}><span className={styles.my}></span><strong>我的</strong></Link></li>
            </ul>
        </nav>
    );
}

NavBar.propTypes = {
    showNav: React.PropTypes.bool,
};

export default NavBar;


