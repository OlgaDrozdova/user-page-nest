import { UserScreen } from '@/screens/UserScreen';

const UserPage = () => UserScreen({});

export const getServerSideProps = async (context) => {
  const res = await fetch('http://localhost:3001/api/users', context.params.id);
  const repo = await res.json();
  return { props: { repo } };
};

export default UserPage;
