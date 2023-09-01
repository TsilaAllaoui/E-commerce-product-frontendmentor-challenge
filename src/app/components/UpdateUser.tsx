"use client";

import { User } from "@prisma/client";
import "../styles/UpdateUser.scss";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "./AddedToast";
import { BiInfoCircle } from "react-icons/bi";
import { error } from "console";

interface Error {
  state: boolean;
  span: string;
}

export const UpdateUser = ({
  id,
  setUserId,
}: {
  id: string;
  setUserId: (id: string) => void;
}) => {
  const [user, setUser] = useState<User>({
    id: "",
    image: "",
    isAdmin: false,
    name: "",
  });

  const imageRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const imageSpanRef = useRef<HTMLDivElement>(null);
  const nameSpanRef = useRef<HTMLDivElement>(null);
  const roleSpanRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<Error[]>([
    { state: false, span: "Enter valid image" },
    { state: false, span: "Enter valid name" },
    { state: false, span: "Enter valid role" },
  ]);

  useEffect(() => {
    fetch("/api/users/" + id)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const closeModal = () => {
    const portal = document.querySelector("#portal") as HTMLElement;
    portal.style.zIndex = "-1";
    setUserId("");
  };

  const updateUser = async (data: FormData) => {
    let pass = true;

    const refsToIndexes = [
      {
        ref: imageRef,
        spanRef: imageSpanRef,
        index: 0,
      },
      {
        ref: nameRef,
        spanRef: nameSpanRef,
        index: 1,
      },
      {
        ref: roleRef,
        spanRef: roleSpanRef,
        index: 2,
      },
    ];

    refsToIndexes.forEach(({ ref, spanRef, index }) => {
      if (ref.current?.value == "") {
        ref.current?.classList.add("error");
        spanRef.current!.style.opacity = "1";
        const tmp = errors;
        tmp[index] = { ...tmp[index], state: true };
        setErrors(tmp);
        pass = false;
      } else {
        ref.current?.classList.remove("error");
        spanRef.current!.style.opacity = "0";
        const tmp = errors;
        tmp[index] = { ...tmp[index], state: false };
        setErrors(tmp);
      }
    });

    if (!pass) {
      console.log("pass");
      return;
    }

    const currentUser: User = {
      id: user.id,
      image: data.get("image")!.toString(),
      name: data.get("name")!.toString(),
      isAdmin: data.get("role")!.toString() == "admin",
    };
    const res = await fetch("/api/users/" + id, {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        data: {
          ...currentUser,
        },
      }),
    });

    if (res) {
      const toast = document.querySelector(".toast") as HTMLDivElement;
      toast.style.animation = "slide 1500ms ease-in-out";
      setTimeout(() => {
        toast.style.animation = "unset";
        closeModal();
        setUserId("");
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user, isAdmin: e.currentTarget.value == "admin" });
  };

  return (
    <div id="update-user">
      <h1>Update</h1>
      {user ? (
        <form action={updateUser}>
          <label>
            <p>Image</p>
            <div className="error-span" ref={imageSpanRef}>
              <BiInfoCircle id="icon" />
              <span>{errors[0].span}</span>
            </div>
          </label>
          <input
            ref={imageRef}
            type="text"
            defaultValue={user!.image!}
            onChange={handleChange}
            name="image"
          />
          <label>
            <p>Name</p>
            <div className="error-span" ref={nameSpanRef}>
              <BiInfoCircle id="icon" />
              <span>{errors[1].span}</span>
            </div>
          </label>
          <input
            ref={nameRef}
            type="text"
            defaultValue={user!.name!}
            onChange={handleChange}
            name="name"
          />
          <label>
            <p>Role</p>
            <div className="error-span" ref={roleSpanRef}>
              <BiInfoCircle id="icon" />
              <span>{errors[2].span}</span>
            </div>
          </label>
          <select name="role" onChange={handleSelect} ref={roleRef}>
            <option value="admin">Admin</option>
            <option value="none">N/A</option>
          </select>
          <div id="buttons">
            <button type="submit">Update</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      ) : null}
      <Toast className="toast" color="green" content="User updated!" />
    </div>
  );
};
