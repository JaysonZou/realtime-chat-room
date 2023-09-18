'use client';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  IconButton,
  ListItemSuffix,
} from '@material-tailwind/react';
import { CheckIcon } from 'lucide-react';
import { FC, useState } from 'react';

interface InviteCardProps {
  friends: User[];
}

const InviteCard: FC<InviteCardProps> = ({ friends }) => {
  const [members, setMembers] = useState<User[]>([]);
  return (
    <Card className="w-96">
      <List>
        {friends.map((friend) => {
          return (
            <ListItem key={friend.id} selected={true}>
              <ListItemPrefix>
                <Avatar variant="circular" alt="emma" src={friend.image} />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {friend.name}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {friend.email}
                </Typography>
              </div>

              {members.find((m) => m.id === friend.id) ? (
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray">
                    <CheckIcon />
                  </IconButton>
                </ListItemSuffix>
              ) : null}
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default InviteCard;
