import "../styles/Toast.scss";
import { BiInfoCircle } from "react-icons/bi";

export const Toast = ({
  color,
  content,
  className,
}: {
  color: string;
  content: string;
  className: string;
}) => {
  return (
    <div className={className} style={{ backgroundColor: color }}>
      <BiInfoCircle id="icon" />
      <p>{content}</p>
    </div>
  );
};
