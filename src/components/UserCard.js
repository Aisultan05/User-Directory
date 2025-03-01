import React from 'react';

const UserCard = ({ user, onClick }) => {
  return (
    <div className="col-md-4 col-sm-6 mb-4" onClick={() => onClick(user)}>
      <div className="card h-100">
        <img
          src={user.avatar}
          className="card-img-top"
          alt={`${user.first_name} ${user.last_name}`}
        />
        <div className="card-body">
          <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
          <p className="card-text">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
