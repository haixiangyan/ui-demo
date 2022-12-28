import {FC} from "react";
import {useSelector} from "react-redux";
import {StoreState, Todo} from "../../store";

const TodoList: FC = () => {
  const todos = useSelector<StoreState, Todo[]>((state) => state.todos);

  return (
    <div>
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id}>{todo.title} - {todo.status}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default TodoList;
