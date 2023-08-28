import { AllUsers } from '@/components/AllUsers';
import { LogIn } from '@/components/LogIn';
import { Registration } from '@/components/Registration';
import { AuthMode } from '@/types';
import { FC, useState } from 'react';
import { Grid, Button, ButtonGroup } from '@mui/material';

export const AuthScreen: FC = () => {
  const [authMode, setAuthMode] = useState(AuthMode.Registration);

  return (
    <>
      <Grid
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        gap={4}
      >
        <ButtonGroup>
          <Button onClick={() => setAuthMode(AuthMode.Registration)}>
            Регистрация
          </Button>
          <Button onClick={() => setAuthMode(AuthMode.LogIn)}>Войти</Button>
        </ButtonGroup>
        {authMode === AuthMode.Registration ? <Registration /> : <LogIn />}
      </Grid>
      <AllUsers />
    </>
  );
};
