import { AllUsers } from '@/components/AllUsers';
import { LogIn } from '@/components/LogIn';
import { Registration } from '@/components/Registration';
import { AuthMode } from '@/types';
import { FC, useState } from 'react';

export const AuthScreen: FC = () => {
  const [authMode, setAuthMode] = useState(AuthMode.Registration);

  return (
    <>
      <button onClick={() => setAuthMode(AuthMode.Registration)}>
        Регистрация
      </button>
      <button onClick={() => setAuthMode(AuthMode.LogIn)}>Войти</button>
      {authMode === AuthMode.Registration ? <Registration /> : <LogIn />}
      <AllUsers />
    </>
  );
};
