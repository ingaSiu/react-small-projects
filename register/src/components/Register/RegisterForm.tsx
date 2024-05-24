import * as yup from 'yup';

import { EMAIL_REGX } from '../../utils/regex';
import { HOME_PATH } from '../../routes/consts';
import axios from 'axios';
import styles from './RegisterForm.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  userName: yup.string().required('User name field is required'),
  email: yup.string().required('Email is required').matches(EMAIL_REGX, 'Invalid email address'),
  password: yup.string().required('Password is required.').min(6),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Your passwords do not match'),
});

type FormData = yup.InferType<typeof schema>;

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { email, userName, password } = data;
    try {
      await axios.post(
        `https://testapi.io/api/otakuneko/resource/registerUser`,
        { email, userName, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      alert('Registration succesfull!');
      navigate(HOME_PATH);
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label htmlFor="userName">User Name</label>
          <input type="text" {...register('userName')} />
          {errors.userName && <p className={styles.errorMsg}>{errors.userName.message}</p>}
        </div>
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
        <div className={styles.inputWrapper}>
          <label>Confirm password</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword.message}</p>}
        </div>

        <button className={styles.registerBtn}>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
