import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(typeof session, 'session');
  return <div>{JSON.stringify(session)}</div>;
};

export default Page;
