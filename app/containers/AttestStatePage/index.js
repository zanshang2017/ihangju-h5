import React from 'react';
import {connect} from 'react-redux';
import {router} from 'react-router';

import styles from './style.css';
import {createSelector} from 'reselect';
import {
	selectAttestStateData
} from './selectors'

import {
	loadAttestStateData
} from './actions'

import TopBar from 'components/common/TopBar';

class AttestState extends React.Component {
	constructor(props) {
        super(props)
    }
    componentWillMount() {
        if (this.props.routeParams) {
            var id = this.props.routeParams.id;
            this.props.dispatch(loadAttestStateData(id));
        }

    }
    authorAttestClick() {
        if (this.props.routeParams) {
            var id = this.props.routeParams.id;
            this.context.router.push('/authorAttest/' + id);
        }
    }
    failClick() {
        let attestState = this.props.attestStateData.toJS();
        if (this.props.routeParams) {
            var id = this.props.routeParams.id;
            if(attestState.type == 'individual') {
                this.context.router.push('/servicPersonal/' + id);
            }else {
                this.context.router.push('/serviceAgency/' + id);
            }
            
        }
    }
    passClick() {
        let dom = this.refs.J_changeLayer;
        dom.classList.remove('hide');
    }
    backClick() {
        //this.context.router.goBack();
        this.context.router.push('/my');
    }
    goIndexClick() {
        this.context.router.push('/');
    }
    closeLayer() {
        let dom = this.refs.J_changeLayer;
        dom.classList.add('hide');
    }
    changeLayer() {
        this.failClick();
    }
    render() {
        let attestState = this.props.attestStateData.toJS();
        let conDom = '';
        if(attestState.type == 'author') {
            conDom = <div><img className={styles.stateImg} src='https://o82zr1kfu.qnssl.com/@/image/5850f41de4b05c2d3beea94b.png' />
                    <span className={styles.titleText}>已备案</span>
                    <span className={styles.conText}>您的认证材料已经提交完成，材料仅会展示给想要与您签约的服务商</span>
                    <span onClick={this.authorAttestClick.bind(this)} className={styles.authorBtn}>修改认证信息</span></div>
        }else {
            if(attestState.verify_status == 'passing') {
                conDom = <div><img className={styles.stateImg} src='https://o82zr1kfu.qnssl.com/@/image/5850f54fe4b05c2d3beeac1f.png' />
                    <span className={styles.titleText}>认证通过</span>
                    <span className={styles.conText}>您的认证通过审核</span>
                    <span onClick={this.goIndexClick.bind(this)} className={`${styles.btn} ${styles.passingLeftBtn}`}>回首页</span>
                    <span onClick={this.passClick.bind(this)} className={`${styles.btn} ${styles.passingRightBtn}`}>修改认证信息</span>
                    <div ref="J_changeLayer" className={`${styles.backBg} hide`}>
                    <div className={styles.layerCon}>
                        <span className={styles.topText}>修改认证信息后，需要重新进行认证审核</span>
                        <div className={styles.btnList}>
                            <span onClick={this.closeLayer.bind(this)} className={styles.btnLeft}>算了</span>
                            <span onClick={this.changeLayer.bind(this)} className={styles.btnRight}>去修改</span>
                        </div>  
                    </div>
                </div>
                    </div>

            }else if (attestState.verify_status == 'review'){
                conDom = <div><img className={styles.stateImg} src='https://o82zr1kfu.qnssl.com/@/image/5850f5d0e4b05c2d3beeac28.png' />
                    <span className={styles.titleText}>提交成功</span>
                    <span className={styles.conText}>您的材料已经提交完成，审核时间预计为2-5天</span></div>
            }else if(attestState.verify_status == 'fail'){
                let failMesArr ='';
                let failMeshtml = '';
                if(attestState.type == "individual") {
                    failMesArr = attestState.individual.identityreviewfail || []
                }else {
                    failMesArr = attestState.agency.identityreviewfail || []
                }
                failMeshtml = failMesArr.map(function(item,key) {
                    return <span key={key}>
                              {key+1}.{item}                  
                        </span>   
                })
                conDom = <div className= {styles.failDiv}><img className={`${styles.stateImg} ${styles.failTop}`} src='https://o82zr1kfu.qnssl.com/@/image/5850f4dde4b05c2d3beeac1b.png' />
                    <span className={styles.titleText}>认证未通过</span>
                    <span className={styles.conText}>
                        <div className={styles.left}>原因：</div>
                        <div className={styles.right}>{failMeshtml}</div>
                    </span>
                    <span onClick={this.failClick.bind(this)} className={`${styles.btn} ${styles.failLeftBtn}`}>修改认证信息</span>
                    <span className={`${styles.btn} ${styles.failRightBtn}`}>联系客服</span></div>
            }
        }

        return (
            <div className={styles.attestState}>
                <TopBar >
                    <div data-title>身份认证</div>
                    <div data-btns>
                        <span onClick={this.backClick.bind(this)}>完成</span>
                    </div>
                </TopBar>
              	{conDom}
                
            </div>
        )
    }
}

AttestState.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps = createSelector(
    selectAttestStateData(),
    (attestStateData) => {
        return {
            attestStateData
        }
    }
);
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttestState);
