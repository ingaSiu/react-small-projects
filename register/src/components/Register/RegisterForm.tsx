import * as yup from 'yup';

import { EMAIL_REGX } from '../../utils/regex';
import { RegistrationProps } from '../../types/register';
import { useForm } from 'react-hook-form';
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

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationProps>({ resolver: yupResolver(schema) });

  const onSubmit = (data: RegistrationProps) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input type="text" {...register('userName', { required: true })} />
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>
        <div>
          <label htmlFor="email">User Email</label>
          <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password', { required: true })} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Confirm password</label>
          <input type="password" {...register('confirmPassword', { required: true })} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
