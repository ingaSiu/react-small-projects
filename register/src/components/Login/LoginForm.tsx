import styles from './LoginForm.module.scss';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
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
