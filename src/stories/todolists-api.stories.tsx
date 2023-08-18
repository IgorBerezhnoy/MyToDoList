import React, {ChangeEvent, useEffect, useState} from 'react';
import {todolistsAPI} from '../api/todolists-API';

export default {
    title: 'API'
};


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    const onClickGetTask = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            });
    };
    return <div>
        <button onClick={onClickGetTask}>Get Todolist</button>
        {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [value, setValue] = useState<string>('');
    const onClickHandler = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.createTodolist(value)
            .then((res) => {
                setState(res.data);
                setValue('');
            });
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    return <div><GetTodolists/>
        <div>
            <div>Title</div>
            <input value={value} onChange={onChangeHandler}/></div>
        <div>
            <button onClick={onClickHandler}>CreateTask</button>
        </div>
        <div>{JSON.stringify(state)}</div>
    </div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [value, setValue] = useState<string>('');
    const onClickHandler = (value: string) => {

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.deleteTodolist(value)
            .then((res) => {
                setState(res.data);
                setValue('');
            });
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    return <div>
        <div><GetTodolists/></div>
        <div>TodoId<input value={value} onChange={onChangeHandler}/>
            <div>
                <button onClick={() => onClickHandler(value)}>Delete Todolist</button>
            </div>
        </div>
        <div>{JSON.stringify(state)}</div>
    </div>;
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const [todoId, setTodoId] = useState<string>('');

    const onClickHandler = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.updateTodolistTitle(todoId, title)
            .then((res) => {
                setState(res.data);
            });
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value);
    };
    return (<div>
        <div><GetTodolists/></div>
        <div>New Title<input value={title} onChange={onChangeTitleHandler}/></div>
        <div>TodoId<input value={todoId} onChange={onChangeTodoIdHandler}/>
            <div>
                <button onClick={onClickHandler}>Update Todolist Title</button>
            </div>
        </div>
        <div>{JSON.stringify(state)}</div>
    </div>);
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [value, setValue] = useState<string>('');
    const onClickHandler = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        let todolistId = '763097a2-9a70-4b37-8b60-d0c6daeea777';
        todolistsAPI.getTasks(value)
            .then((res) => {
                setState(res.data);
            });
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    return <div>
        <div><GetTodolists/></div>
        <div>TodoId<input value={value} onChange={onChangeHandler}/>
            <div>
                <button onClick={onClickHandler}>Get task</button>
            </div>
        </div>
        <div>{JSON.stringify(state)}</div>
    </div>;
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [value, setValue] = useState<string>('');
    const [TodoId, setTodoId] = useState<string>('');
    const onClickHandler = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.createTask(TodoId, value)
            .then((res) => {
                setState(res.data);
                setValue('');
            });
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value);
    };
    return <div>
        <div>
            <div>Title</div>
            <input value={value} onChange={onChangeHandler}/></div>
        <div>
            <div>TodoId</div>
            <input value={TodoId} onChange={onChangeTodoIdHandler}/></div>
        <div>
            <button onClick={onClickHandler}>CreateTask</button>
        </div>
        <div>{JSON.stringify(state)}</div>
    </div>;
};


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTask] = useState<any>('');
    const [todoId, setTodoId] = useState<any>('');

    const deleteTask = () => {

        todolistsAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data);
            });
    };

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value);
    };
    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value);
    };
    return <div>Get Task
        <GetTasks/>
        <div>
            <div>Delete Task</div>
            <div>TaskId</div>
            <input value={taskId} onChange={onChangeTaskHandler}/></div>
        <div>
            <div>TodoId</div>
            <input value={todoId} onChange={onChangeTodoIdHandler}/></div>
        <div>
        </div>
        <div>{JSON.stringify(state)}</div>
        <button onClick={deleteTask}>DeleteTask</button>
    </div>;
};


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTask] = useState<any>('');
    const [todoId, setTodoId] = useState<any>('');
    const [title, setTitle] = useState<any>('');

    const updateTask = () => {

        todolistsAPI.updateTaskTitle(todoId, taskId, title)
            .then((res) => {
                setState(res.data);
            });
    };

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value);
    };
    const onChangeTodoIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoId(e.currentTarget.value);
    };    const onChangeTtitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    return <div>Get Task
        <GetTasks/>
        <div>
            <div>Delete Task</div>
            <div>TaskId</div>
            <input value={taskId} onChange={onChangeTaskHandler}/></div>
        <div>
            <div>TodoId</div>
            <input value={todoId} onChange={onChangeTodoIdHandler}/></div>
        <div>

        <div>
            <div>New Title</div>
            <input value={title} onChange={onChangeTtitleHandler}/></div>
        </div>
        <div>{JSON.stringify(state)}</div>
        <button onClick={updateTask}>updateTask</button>
    </div>;
};
