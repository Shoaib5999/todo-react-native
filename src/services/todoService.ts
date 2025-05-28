import axios from 'axios';
import {TodoItem} from '../store/todoSlice';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async (): Promise<TodoItem[]> => {
  const response = await axios.get(API_URL);
  return response.data.map((item: any) => ({
    ...item,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};
