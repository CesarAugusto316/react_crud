import { FC, useEffect, useState } from 'react';
import { Spinner, FormTodos, TodosList } from '..';
import { UserProfile } from '../../interfaces';
import './welcome.css';
import { loginService } from '../../context';


export const Welcome: FC = () => {
  const [isLoading, setIsloading] = useState(true);
  const [userProfile, setUserProfile] = useState({} as UserProfile);

  useEffect(() => {
    loginService.getUserProfile()
      .then((user) => {
        setIsloading(false);
        setUserProfile(user);
      });
  }, []);

  return (
    <div className="welcome">
      <h1 className="primary-heading">
        <span>Welcome</span>
        <span className="primary-heading__user">
          {isLoading && <Spinner />}
          {!isLoading && userProfile.username}
        </span>
      </h1>
      <FormTodos />
      <TodosList />
    </div>
  );
};
