import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, onUserClick }) => {
  return (
    <div className="row">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={onUserClick} />
      ))}
    </div>
  );
};

export default UserList;
