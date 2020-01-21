import React from 'react';
import { storiesOf } from '@storybook/react';
import Index from '../components/index';
import { action } from '@storybook/addon-actions';

storiesOf( 'Index', module )
    .add(
        'doing',
        () => (
            <Index
                key={ 1 }
                data={ { title: 'title 1', isComplete: false } }
                onClick={ action( 'button-click' ) }
            />
        )
    )
    .add(
        'completed',
        () => (
            <Index
                key={ 1 }
                data={ { title: 'title 1', isComplete: true } }
                onClick={ action( 'button-click' ) }
            />
        )
    );
