import React, { useEffect } from "react";
import useGetUsers from "./useGetUsers";

export interface User {
  userid: number;
  username: string;
  password: string;
  email: string;
  phonenumber: string;
}

const Users: React.FC = () => {
  const { users, loading, error } = useGetUsers();

  useEffect(() => {
    console.log(users);
  }, [users]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userid}>{`${user.userid} - ${user.username} - ${user.password} - ${user.email} - ${user.phonenumber}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;