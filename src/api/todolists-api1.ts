import {instance} from './settings';
import {ResponseType, TaskType, UpdateTaskModelType} from './todolists-api';

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  }
};
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}