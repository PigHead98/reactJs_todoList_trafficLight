import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Index from '../components/index';
import { action } from '@storybook/addon-actions';

addDecorator( withInfo );

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
