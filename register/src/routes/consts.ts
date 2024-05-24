import Home from '../pages/Home';
import LoginPage from '../components/Login/LoginPage';
import MainLayout from '../layout/Layout';
import RegisterPage from '../components/Register/RegisterPage';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';

export const mainLayoutRoutes = {
  Layout: MainLayout,
  routes: [
    { path: REGISTER_PATH, Component: RegisterPage },
    { path: LOGIN_PATH, Component: LoginPage },
    { path: HOME_PATH, Component: Home },
  ],
};
