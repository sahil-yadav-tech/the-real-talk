import React from 'react';

const UserList = ({ users, onUserSelect }) => {
  return (
    <div className="user-list">
      <h3>Users Online</h3>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} onClick={() => onUserSelect(user)}>
              <span className="user-status"></span>
              <span className="user-name">{user.name}</span>
            </li>
          ))
        ) : (
          <li className="no-users">No users online</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
