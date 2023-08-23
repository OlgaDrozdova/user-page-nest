import { FC, PropsWithChildren } from 'react';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
