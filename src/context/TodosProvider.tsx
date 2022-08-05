import {
  FC, createContext, ReactNode, useContext, useState, SetStateAction, Dispatch,
} from 'react';
import type { ToDo, UserProfile } from '../interfaces';
import { LoginService } from '../services/LoginService.class';
import { TodosService } from '../services/TodosService.class';


interface ContextProps {
  allTodos: ToDo[],
  userProfile: UserProfile,
  token: string|null,
  setUserProfile: Dispatch<SetStateAction<UserProfile>>,
  setToken: Dispatch<SetStateAction<string|null>>
  onFetchAllTodos(todo: ToDo[]): void,
  onAppendTodo(todo: ToDo) : void,
  onDeleteTodo(id: number) : void,
}

const Context = createContext({} as ContextProps);

export const useTodosContext = () => {
  return useContext(Context);
};

// services
export const loginService = new LoginService();
export const todosService = new TodosService();

export const TodosProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [allTodos, setAllTodos] = useState([] as ToDo[]);
  const [userProfile, setUserProfile] = useState({} as UserProfile);
  const [token, setToken] = useState<string|null>(loginService.token);

  const onFetchAllTodos = (todos: ToDo[]) => {
    setAllTodos(todos);
  };

  /**
   *
   * @description appends a todo to the UI.
   */
  const onAppendTodo = async (todo: ToDo) => {
    setAllTodos((state) => {
      return [
        ...state,
        todo,
      ];
    });
  };

  /**
   *
   * @description deletes a todo from the UI.
   */
  const onDeleteTodo = async (id: number) => {
    setAllTodos((state) => {
      return state.filter((todo) => todo.id !== id);
    });
  };


  return (
    <Context.Provider value={{
      allTodos,
      userProfile,
      token,
      onDeleteTodo,
      onAppendTodo,
      onFetchAllTodos,
      setUserProfile,
      setToken,
    }}
    >
      {children}
    </Context.Provider>
  );
};
