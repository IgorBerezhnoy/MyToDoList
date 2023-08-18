import axios from 'axios';


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'cea6f080-ff85-4d71-9249-bb41cad72b89'
    }
};

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
});

export type TodolistType = {
    'id': string
    'title': string
    'addedDate': string
    'order': number
}

export type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

type TaskType = {
    'id': string
    'title': string,
    'description': string | null,
    'todoListId': string,
    'order': number,
    'status': number,
    'priority': number,
    'startDate': null | string,
    'deadline': null | string,
    'addedDate': string
}

type GetTaskResponse = {
    error: string | null,
    totalCount: number,
    'items': TaskType [],

}


export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);

    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});

    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`);

    },
    deleteTask(todolistId: string,taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<GetTaskResponse>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTaskTitle(todolistId: string,taskId:string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title});

    },
};