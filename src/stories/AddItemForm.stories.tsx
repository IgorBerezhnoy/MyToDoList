import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField/TextField';
import {IconButton} from '@mui/material';
import {AddBox} from '@mui/icons-material';

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,

    tags: ['autodocs'],

    argTypes: {
        addItem: {
            description: 'Clicked button inside form',
            action: 'Clicked button inside form'
        },
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    render: (args) => <AddItemForm addItem={args.addItem}/>
};

const AddItemFormForStories = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>('Title is required');

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    };

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>;
};

export const AddItemFormStoryError: Story = {
    render: (args) => <AddItemFormForStories addItem={args.addItem}/>
};