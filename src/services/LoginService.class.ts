import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { RestAPI } from './RestAPI.class';
import type { LoginState, Token, UserProfile } from '../interfaces';


export class LoginService extends RestAPI {
  //
  async login(userInput: LoginState): Promise<Token|any> {
    return this.post('/auth/login', userInput, false)
      .then((data) => {
        const { token } = data as Token;
        this.token = token;
        this.writeToLocalStorage();
        return { token };
      })
      .catch((error: AxiosError) => {
        this.token = null;
        this.writeToLocalStorage();
        toast.error(error.message);
      });
  }

  async getUserProfile(): Promise<UserProfile|any> {
    return this.get('/auth/check')
      .then((user) => {
        return user;
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      });
  }
}
