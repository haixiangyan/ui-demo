import {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {Input} from "antd";

const TodoInput: FC = () => {
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    dispatch({
      type: 'addTodo',
      payload: { title: newTodo }
    })
    setNewTodo('');
  }
  return (
    <div>
      <Input value={newTodo} onChange={e => setNewTodo(e.target.value)} type="text" onPressEnter={addTodo}/>
    </div>
  )
}

export default TodoInput;
