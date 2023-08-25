import { User } from '@/types';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log('error', error.message));
  });

  return (
    <>
      <h1>
        Список пользователей <button onClick={handleUpdate}>Обновить</button>
      </h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <p>
            <b>Поиск:</b>
            <br />
            <input type='text' {...form.register('search')} />
          </p>
          <button type='submit'>Отправить</button>
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
              <button onClick={() => handleDelete(item.id)}>УДОЛИТЬ</button>
              <hr />
              <br />
            </div>
          );
        })}
    </>
  );
};
