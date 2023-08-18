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
    return <div>
        <div><button>CreateTask</button></div>
        <div>{JSON.stringify(state)}</div>
    </div>;
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

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        let todolistId = '763097a2-9a70-4b37-8b60-d0c6daeea777';
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        let todolistId = '763097a2-9a70-4b37-8b60-d0c6daeea777';
        todolistsAPI.createTask(todolistId,"YYYYYYYYYYYYYYYYYYYYYYYYYYYY ")
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '763097a2-9a70-4b37-8b60-d0c6daeea777';
        const taskId = 'a235c6e7-8c6a-4714-a1bb-46c75b026854';
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '763097a2-9a70-4b37-8b60-d0c6daeea777';
        const taskId = '5ca9e11a-7100-4afa-9cf2-6cb5d275c5df';
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.updateTaskTitle(todolistId,taskId,"sssssssssssssssssssssooooooooooooooooooooooooo")
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};