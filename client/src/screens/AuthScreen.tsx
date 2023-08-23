import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const AuthScreen: FC = () => {
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const formData = {
      email: data.email,
    };
    const response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  });

  return (
    <>
      <h1>Регистрация</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <p>
            <b>Email:</b>
            <br />
            <input type='text' {...form.register('email')} />
          </p>
          <button type='submit'>Отправить</button>
        </form>
      </FormProvider>
      {/*<h1>Войти</h1>
       <form>
        <p>
          <b>Email:</b>
          <br />
          <input type='text' />
        </p>
        <input type='submit' value='Отправить' />
      </form> */}
    </>
  );
};
