"use client";

import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsPersonAdd } from "react-icons/bs";
import "../styles/UsersList.scss";
import { UpdateUser } from "./UpdateUser";
import { YesNoModal } from "./YesNoModal";

export const UsersList = () => {
  const fields = ["Image", "Name", "Role"];
  const [users, setUsers] = useState<User[]>([]);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((e) => console.log(e));
    setReady(true);
  }, [userId, userIdToDelete]);

  const handleModalShow = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    element: string
  ) => {
    const portal = document.querySelector("#" + element) as HTMLElement;
    portal.style.backdropFilter = "blur(5px)";
    portal.style.zIndex = "5";
    if (element == "portal") setUserId(id);
    else setUserIdToDelete(id);
  };

  useEffect(() => {
    console.log(userIdToDelete);
  }, [userIdToDelete]);

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
                  onClick={(e) => handleModalShow(e, user.id, "portal")}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  id="delete"
                  onClick={(e) => handleModalShow(e, user.id, "yesno-portal")}
                >
                  Delete
                </button>
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
      {ready && userIdToDelete != ""
        ? createPortal(
            <YesNoModal
              id={userIdToDelete}
              setUserId={setUserIdToDelete}
              type={"user"}
            />,
            document.getElementById("yesno-portal") as Element
          )
        : null}
      <button
        id="add-user"
        onClick={(e) => handleModalShow(e, "add", "portal")}
      >
        <BsPersonAdd id="icon" />
        <p>Add</p>
      </button>
    </div>
  );
};
