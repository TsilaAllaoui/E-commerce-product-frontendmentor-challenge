"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { UserItem } from "./UserItem";
import "../styles/UsersList.scss";

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((e) => console.log(e));
  }, []);

  const fields = ["Image", "Name", "Role"];

  return (
    <div id="users">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.image}</td>
              <td>{user.name}</td>
              <td>{user.isAdmin ? "Admin" : "N/A"}</td>
              <td>
                <button>Update</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
