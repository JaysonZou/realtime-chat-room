import InviteCard from '@/components/InviteCard';
import { getFriendsByUserId } from '@/helpers/getFriendsById';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const AgileEstimating = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  return (
    <div className="w-full flex flex-col justify-center align-middle">
      <h1 className="font-bold text-5xl mb-8">
        Select members for agile estimating
      </h1>
      <InviteCard friends={friends} />
    </div>
  );
};

export default AgileEstimating;
