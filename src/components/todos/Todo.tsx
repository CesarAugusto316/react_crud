import {
  FC, useState, useReducer, MouseEventHandler, KeyboardEventHandler,
} from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTodosContext, todosService } from '../../context';


interface TodoProps {
  id: number,
  description: string,
  name: string
}

export const Todo: FC<TodoProps> = ({ id, description, name }) => {
  const { onDeleteTodo } = useTodosContext();
  const [toggleEditor, setToggleEditor] = useReducer((state) => !state, false);
  const [des, setDes] = useState(description);
  const [title, setTitle] = useState(name);

  const onInputHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      e.target.blur();
      todosService.update(id, { description: des, name: title })
        .then(() => {
          toast.success('Saving');
          setToggleEditor();
        });
    }
  };

  const onClickHandler: MouseEventHandler = async () => {
    if (toggleEditor === true) {
      todosService.update(id, { description: des, name: title })
        .then(() => {
          toast.success('Saving');
        });
    }
    setToggleEditor();
  };

  const onDeleteTodoHandler = async (id: number) => {
    try {
      await todosService.deleteById(id);
      onDeleteTodo(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="todo-item__text">
        {/* IF */}
        {toggleEditor === true && (
          <>
            <input
              id={`input-todo-${id}-name`}
              className="todo-item__input todo-item__input-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={onInputHandler}
              type="text"
              name={`input-todo-${id}-name`}
            />
            <input
              id={`input-todo-${id}-description`}
              className="todo-item__input"
              value={des}
              onChange={(e) => setDes(e.target.value)}
              onKeyDown={onInputHandler}
              name={`input-todo-${id}-description`}
            />
          </>
        )}
        {/* ELSE */}
        {toggleEditor === false && (
          <>
            <h3 className="todo-item__text-content">{title}</h3>
            <p className="todo-item__text-content">
              {des}
            </p>
          </>
        )}
      </div>

      <span className="todo-item__icons-container">
        <label htmlFor={`input-todo-${id}-description`} onClick={onClickHandler}>
          <FaEdit
            className={`todo-item__icon
            ${toggleEditor && ' todo-item__icon--accent '}
            todo-item__icon--edit`}
          />
        </label>
        <label onClick={() => onDeleteTodoHandler(id)}>
          <FaTrashAlt
            className="todo-item__icon"
          />
        </label>
      </span>
    </>
  );
};
