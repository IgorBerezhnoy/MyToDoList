import {AddItemForm} from './AddItemForm';
import{action} from "@storybook/addon-actions"
import {EditableSpan} from './EditableSpan';

export default {
    title:"EditableSpan stories",
    component:EditableSpan
}

const callback= action("value changed")

export const EditableSpanExample=(props:any)=>{
    return <EditableSpan  value={"start value"} onChange={callback}/>
}