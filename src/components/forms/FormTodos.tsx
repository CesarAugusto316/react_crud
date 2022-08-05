import {
  ChangeEventHandler, FC, FormEventHandler, useState,
} from 'react';
import type { ToDo, TodosInput } from '../../interfaces';
import './formTodos.css';
import { useTodosContext, todosService } from '../../context';


const initialState: TodosInput = {
  name: '',
  description: '',
};

export const FormTodos: FC = () => {
  const [inputValue, setInputValue] = useState(initialState);
  const { onAppendTodo } = useTodosContext(); // update the ui

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const todo: ToDo = await todosService.create(inputValue);
      onAppendTodo(todo);
      setInputValue(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler : ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue((state) => {
      return {
        ...state,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <form className="form-todos" onSubmit={submitHandler}>
      <input
        className="form-todos__input"
        id="name"
        type="text"
        value={inputValue.name}
        placeholder="Name"
        onChange={onChangeHandler}
        required
      />
      <input
        className="form-todos__input"
        id="description"
        type="text"
        value={inputValue.description}
        placeholder="Description"
        onChange={onChangeHandler}
        required
      />
      <button hidden type="submit">submit</button>
    </form>
  );
};
