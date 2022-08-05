import { FC } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar, FormLogin, Welcome } from './components';
import { useThemeContext, useTodosContext } from './context';


export const App: FC = () => {
  const { theme } = useThemeContext();
  const { token } = useTodosContext();

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="main">
          <Routes>
            <Route
              path="/"
              element={token ? <Welcome />
                : <Navigate to="/login" />}
            />
            <Route path="/login" element={<FormLogin />} />
          </Routes>
        </div>
      </section>
      <ToastContainer autoClose={1_100} theme={theme.light ? 'light' : 'dark'} />
    </>
  );
};
