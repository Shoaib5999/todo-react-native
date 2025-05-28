import {TodoItem} from '../store/todoSlice';

export type SortType = 'recent' | 'id';
export type FilterType = 'all' | 'active' | 'done';

export function sortTodos(todos: TodoItem[], sort: SortType): TodoItem[] {
  if (sort === 'recent') {
    return [...todos].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }
  return [...todos].sort((a, b) => a.id - b.id);
}

export function filterTodos(todos: TodoItem[], filter: FilterType): TodoItem[] {
  if (filter === 'active') return todos.filter(t => !t.completed);
  if (filter === 'done') return todos.filter(t => t.completed);
  return todos;
}