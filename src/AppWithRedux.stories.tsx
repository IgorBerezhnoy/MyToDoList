import {AddItemForm} from './AddItemForm';
import{action} from "@storybook/addon-actions"
import {EditableSpan} from './EditableSpan';
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux';
import {store} from './state/store';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title:"AppWithRedux stories",
    component:AppWithRedux,
 decorators:[ReduxStoreProviderDecorator]
}

const callback= action("value changed")

export const AppWithReduxExample=(props:any)=>{
    return  <AppWithRedux/>
}