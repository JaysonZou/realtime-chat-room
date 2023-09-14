'use client';
import { useState } from 'react';

const SidebarChatList = ({
  friends,
  sessionId,
}: {
  friends: User[];
  sessionId: string;
}) => {
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const [activeChats, setActiveChats] = useState<User[]>(friends);
  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.map((friend) => friend.email)}
    </ul>
  );
};

export default SidebarChatList;
