import { AiOutlineShoppingCart } from "react-icons/ai";
import "../styles/Navbar.scss";
import Link from "next/link";

const Navbar = () => {
  return (
    <div id="navbar-container">
      <div id="navbar">
        <h1 id="title">sneakers</h1>
        <Link href="/collections">Collections</Link>
        <Link href="/men">Men</Link>
        <Link href="/women">Women</Link>
        <Link href="/about">About</Link>
        <Link href="/contact" id="contact">
          Contact
        </Link>
        <AiOutlineShoppingCart id="icon" />
        <div
          id="user"
          style={{ backgroundImage: `url(/images/image-avatar.png)` }}
        ></div>
      </div>
      <div />
      <div id="separator"></div>
    </div>
  );
};

export default Navbar;
