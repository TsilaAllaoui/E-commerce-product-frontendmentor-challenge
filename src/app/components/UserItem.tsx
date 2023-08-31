import { User } from "@prisma/client";
import "../styles/UserItem.scss";

export const UserItem = ({ user }: { user: User }) => {
  return (
    <div id="user">
      <p>{user.image}</p>
      <p>{user.name}</p>
      <p>{user.isAdmin ? "Admin" : "N/A"}</p>
    </div>
  );
};
