import React, {PropTypes, Component} from 'react';
import PullRefresh from './PullRefresh';
import styles from './styles.scss';

class ReactPullRefresh extends Component {
    //可能需要传入的参数
    static propTypes = {
        className: PropTypes.string, // 自定义 className
        children: PropTypes.node, //待渲染的内容
        refreshCallback: PropTypes.func, //上拉刷新回调函数，需要是 promise 函数
        refresh: PropTypes.bool, //是否显示刷新

        wrap: PropTypes.node, //外层容器,用于计算滚动距离
    };

    static defaultProps = {
        className: '',
        refresh: true,
    };

    componentDidMount() {
        const {container, ptrEl} = this.refs;
        const {
            refreshCallback, refresh
        } = this.props;

        this.pullRefresh = new PullRefresh({
            container,
            ptrEl,
            refreshCallback,
            refresh
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.pullRefresh.unmount(true);
    }

    render() {
        const {
            className, children, refresh
        } = this.props;

        return (
            <div className={`${styles['rc-pull-refresh']} ${className}`} ref="container">
                {refresh ? (<div ref="ptrEl" className={`${styles['rc-ptr-box']}`}>
                    <div className={`${styles['rc-ptr-container']}`}>
                        <div className={`${styles['rc-ptr-image']}`}></div>
                    </div>
                </div>) : null}
                {children}
            </div>
        );
    }
}

export default ReactPullRefresh;
