import { UserScreen } from '@/screens/UserScreen';
import { User } from '@/types';

const UserPage = (props: User) => UserScreen(props);

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const res = await fetch(
    'http://localhost:3001/api/users/' + context.params.id
  );
  const repo = await res.json();
  const props: User = repo;
  return { props };
};

export default UserPage;
