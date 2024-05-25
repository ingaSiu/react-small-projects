import * as yup from 'yup';

import { EMAIL_REGX } from '../../utils/regex';
import { HOME_PATH } from '../../routes/consts';
import styles from './LoginForm.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(EMAIL_REGX, 'Invalid email address'),
  password: yup.string().required('Password is required.').min(6),
});

type LoginData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: LoginData) => {
    console.log(data);
    reset();
    navigate(HOME_PATH);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <label htmlFor="email">User Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
      </div>

      <button className={styles.loginBtn} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
