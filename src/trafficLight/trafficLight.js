import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './trafficLight.css'

import PropTypes from 'prop-types';

class TrafficLight extends Component {
    constructor( props ) {
        super( props );

        //set color value
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

    // when user change time of color at input
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
            currentColor,
            seconds,
            stopTime,
            starTime,
            resetLight,
            timeOnKeyUp,
            chooseColor
        } = this.props;

        currentColor.map( item => (color = item.currentColor) ); // get current color

        //check current color to add class active
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
                            <a
                                href="javascrip:void(0)"
                                className="color-red"
                                onClick={ () => chooseColor( this.red ) }
                            >RED:</a>
                            <input
                                type="text"
                                value={ this.state.valueTime.red }
                                onChange={ this.onTimeChange( this.red ) }
                                onKeyUp={ ( e ) => timeOnKeyUp( e, this.red, this.state.valueTime.red ) }
                            /> giây
                        </div>
                        <div className="traffic-light__input">
                            <a href="javascrip:void(0)"
                               className="color-yellow"
                               onClick={ () => chooseColor( this.yellow ) }
                            >YELLOW:</a>
                            <input
                                type="text"
                                value={ this.state.valueTime.yellow }
                                onChange={ this.onTimeChange( this.yellow ) }
                                onKeyUp={ ( e ) => timeOnKeyUp( e, this.yellow, this.state.valueTime.yellow ) }
                            /> giây
                        </div>
                        <div className="traffic-light__input">
                            <a
                                href="javascrip:void(0)"
                                className="color-green"
                                onClick={ () => chooseColor( this.green ) }
                            >
                                GREEN:
                            </a>
                            <input
                                type="text"
                                value={ this.state.valueTime.green }
                                onChange={ this.onTimeChange( this.green ) }
                                onKeyUp={ ( e ) => timeOnKeyUp( e, this.green, this.state.valueTime.green ) }
                            /> giây
                        </div>
                    </div>
                    <div className="traffic-light__col">
                        <div onClick={ () => chooseColor( this.red ) } className={ classTrafficLightRed }/>
                        <div onClick={ () => chooseColor( this.yellow ) } className={ classTrafficLightYellow }/>
                        <div onClick={ () => chooseColor( this.green ) } className={ classTrafficLightGreen }/>
                    </div>
                </div>
                <div className="custom__traffic-light">
                    <p className="custom__traffic-light__second"> Seconds: { seconds } </p>
                    <div className="custom__traffic-light__button">
                        <Button color="warning" onClick={ stopTime }>stop</Button>{ ' ' }
                        <Button color="success" onClick={ starTime }>start</Button>{ ' ' }
                        <Button color="info" onClick={ resetLight }>reset</Button>{ ' ' }
                    </div>
                </div>
            </div>
        );
    }
}

TrafficLight.propTypes = {
    currentColor: PropTypes.arrayOf(
        PropTypes.shape(
            {
                currentColor: PropTypes.number.isRequired,
                timeColor: PropTypes.number.isRequired
            }
        )
    ),
    colorLight: PropTypes.arrayOf(
        PropTypes.objectOf(
            PropTypes.shape(
                {
                    value: PropTypes.number,
                    time: PropTypes.number
                }
            )
        )
    ),
    seconds: PropTypes.number,
    stopTime: PropTypes.func,
    starTime: PropTypes.func,
    resetLight: PropTypes.func,
    timeOnKeyUp: PropTypes.func,
    chooseColor: PropTypes.func
};

export default TrafficLight;