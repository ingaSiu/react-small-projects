import RegisterPage from '../components/Register/RegisterPage';

type AppProps = {
  userName: string;
};

const Home = ({ userName }: AppProps) => {
  return (
    <>
      <div>
        Hello <span>{userName}</span>{' '}
      </div>
      <RegisterPage />
    </>
  );
};

export default Home;
