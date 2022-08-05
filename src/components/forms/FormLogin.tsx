import {
  ChangeEventHandler, FC, FormEventHandler, useState,
} from 'react';
import './formLogin.css';
import { useNavigate } from 'react-router-dom';
import { loginService, todosService, useTodosContext } from '../../context';
import type { LoginState } from '../../interfaces';


const initialState: LoginState = {
  discordId: '',
  email: '',
};

const FormLogin: FC = () => {
  const { setToken } = useTodosContext();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<LoginState>(initialState);

  const onSubmitHandler : FormEventHandler = async (e) => {
    e.preventDefault();
    await loginService.login(userInput);

    if (loginService.hasToken) {
      todosService.token = loginService.token;
      todosService.hasToken = true;
      setToken(loginService.token);
      navigate('/');
    }
    setUserInput(initialState);
  };

  const onChangeHandler:
    ChangeEventHandler<HTMLInputElement> = (e) => {
      setUserInput((state) => {
        return {
          ...state,
          [e.target.id]: e.target.value,
        };
      });
    };

  return (
    <form className="form-login" action="" onSubmit={onSubmitHandler}>
      <h2 className="form-login__heading">Login</h2>
      <input
        value={userInput.discordId}
        onChange={onChangeHandler}
        id="discordId"
        className="form-login__input"
        type="text"
        placeholder="DiscordID"
        required
      />

      <input
        value={userInput.email}
        onChange={onChangeHandler}
        id="email"
        className="form-login__input"
        type="email"
        placeholder="Email"
        required
      />
      <button className="btn" type="submit">submit</button>
    </form>
  );
};

export default FormLogin;
