import { User, UserUpdate } from '@/types';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const UserScreen: FC<User> = (props) => {
  const form = useForm<UserUpdate>({
    defaultValues: {
      name: '',
      surname: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const formData: UserUpdate = {
      name: data.name,
      surname: data.surname,
    };
    console.log(formData);
    // fetch('http://localhost:3001/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .catch((error) => console.log('error', error.message));
  });

  return (
    <>
      <h1>Пользователь {props.id}</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <p>
            <b>Имя:</b>
            <br />
            <input
              type='text'
              //placeholder={props.name}
              value={props.name}
              {...form.register('name')}
            />
          </p>
          <p>
            <b>Фамилия:</b>
            <br />
            <input
              type='text'
              value={props.surname}
              {...form.register('surname')}
            />
          </p>
          <button type='submit'>Сохранить изменения</button>
        </form>
      </FormProvider>
    </>
  );
};
