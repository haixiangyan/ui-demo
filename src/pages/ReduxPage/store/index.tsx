import {configureStore} from "@reduxjs/toolkit";
import reducer from "./reducer";

export interface Todo {
  id: string;
  title: string;
  status: 'done' | 'todo'
}

export interface StoreState {
  todos: Todo[];
}

const store = configureStore<StoreState>({
  reducer,
  preloadedState: { todos: [] },
});

export default store;
