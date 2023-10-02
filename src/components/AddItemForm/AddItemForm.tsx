import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => any //Promise
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({disabled = false, ...props}: AddItemFormPropsType) {
    console.log('AddItemForm called');

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addItem = async () => {
        if (title.trim() !== '') {
            debugger
            try{
                let res = await props.addItem(title);
                console.log(res);
                if (!res.error) {
                    setTitle('');
                }
            }catch (e){

            }
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
                   disabled={disabled}
        />
        <IconButton style={{marginLeft: '5px'}} color="primary" onClick={addItem} disabled={disabled}>
            <AddBox/>
        </IconButton>
    </div>;
});
