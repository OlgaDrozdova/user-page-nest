import { UserLogIn } from '@/types';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const LogIn: FC = () => {
  const form = useForm<UserLogIn>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const formData: UserLogIn = {
      email: data.email,
      password: data.password,
    };
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .catch((error) => console.log('error', error.message));
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <p>
          <b>Email:</b>
          <br />
          <input type='text' {...form.register('email')} />
        </p>
        <p>
          <b>Пароль:</b>
          <br />
          <input type='text' {...form.register('password')} />
        </p>
        <button type='submit'>Отправить</button>
      </form>
    </FormProvider>
  );
};
