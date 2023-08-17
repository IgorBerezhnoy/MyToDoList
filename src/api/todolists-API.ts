import axios from 'axios';
import {UpdateTodolistTitle} from '../stories/todolists-api.stories';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'cea6f080-ff85-4d71-9249-bb41cad72b89'
    }
};

export type TodolistType = {
    'id': string
    'title': string
    'addedDate': string
    'order': number
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}




export const todolistsAPI = {
    getTodolists() {
        return axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
    },
    createTodolist(title: string) {
        return axios.post<ResponseType< { item: TodolistType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings);

    },
    deleteTodolist(todolistId: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings);

    },
    updateTodolistTitle(todolistId: string, title: string) {
        return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings);

    }
};