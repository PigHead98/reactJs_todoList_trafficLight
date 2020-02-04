import React, { Component } from 'react';
import './App.css';
import Index from './components/index';
import TrafficLight from './trafficLight/trafficLight';
import tickAll from './img/tick-all.svg';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

var status = true;

class App extends Component {
    constructor() {
        super();

        this.state = {
            // todo list
            status: 'all', // value all/ completed/doing
            newData: '', // default data of input
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
                    currentColor: 0, timeColor: 10
                }
            ],
            currentColor: this.RED,
            seconds: 0
        };

        this.onKeyUp = this.onKeyUp.bind( this );
        this.onChange = this.onChange.bind( this );
        this.tickAllList = this.tickAllList.bind( this );
        this.resetLight = this.resetLight.bind( this );

        setInterval( () => {
                this.setState( {
                    currentColor: this.nextColor( this.state.currentColor )
                } );
            }, 1000
        );

        this.focusInput = React.createRef();
    }

    setTimeAndColor() {
        this.state.colorLight.map( item => {
            this.RED_TIME = item.red.time;
            this.RED = item.red.value;

            this.YELLOW_TIME = item.yellow.time;
            this.YELLOW = item.yellow.value;

            this.GREEN_TIME = item.green.time;
            this.GREEN = item.green.value;
            return true;
        } );
    }

    /* detect value in trafficLight js when user tap
    * event => event
    * color => color was chosen
    * valueColor => new time
    */
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
                    this.setState( {
                        colorLight: update
                    } );
                    this.resetLight();
                    return alert( ' Time of this color has been changed!!! ' );
                } );
            }
        }
    }

    // up seconds every uptime() was called
    tick() {
        this.setState( state => ({
            seconds: state.seconds + 1
        }) );
    }

    // reset traffic light to red color
    resetLight() {
        this.setTimeAndColor(); // to accept new value when user change right away
        this.setState( {
            lightSetting: [
                {
                    currentColor: this.RED,
                    timeColor: this.RED_TIME
                }
            ],
            seconds: 0
        } );
    }

    // uptime +1 second, status is used to detect when a user clicks repeatedly
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
            lightSetting: this.nextColor( item.currentColor ),
            seconds: 0
        } );
    }

    // when user click color or name color
    chooseColor() {
        return ( color ) => {
            this.stopTime();
            let timeNow;
            //get time of color was chosen
            switch ( color ) {
                case this.RED:
                    timeNow = this.RED_TIME;
                    break;
                case this.YELLOW:
                    timeNow = this.YELLOW_TIME;
                    break;
                case this.GREEN:
                    timeNow = this.GREEN_TIME;
                    break;
                default :
                    alert( 'error' );
            }

            // set state light setting to show color was chosen
            this.setState( {
                lightSetting: [
                    {
                        currentColor: color,
                        timeColor: timeNow
                    }
                ],
                seconds: 0
            } );
        }
    }

    // when user click at todo item
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

    // detect key enter and add value to todo list
    onKeyUp( e ) {
        let text = e.target.value;

        // key code of enter is 13
        if ( e.keyCode === 13 ) {
            if ( !text || text.trim() === '' ) {
                return;
            }

            // add new item
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

    // change value of input "add new todo item" when user tap
    onChange( e ) {
        this.setState( {
            newData: e.target.value
        } );
    }

    // when user click arrow down
    tickAllList() {
        let listDataWhenTickAll = this.state.listData;

        // check status of list data
        let status = this.checkTick( this.state.listData );

        if ( status ) {
            // list data have 2 status now (completed AND doing)
            this.state.listData.map( ( item, index ) => (
                listDataWhenTickAll[ index ] = ({
                    ...item,
                    isComplete: status
                })
            ) );
        } else {
            // list data has only 1 status now (completed OR doing)
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
        /*
        * true is completed
        * false is doing
        */
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

        /*
        * if that list date have completed and doing => tick all = completed
        * else tick all => next status of list data = !now status of list data.
        */
        (status.true === status.false) ? status = true : status = false;

        return status;
    }

    // set status of state follow by all/ completed/ doing
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

    // set next color when end time of current color
    nextColor( currentColor ) {

        // set time and value of color
        this.setTimeAndColor();

        /* current color :
        * red -> green
        * green -> yellow
        * yellow -> red
        * default is green
        */
        switch ( currentColor ) {
            case this.YELLOW:
                return [ {
                    currentColor: this.RED,
                    timeColor: this.RED_TIME
                } ];
            case this.RED:
                return [ {
                    currentColor: this.GREEN,
                    timeColor: this.GREEN_TIME
                } ];
            default :
                return [ {
                    currentColor: this.YELLOW,
                    timeColor: this.YELLOW_TIME
                } ];
        }
    }

    componentDidMount() {
        // run time
        this.upTime();

        // ref: focus to input "add new todo item"
        this.focusInput.current !== null && this.focusInput.current.focus();
    }

    componentWillUnmount() {
        // clearInterval
        this.stopTime();
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
                {/*<div className="header">*/}
                {/*    <img onClick={ this.tickAllList } src={ tickAll } alt={ tickAll }/>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="Add new todo item"*/}
                {/*        value={ newData }*/}
                {/*        onChange={ this.onChange }*/}
                {/*        onKeyUp={ this.onKeyUp }*/}
                {/*        ref={ this.focusInput }*/}
                {/*    />*/}
                {/*</div>*/}

                {/*{*/}
                {/*    listData.length > 0*/}
                {/*    &&*/}
                {/*    data*/}
                {/*}*/}
                {/*{*/}
                {/*    listData.length === 0*/}
                {/*    &&*/}
                {/*    'list empty'*/}
                {/*}*/}
                {/*<div className="footer">*/}
                {/*    <button onClick={ this.filterData( 'all' ) }>All</button>*/}
                {/*    <button onClick={ this.filterData( 'completed' ) }>Completed</button>*/}
                {/*    <button onClick={ this.filterData( 'doing' ) }>Doing</button>*/}
                {/*</div>*/}
                {/*<TrafficLight*/}
                {/*    currentColor={ lightSetting }*/}
                {/*    seconds={ seconds }*/}
                {/*    colorLight={ colorLight }*/}
                {/*    stopTime={ () => this.stopTime() }*/}
                {/*    starTime={ () => this.componentDidMount() }*/}
                {/*    resetLight={ this.resetLight }*/}
                {/*    onTimeChange={ this.onTimeChange }*/}
                {/*    timeOnKeyUp={ this.timeOnKeyUp() }*/}
                {/*    chooseColor={ this.chooseColor() }*/}
                {/*/>*/}
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">All</Link>
                                </li>
                                <li>
                                    <Link to="/todo-list">Todo List</Link>
                                </li>
                                <li>
                                    <Link to="/traffic-light">Traffic Light</Link>
                                </li>
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/" exact>
                                <div className="header">
                                    <img onClick={ this.tickAllList } src={ tickAll } alt={ tickAll }/>
                                    <input
                                        type="text"
                                        placeholder="Add new todo item"
                                        value={ newData }
                                        onChange={ this.onChange }
                                        onKeyUp={ this.onKeyUp }
                                        ref={ this.focusInput }
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
                                    currentColor={ lightSetting }
                                    seconds={ seconds }
                                    colorLight={ colorLight }
                                    stopTime={ () => this.stopTime() }
                                    starTime={ () => this.componentDidMount() }
                                    resetLight={ this.resetLight }
                                    onTimeChange={ this.onTimeChange }
                                    timeOnKeyUp={ this.timeOnKeyUp() }
                                    chooseColor={ this.chooseColor() }
                                />
                            </Route>
                            <Route  path="/todo-list"  exact>
                                <div className="header">
                                    <img onClick={ this.tickAllList } src={ tickAll } alt={ tickAll }/>
                                    <input
                                        type="text"
                                        placeholder="Add new todo item"
                                        value={ newData }
                                        onChange={ this.onChange }
                                        onKeyUp={ this.onKeyUp }
                                        ref={ this.focusInput }
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
                            </Route>
                            <Route path="/traffic-light" exact>
                                <TrafficLight
                                    currentColor={ lightSetting }
                                    seconds={ seconds }
                                    colorLight={ colorLight }
                                    stopTime={ () => this.stopTime() }
                                    starTime={ () => this.componentDidMount() }
                                    resetLight={ this.resetLight }
                                    onTimeChange={ this.onTimeChange }
                                    timeOnKeyUp={ this.timeOnKeyUp() }
                                    chooseColor={ this.chooseColor() }
                                />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
