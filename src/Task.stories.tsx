import {AddItemForm} from './AddItemForm';
import{action} from "@storybook/addon-actions"
import {Task} from './Task';
import {Provider} from 'react-redux';
import {store} from './state/store';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title:"Task stories",
    component:Task,
    decorators:[ReduxStoreProviderDecorator]
}

const callback= action("Button add was pressed inside the form ")

export const AddItemFormBaseExample=(props:any)=>{
    return<div>
            <Task todolistId={props.id} task={{id: '1', title: 'CSS', isDone: true}}/>
            <Task todolistId={props.id} task={{id: '2', title: 'JS', isDone: false}}/>
        </div>

}