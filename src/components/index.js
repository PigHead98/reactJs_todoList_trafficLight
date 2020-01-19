import React, {Component} from 'react';
import './index.css';
import checkImg from '../img/check.png';
import checkCompelteImg from '../img/check-done.png';

class Index extends Component {
    constructor() {
        super();

        this.className = require('classnames');
    };

    render() {
        let {data, onClick} = this.props;
        let classIndex = this.className({
            'Index': true,
            'Index-complete': data.isComplete
        });
        let urlImg;
        data.isComplete ? urlImg = checkCompelteImg : urlImg = checkImg;

        return (
            <div onClick={onClick} className={classIndex}>
                <img src={urlImg} alt={urlImg}/>
                <p>{this.props.data.title}</p>
            </div>
        );
    }
}

export default Index;