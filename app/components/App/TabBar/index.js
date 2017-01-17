import React from 'react';
import styles from './styles.css';

import _ from 'underscore';

class TabBar extends React.Component {
    constructor(props) {
        super(props);

        this.routeHandler = this.routeHandler.bind(this);
    }

    componentWillMount() {
        this.isDuringDelay = false;
        this.timer = null;
        this.pageName = '';
    }

    routeHandler(e) {
        let newPageName = e.currentTarget.dataset['id'];

        if (!this.isDuringDelay || (this.pageName != newPageName)) {
            this.pageName = newPageName;
            this.doRoute();
            console.log('跳转', newPageName)
        } else {
            console.log("被阻止")
        }
    }

    doRoute() {
        let that = this;

        this.context.router.replace(this.pageName);
        this.isDuringDelay = true;

        this.timer = setTimeout(function () {
            that.isDuringDelay = false;
        }, 1000);
    }

    render() {
        let nNav = this.refs.J_Nav;
        let tabCls = styles.tabBar;
        let noTabBarCls = 'none'; //styles.noTabBar;
        let curPageCls = styles[this.props.curPage] || '';

        if(nNav) {
            if (!this.props.showNav) {
                nNav.classList.add(noTabBarCls);
            } else {
                nNav.classList.remove(noTabBarCls);
            }

            curPageCls && nNav.classList.add(curPageCls);
        }

        return (
            <nav id="nav" ref="J_Nav" className={`${tabCls} ${curPageCls}`}>
                <ul>
                    <li data-hashover="true"><a data-id="/follow" onClick={this.routeHandler}><span
                        className={`${styles.follow}`}></span><strong>关注</strong></a></li>
                    <li data-hashover="true"><a data-id="/found" onClick={this.routeHandler}><span
                        className={`${styles.found}`}></span><strong>发现</strong></a>
                    </li>
                    <li data-hashover="true"><a data-id="/create" onClick={this.routeHandler}><span
                        className={styles.write}></span><strong>创作</strong></a></li>
                    <li data-hashover="true"><a data-id="/my" onClick={this.routeHandler}><span
                        className={styles.my}></span><strong>我的</strong></a></li>
                    {/*<li><Link to={'/projectDetail/57a941f4e4b0ab2d4f0d14cd'}><span className="follow"></span><strong>Detail</strong></Link></li>*/}
                    {/*<li><Link to={'/bridgeTest'}><span className="follow"></span><strong>Bridge</strong></Link></li>*/}
                    {/*<li><Link to={'/login'}><span className={styles.write}></span><strong>登录</strong></Link></li>*/}
                    {/*<li data-hashover="true"><a data-id="/demo" onClick={this.routeHandler.bind(this)}><span className={styles.my}></span><strong>Demo</strong></a></li>*/}
                </ul>
            </nav>
        );
    }

}


TabBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};


TabBar.propTypes = {
    showNav: React.PropTypes.bool,
    curPage: React.PropTypes.string,
};

export default TabBar;
