import {Reducer} from "@reduxjs/toolkit";
import {StoreState, Todo} from "./index";

const reducer: Reducer = (prevState: StoreState, action): StoreState => {
  switch (action.type) {
    case 'addTodo':
      const { title } = action.payload;
      const newTodo: Todo = {
        id: (prevState.todos.length + 1).toString(),
        title,
        status: 'todo'
      }
      const newTodos = [newTodo, ...prevState.todos];
      return { todos: newTodos };
  }

  return prevState;
};

export default reducer;
