import { UserRegistration } from '@/types';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const Registration: FC = () => {
  const form = useForm<UserRegistration>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const formData: UserRegistration = {
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
    };
    fetch('http://localhost:3001/api/registration', {
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
            <b>Имя:</b>
            <br />
            <input type='text' {...form.register('name')} />
          </p>
          <p>
            <b>Фамилия:</b>
            <br />
            <input type='text' {...form.register('surname')} />
          </p>
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
