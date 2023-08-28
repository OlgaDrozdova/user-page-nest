import { UserRegistration } from '@/types';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';

export const Registration: FC = () => {
  const router = useRouter();

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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((data) => router.push(`/user/${data.id}`))
      .catch((error) => console.log('error', error.message));
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <Grid
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          gap={4}
        >
          <TextField
            label='Имя'
            variant='outlined'
            {...form.register('name')}
          />
          <TextField
            label='Фамилия'
            variant='outlined'
            {...form.register('surname')}
          />
          <TextField
            label='Email'
            variant='outlined'
            {...form.register('email')}
          />
          <TextField
            label='Пароль'
            variant='outlined'
            {...form.register('password')}
          />
          <Button type='submit' variant='contained'>
            Отправить
          </Button>
        </Grid>
      </form>
    </FormProvider>
  );
};
