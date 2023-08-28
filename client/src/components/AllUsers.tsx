import { User } from '@/types';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';

export const AllUsers = () => {
  const form = useForm({
    defaultValues: {
      search: '',
    },
  });

  const [users, setUsers] = useState<User[]>();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [update]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleDelete = (delId: string) => {
    fetch('http://localhost:3001/api/delete-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: delId }),
    })
      .then((response) => response.json())
      .then(() => setUpdate(!update));
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    const formData = {
      search: data.search,
    };
    fetch('http://localhost:3001/api/search-user', {
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
      .then((data) => setUsers(data))
      .catch((error) => console.log('error', error.message));
  });

  return (
    <>
      <Grid display='flex' gap={4} mb={4} alignItems='center'>
        <h1>Список пользователей</h1>
        <Button
          variant='contained'
          onClick={handleUpdate}
          sx={{ height: '30px' }}
        >
          Обновить
        </Button>
      </Grid>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <Grid display='flex' gap={4}>
            <TextField
              sx={{ width: '300px' }}
              label='Поиск'
              variant='outlined'
              {...form.register('search')}
            />
            <Button type='submit' variant='contained'>
              Отправить
            </Button>
          </Grid>
        </form>
      </FormProvider>
      {users &&
        users.map((item, index) => {
          return (
            <div key={index}>
              <p>
                <b>ID:</b>
                <br />
                {item.id}
              </p>
              <p>
                <b>Имя:</b>
                <br />
                {item.name}
              </p>
              <p>
                <b>Фамилия:</b>
                <br />
                {item.surname}
              </p>
              <p>
                <b>Email:</b>
                <br />
                {item.email}
              </p>
              <Button onClick={() => handleDelete(item.id)}>УДОЛИТЬ</Button>
              <hr />
              <br />
            </div>
          );
        })}
    </>
  );
};
