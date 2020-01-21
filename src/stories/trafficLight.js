import React from 'react';
import TrafficLight from '../trafficLight/trafficLight';
import { storiesOf } from '@storybook/react';

storiesOf( 'TrafficLight', module )
    .add(
        'default',
        () => (
            <TrafficLight
                currentColor={ [{
                    currentColor: 0, timeColor: 10
                }] }
                seconds={ 0 }
                colorLight={ [
                    {
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
                    }
                ] }
                stopTime={ () => 1 }
                starTime={ () => 1 }
                resetLight={ () => 1 }
                onTimeChange={ () => 1 }
                timeOnKeyUp={ () => 1 }
                chooseColor={ () => 1 }
            />
        )
    );