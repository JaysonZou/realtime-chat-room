'use client';
import { chatHrefConstructor } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SidebarChatList = ({
  friends,
  sessionId,
}: {
  friends: User[];
  sessionId: string;
}) => {
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const [activeChats, setActiveChats] = useState<User[]>(friends);

  useEffect(() => {
    if (pathname?.includes('/chat')) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.map((friend) => {
        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                friend.id,
                sessionId
              )}`}
            >
              {friend.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
