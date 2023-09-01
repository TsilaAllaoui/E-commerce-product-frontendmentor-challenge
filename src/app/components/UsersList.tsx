"use client";

import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/UsersList.scss";
import { UpdateUser } from "./UpdateUser";

export const UsersList = () => {
  const fields = ["Image", "Name", "Role"];
  const [users, setUsers] = useState<User[]>([]);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((e) => console.log(e));
    setReady(true);
  }, [userId]);

  const handleModalShow = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    console.log("ID: " + id);
    const portal = document.querySelector("#portal") as HTMLElement;
    portal.style.backdropFilter = "blur(5px)";
    portal.style.zIndex = "5";
    setUserId(id);
  };

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
            <tr key={user.id}>
              <td>{user.image}</td>
              <td>{user.name}</td>
              <td>{user.isAdmin ? "Admin" : "N/A"}</td>
              <td>
                <button
                  id="update"
                  onClick={(e) => handleModalShow(e, user.id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button id="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {ready && userId != ""
        ? createPortal(
            <UpdateUser id={userId} setUserId={setUserId} />,
            document.getElementById("portal") as Element
          )
        : null}
    </div>
  );
};
