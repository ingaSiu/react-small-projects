import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input type="text" {...register('userName', { required: true })} />
        </div>
        <div>
          <label htmlFor="email">User Email</label>
          <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <p>Email is required and must be valid</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password', { required: true })} />
        </div>
        <div>
          <label>Reapeat password</label>
          <input type="password" />
        </div>

        <button>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
