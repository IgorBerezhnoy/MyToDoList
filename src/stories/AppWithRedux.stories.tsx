import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';


import React from 'react';
import AppWithRedux from '../AppWithRedux';
import {Provider} from 'react-redux';
import {store} from '../state/store';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators:[ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
    render:args => <AppWithRedux/>
    // render:args => <Provider store={store}><AppWithRedux/></Provider>
};
