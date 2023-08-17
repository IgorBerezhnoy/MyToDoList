import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField/TextField';
import {IconButton} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import {Task} from '../Task';

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,

    tags: ['autodocs'],

    argTypes: {
        changeTaskStatus:action("changeTaskStatus"),
        removeTask:action("removeTask"),
        changeTaskTitle:action("changeTaskTitle"),

    },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskStory: Story = {
    args: {
        changeTaskStatus:action("changeTaskStatus"),
        removeTask:action("removeTask"),
        changeTaskTitle:action("changeTaskTitle"),
        todolistId:"Todos",
        task:{id:"sdfds",title:"Js",isDone:false}
    }
}
export const TaskFinishedStory: Story = {
    args: {
        changeTaskStatus:action("changeTaskStatus"),
        removeTask:action("removeTask"),
        changeTaskTitle:action("changeTaskTitle"),
        todolistId:"Todos",
        task:{id:"sdfds",title:"Js",isDone:true}
    }
}

