import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TodoState {
  todos: TodoItem[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<TodoItem[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<TodoItem>) {
      state.todos.unshift(action.payload);
    },
    updateTodo(state, action: PayloadAction<TodoItem>) {
      const idx = state.todos.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.todos[idx] = action.payload;
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
  },
});

export const {setTodos, addTodo, updateTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;