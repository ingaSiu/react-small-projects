import RegisterPage from './components/Register/RegisterPage';
import styles from './App.module.scss';

type AppProps = {
  userName: string;
};

const App = ({ userName }: AppProps) => {
  return (
    <>
      <div className={styles.container}>
        Hello <span>{userName}</span>{' '}
      </div>
      <RegisterPage />
    </>
  );
};

export default App;

