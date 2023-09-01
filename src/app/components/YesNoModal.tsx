import { deleteUser } from "../../../db/utilities";
import "../styles/YesNoModal.scss";
import { Toast } from "./AddedToast";

export const YesNoModal = ({
  id,
  setUserId,
  type,
}: {
  id: string;
  setUserId: (id: string) => void;
  type: string;
}) => {
  const handleChoice = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id == "yes") {
      await deleteUser(id);
      const toast = document.querySelector(".toast") as HTMLDivElement;
      toast.style.animation = "slide 1500ms ease-in-out";
      setTimeout(() => {
        toast.style.animation = "unset";
        const portal = document.querySelector("#yesno-portal") as HTMLElement;
        portal.style.zIndex = "-1";
        setUserId("");
      }, 1000);
    } else {
      const portal = document.querySelector("#yesno-portal") as HTMLElement;
      portal.style.zIndex = "-1";
      setUserId("");
    }
  };
  return (
    <div id="yesno-modal">
      <h1>Delete user?</h1>
      <div id="buttons">
        <button id="yes" onClick={handleChoice}>
          YES
        </button>
        <button id="no" onClick={handleChoice}>
          NO
        </button>
      </div>
      <Toast className="toast" color="orange" content="User deleted!" />
    </div>
  );
};
