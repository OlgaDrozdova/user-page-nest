import { User, UserUpdate } from '@/types';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';

export const UserScreen: FC<User> = (props) => {
  const [name, setName] = useState(props.name);
  const [surname, setSurname] = useState(props.surname);

  const form = useForm<UserUpdate>({
    defaultValues: {
      name: props.name,
      surname: props.surname,
    },
  });

  const surnameField = form.register('surname');
  const nameField = form.register('name');

  const handleSubmit = form.handleSubmit(async (data) => {
    const formData: UserUpdate = {
      name: data.name,
      surname: data.surname,
    };
    console.log(formData);
    fetch('http://localhost:3001/api/update-user/' + props.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .catch((error) => console.log('error', error.message));
  });

  return (
    <>
      <h1>Пользователь {props.id}</h1>
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
              {...nameField}
              value={name}
              onChange={(e) => {
                nameField.onChange(e);
                setName(e.target.value);
              }}
            />
            <TextField
              label='Фамилия'
              variant='outlined'
              {...surnameField}
              value={surname}
              onChange={(e) => {
                nameField.onChange(e);
                setSurname(e.target.value);
              }}
            />
            <Button type='submit' variant='contained'>
              Сохранить изменения
            </Button>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};
