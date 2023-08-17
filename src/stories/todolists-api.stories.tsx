import React, {useEffect, useState} from 'react';
import {todolistsAPI} from '../api/todolists-API';

export default {
    title: 'API'
};



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.createTodolist("Todolist a a  a ")
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '580526c6-c93c-4f69-8362-682692327e0d';
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
     todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        let todolistId = '9ef8f112-87cb-4430-90cd-870379279d28';
      todolistsAPI.updateTodolistTitle(todolistId,"New Title")
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};