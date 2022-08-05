import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ToDo } from '../interfaces';
import { RestAPI } from './RestAPI.class';


export class TodosService extends RestAPI {
  /**
  * todosService instance should read a value from
  * Context or a variable in the local component not
  * from localStorage. Change that!
  */

  async getAll(): Promise<ToDo[]|any> {
    return this.get('/todos')
      .then((todos) => {
        return todos;
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      });
  }

  async getById(id:string) {
    return this.get(`/todos/${id}`);
  }

  async create(payload: any): Promise<ToDo|any> {
    return this.post('/todos', payload)
      .then((todo) => {
        console.log(todo);
        return todo;
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      });
  }

  async update(id:number, payload: any) {
    return this.put(`/todos/${id}`, payload)
      .then((todo) => {
        console.log(todo);
        return todo;
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      });
  }

  async deleteById(id: number) {
    return this.delete(`/todos/${id}`)
      .then((todo) => {
        console.log(todo);
        return todo;
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      });
  }
}
