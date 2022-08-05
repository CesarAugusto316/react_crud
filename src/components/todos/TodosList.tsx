import { FC, useEffect, useState } from 'react';
import '@animxyz/core';
import { XyzTransitionGroup } from '@animxyz/react';
import { todosService, useTodosContext } from '../../context';
import { Spinner, Todo } from '..';
import './todos.css';


export const TodosList: FC = () => {
  const [isLoading, setIsloading] = useState(true);
  const { allTodos, onFetchAllTodos } = useTodosContext();

  useEffect(() => {
    todosService.getAll().then((todos) => {
      onFetchAllTodos(todos);
      setIsloading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner size="font-6" />;
  }
  return (
    <XyzTransitionGroup
      appear
      xyz="fade up-100% ease-in-out-back"
      className="todos-list"
    >
      {allTodos.map(({ id, description, name }) => {
        return (
          <div key={id} className="todo-item">
            <Todo id={id} description={description} name={name} />
          </div>
        );
      })}
    </XyzTransitionGroup>
  );
};
