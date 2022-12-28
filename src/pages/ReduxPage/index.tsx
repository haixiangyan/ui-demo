import {FC} from "react";
import store from "./store";
import {Provider} from "react-redux";
import 'antd/dist/reset.css';
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const ReduxPage: FC = () => {
  return (
    <Provider store={store}>
      <div>
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
  )
}

export default ReduxPage;
