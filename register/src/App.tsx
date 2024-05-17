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
    </>
  );
};

export default App;

