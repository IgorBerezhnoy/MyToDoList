import React from 'react'
import {action} from '@storybook/addon-actions'
import App from '../app/App'
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator'

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props: any) => {
    return (<App demo={true} />)
}
