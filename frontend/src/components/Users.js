import React, { useState, useEffect } from 'react';
import axios from "axios";
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    axios
    .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h2>List of Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.userFirstName} {user.userLastName}</p>
            <p>Email: {user.userEmail}</p>
            <p>Phone: {user.userPhone}</p>
            <p>Interests: {user.userInterests.join(', ')}</p>
            <p>{user.id}</p>
            {/* Add more user details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
