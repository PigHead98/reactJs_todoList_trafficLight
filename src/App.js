import React, { Component } from 'react';
import './App.css';
import Index from './components/index';
import TrafficLight from './trafficLight/trafficLight';
import tickAll from './img/tick-all.svg';

var status = true;

class App extends Component {
    constructor() {
        super();

        this.state = {
            status: 'all',
            newData: '',
            listData: [
                {
                    title: 'list 1', isComplete: true
                },
                {
                    title: 'list 2', isComplete: false
                },
                {
                    title: 'list 3', isComplete: false
                },
            ],
            //traffic light
            colorLight: [ {
                red: {
                    value: 0,
                    time: 10
                },
                yellow: {
                    value: 1,
                    time: 3
                },
                green: {
                    value: 2,
                    time: 7
                },
            } ],
            lightSetting: [
                {
                    currenColor: 0, timeColor: 10
                }
            ],
            currenColor: this.RED,
            seconds: 0
        };

        this.onKeyUp = this.onKeyUp.bind( this );
        this.onChange = this.onChange.bind( this );
        this.tickAllList = this.tickAllList.bind( this );

        this.resetLight = this.resetLight.bind( this );

        setInterval( () => {
                this.setState( {
                    currenColor: this.nextColor( this.state.currenColor )
                } );
            }, 1000
        );

    }

    setTimeAndColor() {
        this.state.colorLight.map( item => {
            this.RED_TIME = item.red.time;
            this.RED = item.red.value;

            this.YELLOW_TIME = item.yellow.time;
            this.YELLOW = item.yellow.value;

            this.GREEN_TIME = item.green.time;
            this.GREEN = item.green.value;
        } );
        return true;
    }

    timeOnKeyUp() {
        return ( event, color, valueColor ) => {
            const { colorLight } = this.state;
            var update = colorLight.concat();
            valueColor = parseInt( valueColor );
            if ( event.keyCode === 13 && !isNaN( Number( valueColor ) ) ) {
                update.map( ( item ) => {
                    switch ( color ) {
                        case this.RED:
                            item.red.time = valueColor;
                            break;
                        case this.YELLOW:
                            item.yellow.time = valueColor;
                            break;
                        case this.GREEN:
                            item.green.time = valueColor;
                            break;
                        default :
                            alert( 'error' );
                    }
                } );
                this.setState( {
                    colorLight: update
                } );
                this.resetLight();
                alert(' Completed!!! ');
            }
        }
    }

    tick() {
        this.setState( state => ({
            seconds: state.seconds + 1
        }) );
    }

    componentWillMount() {
        this.upTime();
    }

    resetLight() {
        this.setTimeAndColor();
        this.setState( {
            lightSetting: [
                {
                    currenColor: this.RED,
                    timeColor: this.RED_TIME
                }
            ],
            seconds: 0
        } );
    }

    upTime() {
        if ( status ) {
            status = false;
            this.interval = setInterval( () => {

                this.tick();
                if ( this.state.seconds >= this.state.lightSetting[ 0 ].timeColor ) {
                    this.state.lightSetting.map( item => (
                        this.changeColor( item )
                    ) );
                }
            }, 1000 );
        }
    }

    stopTime() {
        status = true;
        clearInterval( this.interval );
    }

    changeColor( item ) {
        this.setState( {
            lightSetting: this.nextColor( item.currenColor ),
            seconds: 0
        } );
    }

    onClickItem( item ) {
        return ( e ) => {
            const status = item.isComplete;
            const { listData } = this.state;
            const index = listData.indexOf( item );

            this.setState( {
                listData: [
                    ...listData.slice( 0, index ),
                    {
                        ...item,
                        isComplete: !status
                    },
                    ...listData.slice( index + 1 )

                ]
            } );
        };
    }

    onKeyUp( e ) {
        let text = e.target.value;

        if ( e.keyCode === 13 ) {
            if ( !text || text.trim() === '' ) {
                return;
            }

            this.setState( {
                newData: '',
                listData: [
                    { title: text, isComplete: false },
                    ...this.state.listData
                ]
            } );
        }

        return false;
    }

    onChange( e ) {
        this.setState( {
            newData: e.target.value
        } );
    }

    tickAllList() {
        let listDataWhenTickAll = this.state.listData;

        let status = this.checkTick( this.state.listData );

        if ( status ) {
            this.state.listData.map( ( item, index ) => (
                listDataWhenTickAll[ index ] = ({
                    ...item,
                    isComplete: status
                })
            ) );
        } else {
            this.state.listData.map( ( item, index ) => (
                listDataWhenTickAll[ index ] = ({
                    ...item,
                    isComplete: !item.isComplete
                })
            ) );
        }

        this.setState( {
            listData: listDataWhenTickAll
        } );
    }

    checkTick( data ) {
        let status = {
            true: true,
            false: false
        };

        data.map( ( item, index ) => (
            item.isComplete
                ?
                status.true = item.isComplete
                :
                status.false = !item.isComplete
        ) );

        (status.true === status.false) ? status = true : status = false;

        return status;
    }

    filterData( type ) {
        return ( e ) => {
            switch ( type ) {
                case 'completed' :
                    return this.setState( {
                        status: true
                    } );
                case 'doing' :
                    return this.setState( {
                        status: false
                    } );
                default :
                    return this.setState( {
                        status: 'all'
                    } );
            }

        };
    }

    nextColor( currenColor ) {

        this.setTimeAndColor();

        switch ( currenColor ) {
            case this.YELLOW:
                return [ {
                    currenColor: this.RED,
                    timeColor: this.RED_TIME
                } ];
            case this.RED:
                return [ {
                    currenColor: this.GREEN,
                    timeColor: this.GREEN_TIME
                } ];
            default :
                return [ {
                    currenColor: this.YELLOW,
                    timeColor: this.YELLOW_TIME
                } ];
        }
    }

    render() {
        const { lightSetting, listData, newData, seconds, colorLight } = this.state;

        let data = listData.map( ( item, index ) =>
            item.isComplete === this.state.status
            &&
            <Index
                key={ index }
                data={ item }
                onClick={ this.onClickItem( item ) }
            />
        );

        if ( this.state.status === 'all' ) {
            data = listData.map( ( item, index ) =>
                (
                    <Index
                        key={ index }
                        data={ item }
                        onClick={ this.onClickItem( item ) }
                    />
                )
            );
        }

        return (

            <div className="App">
                <div className="header">
                    <img onClick={ this.tickAllList } src={ tickAll } alt={ tickAll }/>
                    <input
                        type="text"
                        placeholder="Add new todo item"
                        value={ newData }
                        onChange={ this.onChange }
                        onKeyUp={ this.onKeyUp }
                    />
                </div>

                {
                    listData.length > 0
                    &&
                    data
                }
                {
                    listData.length === 0
                    &&
                    'list empty'
                }
                <div className="footer">
                    <button onClick={ this.filterData( 'all' ) }>All</button>
                    <button onClick={ this.filterData( 'completed' ) }>Completed</button>
                    <button onClick={ this.filterData( 'doing' ) }>Doing</button>
                </div>

                <TrafficLight
                    currenColor={ lightSetting }
                    seconds={ seconds }
                    colorLight={ colorLight }
                    stopTime={ () => this.stopTime() }
                    starTime={ () => this.componentWillMount() }
                    resetLight={ this.resetLight }
                    onTimeChange={ this.onTimeChange }
                    timeOnKeyUp={ this.timeOnKeyUp() }
                />
            </div>
        );
    }
}

export default App;
