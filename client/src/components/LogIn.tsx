import { UserLogIn } from '@/types';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';

export const LogIn: FC = () => {
  const router = useRouter();

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
      .then((response) => {
        if (response.ok) {
          fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then(
              (data) => (document.cookie = 'accessToken=' + data.accessToken)
            );
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((data) => router.push(`/user/${data.id}`))
      .catch((error) => alert(error));
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
