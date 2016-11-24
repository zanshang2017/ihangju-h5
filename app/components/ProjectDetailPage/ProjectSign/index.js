import React from 'react';
import style from './style.css';



class ProjectSign extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        var props = this.props;
        var _result = props.projectDetail.toJS();
        var salecopyright = _result.salecopyright || [];
        var soldoutcopyright = _result.soldoutcopyright || [];
        var salecopyrightstatus = _result.salecopyrightstatus || [];
        
        var salecopyrightList = '';
        var soldoutcopyrightList = '';
        var salecopyrightstatusList = '';
        if (!_result || (_result && salecopyright.size < 1)) {
            salecopyrightList = '';
        } else {
            salecopyrightList = salecopyright.map(function (item, key) {
                return <li key={key}>
                    {item}
                </li>
            });
        }

        if (!_result || (_result && soldoutcopyright.size < 1)) {
            soldoutcopyrightList = '';
        } else {
            soldoutcopyrightList = soldoutcopyright.map(function (item, key) {
                return <li key={key}>
                    {item}
                </li>
            });
        }

        if (!_result || (_result && salecopyrightstatus.size < 1)) {
            salecopyrightstatusList = '';
        } else {
            salecopyrightstatusList = salecopyrightstatus.map(function (item, key) {
                return <div className={style.salecopyrightstatusText} key={key}>
                    <span className={style.salecopyrightstatusTitle}>{item.title}</span>
                    <span className={style.salecopyrightstatusNumber}>{item.number}人发起签约申请，已售出</span>
                </div>
            });
        }
        var _html = '';
        if (_result) {
            _html = <div>
                <span className={style.title}>Ta的作品权利</span>
                <div className={style.salecopyright}>
                    <span>可授权</span>
                    <ul>
                        {salecopyrightList}
                    </ul>
                </div>
                <div className={style.soldoutcopyright}>
                    <span>已授权</span>
                    <ul>
                        {soldoutcopyrightList}
                    </ul>
                </div>
                <div className={style.salecopyrightstatus}>
                    {salecopyrightstatusList}
                </div>
            </div>;
        }

        return (
            <div className={style.projectSign}>
                {_html}
            </div>
        )
    }
}

export default ProjectSign;