import { FC, Suspense, lazy } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar, Spinner } from './components';
import { useThemeContext, useTodosContext } from './context';


const FormLogin = lazy(() => import('./components/forms/FormLogin'));
const Welcome = lazy(() => import('./components/welcome/Welcome'));

export const App: FC = () => {
  const { theme } = useThemeContext();
  const { token } = useTodosContext(); // makes '/' protected

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="main">
          <Suspense fallback={<Spinner size="font-6" marginTop="m-14" />}>
            <Routes>
              <Route
                path="/"
                element={token ? <Welcome />
                  : <Navigate to="/login" />}
              />
              <Route path="/login" element={<FormLogin />} />
            </Routes>
          </Suspense>
        </div>
      </section>
      <ToastContainer autoClose={1_100} theme={theme.light ? 'light' : 'dark'} />
    </>
  );
};
