import React, { Component } from 'react';

import './trafficLight.css'

class TrafficLight extends Component {
    constructor( props ) {
        super( props );

        this.props.colorLight.map( item => {
            this.red = item.red.value;
            this.timeRed = item.red.time;

            this.yellow = item.yellow.value;
            this.timeYellow = item.yellow.time;

            this.green = item.green.value;
            this.timeGreen = item.green.time;
            return true;
        } );

        this.state = {
            valueTime: {
                red: this.timeRed,
                yellow: this.timeYellow,
                green: this.timeGreen
            }
        };

        this.className = require( 'classnames' );
    }

    onTimeChange( color ) {
        return ( e ) => {
            const { valueTime } = this.state;
            const change = Object.assign( {}, { ...valueTime } );
            switch ( color ) {
                case this.red:
                    change.red = e.target.value;
                    break;
                case this.yellow:
                    change.yellow = e.target.value;
                    break;
                case this.green:
                    change.green = e.target.value;
                    break;
                default:
                    break;
            }
            this.setState( {
                valueTime: change
            } );
        };
    }

    render() {
        let color;
        const {
            currenColor,
            seconds,
            stopTime,
            starTime,
            resetLight,
            timeOnKeyUp,
            test
        } = this.props;


        currenColor.map( item => (color = item.currenColor) );

        let classTrafficLightRed = this.className( {
            'outsite color-red': true,
            'active': color === this.red,
        } );
        let classTrafficLightYellow = this.className( {
            'outsite color-yellow': true,
            'active': color === this.yellow,

        } );
        let classTrafficLightGreen = this.className( {
            'outsite color-green': true,
            'active': color === this.green
        } );

        return (
            <div className="traffic-light">
                <div className="traffic-light__row">
                    <div className="traffic-light__col">
                        <div className="traffic-light__input">
                            RED: <br/>
                            <input
                                type="text"
                                value={ this.state.valueTime.red }
                                onChange={ this.onTimeChange( this.red ) }
                                onKeyUp={ (e) => timeOnKeyUp( e,this.red,this.state.valueTime.red ) }
                            /> giây
                        </div>
                        <div className="traffic-light__input">
                            YELLOW: <br/>
                            <input
                                type="text"
                                value={ this.state.valueTime.yellow }
                                onChange={ this.onTimeChange( this.yellow ) }
                                onKeyUp={ (e) => timeOnKeyUp( e,this.yellow,this.state.valueTime.yellow ) }
                            /> giây
                        </div>
                        <div className="traffic-light__input">
                            GREEN: <br/>
                            <input
                                type="text"
                                value={ this.state.valueTime.green }
                                onChange={ this.onTimeChange( this.green ) }
                                onKeyUp={ (e) => timeOnKeyUp( e,this.green,this.state.valueTime.green ) }
                            /> giây
                        </div>
                    </div>
                    <div className="traffic-light__col">
                        <div className={ classTrafficLightRed }/>
                        <div className={ classTrafficLightYellow }/>
                        <div className={ classTrafficLightGreen }/>
                    </div>
                </div>
                <div className="custom__traffic-light">
                    <p className="custom__traffic-light__second"> Seconds: { seconds } </p>
                    <div className="custom__traffic-light__button">
                        <button onClick={ stopTime }>stop</button>
                        <button onClick={ starTime }>start</button>
                        <button onClick={ resetLight }>reset</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrafficLight;